<template>
    <section v-if="allUsers">
        <h2>Users</h2>
         <!-- Dialog edit user. -->
        <v-dialog v-model="dialog.show" max-width="500px">
            <v-card>
            <v-card-title>
                Edit User
            </v-card-title>
            <v-card-text>
                <v-flex xs12>
                    <v-text-field label="Username" v-model="dialog.newUsername" required></v-text-field>
                    <v-text-field label="Role" v-model="dialog.newRole" required></v-text-field>
                </v-flex>
            </v-card-text>
            <v-card-actions>
                <v-btn color="primary" flat @click.stop="onClickAccept()">Accept</v-btn>
                <v-btn color="pink darken-1" flat @click.stop="dialog.show=false">Close</v-btn>
            </v-card-actions>
            </v-card>
        </v-dialog>
        <v-card-title>
            <v-spacer></v-spacer>
            <v-text-field append-icon="search" label="Search" single-line hide-details v-model="search"></v-text-field>
        </v-card-title>
        <v-data-table :headers="headers" :items="allUsers" :search="search" :loading="!allUsers" hide-actions class="elevation-1">
            <v-progress-linear slot="progress" color="blue" indeterminate></v-progress-linear>
            <template slot="items" slot-scope="props">
                <td class="text-xs-left">{{ props.item.username }}</td>
                <td class="text-xs-left">{{ props.item.email }}</td>
                <td class="justify-center layout px-0">
                    <!--<router-link :to="`/admin/users/${props.item.id}`">-->
                        <v-btn icon class="mx-0" @click="viewItem(props.item)">
                            <v-icon color="primary">visibility</v-icon>
                        </v-btn>
                    <!--</router-link>-->
                    <v-btn icon class="mx-0" @click="editItem(props.item)">
                        <v-icon color="teal">edit</v-icon>
                    </v-btn>
                    <v-btn icon class="mx-0" @click="deleteItem(props.item)">
                        <v-icon color="pink">delete</v-icon>
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

// Vuex.
import { Action } from 'vuex-class';

import { ALL_USERS_QUERY, DELETE_USER_MUTATION, UPDATE_USER_MUTATION } from '../../graphql/graphql'

@Component({
    apollo: {
        // Fetch all users.
        allUsers: {
            query: ALL_USERS_QUERY
        }
    }
})
export default class Users extends Vue {

    headers: any;
    items: any = [];
    search: string = '';
    dialog: any = {show: false, newUsername: '', newEmail: '', newRole: ''};

    @Action('SELECTED_USER') actionSelectedUser: any;

    constructor() {
        super();
        this.headers = [
          { text: 'Username', align: 'left', value: 'username'},
          { text: 'Email', align: 'left', value: 'email' },
          { text: 'Actions', align: 'left', value: 'actions' }
        ];
    }

    viewItem(item: any) {
        // console.log('viewItem', item);
        this.actionSelectedUser({ data: item });
        this.$router.push('/admin/users/details')
    }

    deleteItem(item: any) {
        console.log('deleteItem', item);
        this.$apollo
            .mutate({
                mutation: DELETE_USER_MUTATION,
                variables: {
                    id: item.id,
                },
                update: (store, { data: { deleteUser } }) => {
                    // Read data from cache for the allPosts query.
                    let data = store.readQuery({ query: ALL_USERS_QUERY }) || {};

                    // Delete post from the data.
                    (data as any)['allUsers'] = (data as any)['allUsers'].filter((i: any) => i.id !== deleteUser.id);

                    // Write data back to the cache for the allPosts query.
                    store.writeQuery({ query: ALL_USERS_QUERY, data })
                }
            })
            .then(response => {
                console.log(response);
            })
    }

    editItem(item: any) {
        this.dialog = {show: true, newUsername: item.username, newRole: item.role, user: item};
    }

     onClickAccept() {
        // console.log('onClickAccept');
        // console.log(this.dialog);
        this.updateItem();
    }

    updateItem() {
        this.$apollo
            .mutate({
                mutation: UPDATE_USER_MUTATION,
                variables: {
                    id: this.dialog.user.id,
                    username: this.dialog.newUsername,
                    role: this.dialog.newRole
                }
            })
            .then(response => {
                console.log(response);
                this.dialog.show = false;
            })
    }
    
};
</script>
   
<style scoped>
    a {
        text-decoration: none;
    }
</style>