<template>
    <v-layout row>
        <v-flex xs12 sm6 lg4 offset-sm3 offset-lg4>
            <h2>User Details</h2>
            <v-card v-if="User">
                <v-avatar size="100px">
                        <img v-if="User.avatar !== null" :src="User.avatar" alt="">
                        <img v-else src="../../assets/avatar.png" alt="">
                </v-avatar>
                <v-card-title primary-title>
                <div>
                    <input class="input is-static">
                    <div class="headline">{{User.username}}</div>
                    <span class="grey--text">{{User.email}}</span>
                </div>
                </v-card-title>
                <v-card-actions>
                    <v-chip color="pink darken-1" text-color="white">Role: {{User.role}}</v-chip>
                <!--
                <v-btn flat>Share</v-btn>
                <v-btn flat color="purple">Explore</v-btn>
                -->
                <v-spacer></v-spacer>
                <div>
                        <v-badge color="red">
                            <span slot="badge">{{User.posts.length}}</span>
                            <span>Number of posts</span>
                        </v-badge>
                    </div>
                <v-btn icon @click.native="show = !show">
                    <v-icon>{{ show ? 'keyboard_arrow_down' : 'keyboard_arrow_up' }}</v-icon>
                </v-btn>
                </v-card-actions>
                <v-slide-y-transition>    
                <app-data-table v-show="show" :data="User.posts" :headers="headers" :actions="showActions" @clicked="onClick"></app-data-table>
                </v-slide-y-transition>
            </v-card>
        </v-flex>
    </v-layout>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import AppDataTable from '../common/AppDataTable.vue'

import { USER_QUERY } from '../../graphql/graphql'

import { Getter, Action } from 'vuex-class';
import { UserModel } from '../../types';

@Component({
    apollo: {
        // Fetch user by ID
        User: {
            query: USER_QUERY,
            variables () {
                return {
                    id: this.selectedUser.id
                }
            }
        }
    },
    components: {
        // Add a reference to the component in the components property.
        AppDataTable
    }
})
export default class UserDetails extends Vue {

    show: boolean = false;
    headers: any;
    showActions: any = {search: false, view: true, edit: false, delete: false}

    @Getter('selectedUser') selectedUser: any;
    @Action('SELECTED_POST') actionSelectedPost: any;

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

    onClick(option: any) {
        const {action, item} = option;
        if (action === "viewItem") {
            this.viewItem(item);
        }
    }
    
};
</script>
   
<style scoped>
    .avatar {
        margin-top: 15px;
    }
    .card__title {
        justify-content: center;
        padding: 0;
    }
    a {
        text-decoration: none;
    }
</style>