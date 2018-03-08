<template>
    <section v-if="allPosts">
        <h2>Posts</h2>
        <!-- Dialog edit post. -->
        <app-dialog title="Edit Post" :show="dialog.show" @clickAccept="onClickAccept">
            <v-text-field label="Title" v-model="dialog.newTitle" required></v-text-field>
            <v-text-field label="Content" v-model="dialog.newContent" multi-line required=""></v-text-field>
        </app-dialog>
        <v-card-title>
            <v-spacer></v-spacer>
            <v-text-field append-icon="search" label="Search" single-line hide-details v-model="search"></v-text-field>
        </v-card-title>
        <v-data-table :headers="headers" :items="allPosts" :search="search" :loading="!allPosts" hide-actions class="elevation-1">
            <v-progress-linear slot="progress" color="blue" indeterminate></v-progress-linear>
            <template slot="items" slot-scope="props">
                <td class="text-xs-left">{{ props.item.title }}</td>
                <td v-if="props.item.user" class="text-xs-left">{{ props.item.user.username }}</td>
                <td class="text-xs-left">{{ props.item.createdAt | formatDate }}</td>
                <td class="justify-center layout px-0">
                    <v-btn icon class="mx-0" @click="viewItem(props.item)">
                        <v-icon color="primary">visibility</v-icon>
                    </v-btn>
                    <v-btn icon class="mx-0" @click="editItem(props.item)">
                        <v-icon color="teal">edit</v-icon>
                    </v-btn>
                    <v-btn icon class="mx-0" @click="deleteItem(props.item)">
                        <v-icon color="pink darken-1">delete</v-icon>
                    </v-btn>
                </td>
            </template>
            <v-alert slot="no-results" :value="true" color="error" icon="warning">
                Your search for "{{ search }}" found no results.
            </v-alert>
        </v-data-table>
    </section>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import AppDialog from '../common/AppDialog.vue';

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
        AppDialog
    }
})
export default class Users extends Vue {

    headers: any;
    items: any = [];
    search: string = '';
    dialog: any = {show: false, newTitle: '', newContent: ''};
    subscription: any;

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
        console.log("beforeDestroy Posts");
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
                }/*,
                update: (store, { data: { deletePost } }) => {
                    // Read data from cache for the allPosts query.
                    let data = store.readQuery({ query: ALL_POSTS_QUERY }) || {};

                    // Delete post from the data.
                    (data as any)['allPosts'] = (data as any)['allPosts'].filter((i: any) => i.id !== deletePost.id);

                    // Write data back to the cache for the allPosts query.
                    store.writeQuery({ query: ALL_POSTS_QUERY, data })
                }
                */
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
        console.log('onClickAccept');
        console.log(this.dialog);
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
    
};
</script>
   
<style scoped>
</style>