<template>
    <v-layout row>
        <v-flex xs12 sm6 offset-sm3>
            <h2>User Details</h2>
            <v-card v-if="User">
                <v-avatar size="100px">
                    <img src="http://i.pravatar.cc/120" alt="">
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
                <v-data-table v-show="show" :headers="headers" :items="User.posts" :loading="!User.posts" hide-actions class="elevation-1">
                    <v-progress-linear slot="progress" color="blue" indeterminate></v-progress-linear>
                    <template slot="items" slot-scope="props">
                        <td class="text-xs-left">{{ props.item.title }}</td>
                        <td class="text-xs-left">{{ props.item.createdAt | formatDate }}</td>
                        <td class="justify-center layout px-0">
                            <!--<router-link :to="`/postdetails/${props.item.id}`">-->
                                <v-btn icon class="mx-0" @click="viewItem(props.item)">
                                    <v-icon color="primary">visibility</v-icon>
                                </v-btn>
                            <!--</router-link>-->
                        </td>
                    </template>
                </v-data-table>
                </v-slide-y-transition>
            </v-card>
        </v-flex>
    </v-layout>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

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
    }
})
export default class UserDetails extends Vue {

    show: boolean = false;
    headers: any;

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
        console.log('viewItem', item);
        this.actionSelectedPost({ data: item });
        this.$router.push('/postdetails')
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