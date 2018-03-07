<template>
    <section v-if="User">
        <h2>My Posts</h2>
        <v-data-table :headers="headers" :items="User.posts" :loading="!User.posts" hide-actions class="elevation-1">
            <v-progress-linear slot="progress" color="blue" indeterminate></v-progress-linear>
            <template slot="items" slot-scope="props">
                <td class="text-xs-left">{{ props.item.title }}</td>
                <td class="text-xs-left">{{ props.item.createdAt | formatDate }}</td>
                <td class="justify-center layout px-0">
                    <v-btn icon class="mx-0">
                        <v-icon color="primary">visibility</v-icon>
                    </v-btn>
                     <v-btn icon class="mx-0">
                        <v-icon color="teal">edit</v-icon>
                    </v-btn>
                    <v-btn icon class="mx-0">
                        <v-icon color="pink darken-1">delete</v-icon>
                    </v-btn>
                </td>
            </template>
        </v-data-table>
    </section>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

import { Getter } from 'vuex-class';
import { UserModel } from '../types';

import { USER_QUERY } from '../graphql/graphql'

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
        }
    }
})
export default class MyPosts extends Vue {

    @Getter('loggedUser') loggedUser: any;
    headers: any;

    constructor() {
        super();
        this.headers = [
            { text: 'Title', align: 'left', value: 'title'},
            { text: 'DateTime', align: 'left', value: 'datetime'},
            { text: 'Actions', align: 'left', value: 'actions' }
        ];
    }
    
};
</script>
   
<style scoped>
</style>