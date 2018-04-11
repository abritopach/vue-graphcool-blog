<template>
    <section v-if="User">
        <h2>My Posts</h2>
        <!-- Dialog edit post. -->
        <app-dialog title="Edit Post" :show="dialog.show" @clickAccept="onClickAccept" @clickClose="onClickClose">
            <v-select v-if="allCategories" v-model="select" label="Categories" multiple chips tags :items="allCategories" return-object 
                item-text="name" item-value="name" :rules="[() => select.length > 0 || 'You must choose at least one']">
                <template slot="selection" slot-scope="data">
                    <v-chip @input="data.parent.selectItem(data.item)" class="chip--select-multi"
                            :selected="data.selected" :key="JSON.stringify(data.item)">
                        <v-avatar class="accent">{{ data.item.name.slice(0, 1).toUpperCase() }}</v-avatar>
                        {{ data.item.name }}
                    </v-chip>
                </template>
            </v-select>
            <v-text-field label="Title" v-model="dialog.newTitle" required></v-text-field>
            <v-text-field label="Content" v-model="dialog.newContent" multi-line required=""></v-text-field>
            <picture-input ref="pictureInput"  @change="onChange" width="600" height="600" margin="16"  accept="image/jpeg,image/png,image/gif" 
                size="10"  buttonClass="ui button primary" :customStrings="{upload: '<h1>Upload it!</h1>', drag: 'Drag and drop your image here'}">}">
            </picture-input>
        </app-dialog>
        <v-flex xs12 sm6 offset-sm3>
            <app-data-table :data="User.posts" :headers="headers" :actions="showActions" @clicked="onClick"></app-data-table>
        </v-flex>
    </section>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import AppDataTable from '../components/common/AppDataTable.vue'
import AppDialog from '../components/common/AppDialog.vue'

import { Action, Getter } from 'vuex-class';
import { UserModel, CategoryModel } from '../types';

import EventBus from '../event.bus';

import PictureInput from 'vue-picture-input'

import { USER_QUERY, DELETE_POST_MUTATION, UPDATE_POST_MUTATION, ALL_POSTS_QUERY, ALL_CATEGORIES_QUERY } from '../graphql/graphql'

@Component({
    apollo: {
        // Fetch all categories.
        allCategories: {
            query: ALL_CATEGORIES_QUERY
        },
        // Fetch user by ID
        User: {
            query: USER_QUERY,
            variables () {
                return {
                    id: this.loggedUser.id
                }
            }
        },
        // Fetch all posts.
        allPosts: {
            query: ALL_POSTS_QUERY,
            variables: {
                orderBy: "createdAt_DESC",
            },
        }, 
    },
    components: {
        // Add a reference to the component in the components property.
        AppDataTable,
        AppDialog,
        'picture-input': PictureInput
    }
})
export default class MyPosts extends Vue {

    @Getter('loggedUser') loggedUser: any;
    @Action('SELECTED_POST') actionSelectedPost: any;
    headers: any;
    showActions: any = {search: true, view: true, edit: true, delete: true};
    dialog: any = {show: false, newTitle: '', newContent: ''};
    image: any;
    select: CategoryModel[] = [];

    constructor() {
        super();
        this.headers = [
            { text: 'Publish', align: 'left', value: 'publish'},
            { text: 'Title', align: 'left', value: 'title'},
            { text: 'DateTime', align: 'left', value: 'datetime'},
            { text: 'Actions', align: 'left', value: 'actions' }
        ];
    }

    viewItem(item: any) {
        // console.log('viewItem', item);
        this.actionSelectedPost({ data: item });
        this.$router.push('/postdetails')
    }

    editItem(item: any) {
        console.log('editItem', item);
        this.select = item.categories;
        this.dialog = {show: true, newTitle: item.title, newContent: item.content, post: item, categories: item.categories};
        console.log(this.dialog);
    }

    deleteItem(item: any) {
        // console.log('deleteItem', item);
        this.$apollo
            .mutate({
                mutation: DELETE_POST_MUTATION,
                variables: {
                    id: item.id,
                },
                update: (store, { data: { deletePost } }) => {
                    // Read data from cache for the allPosts query.
                    let data = store.readQuery({ query: USER_QUERY, variables: { id: this.loggedUser.id} }) || {};

                    console.log('data', data);

                    // Delete post from the data.
                    (data as any)['User']['posts'] = (data as any)['User']['posts'].filter((i: any) => i.id !== deletePost.id);

                    // Write data back to the cache for the allPosts query.
                    store.writeQuery({ query: USER_QUERY, data })
                }
            })
            .then(response => {
                console.log(response);
                EventBus.$emit('SHOW_SNACKBAR', {show: true, color: "pink darken-1", timeout: 6000, text: "Post deleted successfully"});
            })
    }

    onClickAccept() {
        // console.log('onClickAccept');
        // console.log(this.dialog);
        this.updateItem();
    }

    onClickClose() {
        // console.log('onClickClose');
        this.dialog.show = false;
    }

    updateItem() {
        let categories = this.select.map( category => ({ 'name': category.name }));
        this.$apollo
            .mutate({
                mutation: UPDATE_POST_MUTATION,
                variables: {
                    id: this.dialog.post.id,
                    title: this.dialog.newTitle,
                    content: this.dialog.newContent,
                    categories: categories
                }
            })
            .then(response => {
                console.log(response);
                EventBus.$emit('SHOW_SNACKBAR', {show: true, color: "pink darken-1", timeout: 6000, text: "Post updated successfully"});
                this.dialog.show = false;
            })
    }

    onClick(option: any) {
        const {action, item} = option;
        switch (action) {
            case "viewItem":
                this.viewItem(item);
                break;

            case "editItem":
                this.editItem(item);
                break;
            
            case "deleteItem":
                this.deleteItem(item);
                break;
        }
    }

    onChange (image: any) {
        //console.log('New picture selected!')
        if (image) {
            //console.log('Picture loaded.')
            //console.log(image);
            this.image = image;
        } else {
            console.log('FileReader API not supported: use the <form>')
        }
    }
    
    
};
</script>
   
<style scoped>
</style>