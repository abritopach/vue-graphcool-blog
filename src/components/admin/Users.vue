<template>
    <section v-if="allUsers">
        <h2>Users</h2>
         <!-- Dialog edit user. -->
         <app-dialog title="Edit User" :show="dialog.show" @clickAccept="onClickAccept" @clickClose="onClickClose">
             <v-text-field label="Email" v-model="dialog.newEmail" disabled></v-text-field>
            <v-text-field label="Username" v-model="dialog.newUsername" required></v-text-field>
            <v-text-field label="Role" v-model="dialog.newRole" required></v-text-field>
        </app-dialog>
        <v-flex xs12 sm8 offset-sm2>
            <app-data-table :data="allUsers" :headers="headers" :actions="showActions" @clicked="onClick"></app-data-table>
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

import { ALL_USERS_QUERY, DELETE_USER_MUTATION, UPDATE_USER_MUTATION, subscribeToUsersChanges,
         MARK_AS_DELETED_USER_MUTATION } from '../../graphql/graphql'

@Component({
    apollo: {
        // Fetch all users.
        allUsers: {
            query: ALL_USERS_QUERY
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
    dialog: any = {show: false, newUsername: '', newEmail: '', newRole: ''};
    subscription: any;
    showActions: any = {search: true, view: true, edit: true, delete: true};

    @Action('SELECTED_USER') actionSelectedUser: any;

    constructor() {
        super();
        this.headers = [
          { text: 'Username', align: 'left', value: 'username'},
          { text: 'Email', align: 'left', value: 'email' },
          { text: 'Actions', align: 'left', value: 'actions' }
        ];
    }

    mounted() {
        this.subscription = subscribeToUsersChanges(this.$apollo);
    }

    beforeDestroy() {
        // console.log("beforeDestroy Users");
        this.subscription.unsubscribe();
    }

    viewItem(item: any) {
        // console.log('viewItem', item);
        this.actionSelectedUser({ data: item });
        this.$router.push('/admin/users/details')
    }

    deleteItem(item: any) {
        // console.log('deleteItem', item);
        this.$apollo
            .mutate({
                mutation: DELETE_USER_MUTATION,
                variables: {
                    id: item.id,
                }
            })
            .then(response => {
                EventBus.$emit('SHOW_SNACKBAR', {show: true, color: "pink darken-1", timeout: 6000, text: "User deleted successfully"});
                console.log(response);
            })
        /*
       this.$apollo
            .mutate({
                mutation: MARK_AS_DELETED_USER_MUTATION,
                variables: {
                    id: item.id,
                    toDelete: true
                }
            })
            .then(response => {
                EventBus.$emit('SHOW_SNACKBAR', {show: true, color: "pink darken-1", timeout: 6000, text: "User deleted successfully"});
                console.log(response);
            })
            */
    }

    editItem(item: any) {
        this.dialog = {show: true, newEmail: item.email, newUsername: item.username, newRole: item.role, user: item};
    }

     onClickAccept() {
        // console.log('onClickAccept');
        // console.log(this.dialog);
        this.updateItem();
    }

    onClickClose() {
        this.dialog.show = false;
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
                EventBus.$emit('SHOW_SNACKBAR', {show: true, color: "pink darken-1", timeout: 6000, text: "User updated successfully"});
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