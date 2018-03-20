<template>
    <section v-if="User">
        <h2>My Posts</h2>
        <!-- Dialog edit post. -->
        <app-dialog title="Edit Post" :show="dialog.show" @clickAccept="onClickAccept">
            <v-text-field label="Title" v-model="dialog.newTitle" required></v-text-field>
            <v-text-field label="Content" v-model="dialog.newContent" multi-line required=""></v-text-field>
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
import { UserModel } from '../types';

import EventBus from '../event.bus';

import { USER_QUERY, DELETE_POST_MUTATION, UPDATE_POST_MUTATION, ALL_POSTS_QUERY } from '../graphql/graphql'

@Component({
    apollo: {
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
        AppDialog
    }
})
export default class MyPosts extends Vue {

    @Getter('loggedUser') loggedUser: any;
    @Action('SELECTED_POST') actionSelectedPost: any;
    headers: any;
    showActions: any = {search: true, view: true, edit: true, delete: true};
    dialog: any = {show: false, newTitle: '', newContent: ''};

    constructor() {
        super();
        this.headers = [
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
        // console.log('editItem', item);
        this.dialog = {show: true, newTitle: item.title, newContent: item.content, post: item};
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

    updateItem() {
        this.$apollo
            .mutate({
                mutation: UPDATE_POST_MUTATION,
                variables: {
                    id: this.dialog.post.id,
                    title: this.dialog.newTitle,
                    content: this.dialog.newContent
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
    
    
};
</script>
   
<style scoped>
</style>