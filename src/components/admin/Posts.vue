<template>
    <section v-if="allPosts">
        <h2>Posts</h2>
        <!-- Dialog edit post. -->
        <app-dialog title="Edit Post" :show="dialog.show" @clickAccept="onClickAccept">
            <v-text-field label="Title" v-model="dialog.newTitle" required></v-text-field>
            <v-text-field label="Content" v-model="dialog.newContent" multi-line required=""></v-text-field>
        </app-dialog>
        <v-flex xs12 sm6 offset-sm3>
            <app-data-table :data="allPosts" :headers="headers" :actions="showActions" @clicked="onClick"></app-data-table>
        </v-flex>
    </section>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import AppDialog from '../common/AppDialog.vue';
import AppDataTable from '../common/AppDataTable.vue'

// Vuex.
import { Action } from 'vuex-class';

import EventBus from '../../event.bus';

import { ALL_POSTS_QUERY, DELETE_POST_MUTATION, UPDATE_POST_MUTATION, subscribeToPostsChanges } from '../../graphql/graphql'


@Component({
    apollo: {
        // Fetch all posts.
        allPosts: {
            query: ALL_POSTS_QUERY
        }
    },
    components: {
        // Add a reference to the component in the components property.
        AppDialog,
        AppDataTable
    }
})
export default class Users extends Vue {

    headers: any;
    items: any = [];
    search: string = '';
    dialog: any = {show: false, newTitle: '', newContent: ''};
    subscription: any;
    showActions: any = {search: true, view: true, edit: true, delete: true};

    @Action('SELECTED_POST') actionSelectedPost: any;

    constructor() {
        super();
        this.headers = [
          { text: 'Title', align: 'left', value: 'title'},
          { text: 'Username', align: 'left', value: 'username' },
          { text: 'DateTime', align: 'left', value: 'datetime' },
          { text: 'Actions', align: 'left', value: 'actions' }
        ];
    }

    mounted() {
        this.subscription = subscribeToPostsChanges(this.$apollo);
    }

    beforeDestroy() {
        // console.log("beforeDestroy Posts");
        this.subscription.unsubscribe();
    }

    viewItem(item: any) {
        // console.log('viewItem', item);
        this.actionSelectedPost({ data: item });
        this.$router.push('/postdetails')
    }

    deleteItem(item: any) {
        // console.log('deleteItem', item);
        this.$apollo
            .mutate({
                mutation: DELETE_POST_MUTATION,
                variables: {
                    id: item.id,
                }
            })
            .then(response => {
                console.log(response);
                EventBus.$emit('SHOW_SNACKBAR', {show: true, color: "pink darken-1", timeout: 6000, text: "Post deleted successfully"});
            })
    }

    editItem(item: any) {
        // console.log('editItem', item);
        this.dialog = {show: true, newTitle: item.title, newContent: item.content, post: item};
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
        // console.log(option);
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