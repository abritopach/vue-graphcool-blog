<template>
    <section v-if="allUsers">
        <h2>Users</h2>
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
                    <router-link :to="`/admin/users/${props.item.id}`">
                        <v-btn icon class="mx-0">
                            <v-icon color="primary">visibility</v-icon>
                        </v-btn>
                    </router-link>
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

import { ALL_USERS_QUERY } from '../../graphql/graphql'

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

    constructor() {
        super();
        this.headers = [
          { text: 'Username', align: 'left', value: 'username'},
          { text: 'Email', align: 'left', value: 'email' },
          { text: 'Actions', align: 'left', value: 'actions' }
        ];
    }
    
};
</script>
   
<style>
</style>