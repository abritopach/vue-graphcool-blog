<template>
    <v-layout row>
        <v-flex xs12 sm6 offset-sm3>
            <h2>User Details</h2>
            <v-card v-if="User">
                <v-avatar size="100px">
                    <img src="https://avatars0.githubusercontent.com/u/9064066?v=4&s=460" alt="">
                </v-avatar>
                <v-card-title primary-title>
                <div>
                    <input class="input is-static">
                    <div class="headline">{{User.username}}</div>
                    <span class="grey--text">{{User.email}}</span>
                </div>
                </v-card-title>
                <v-card-actions>
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
                <v-card-text v-show="show">
                    I'm a thing. But, like most politicians, he promised more than he could deliver. You won't have time for sleeping, soldier, not with all the bed making you'll be doing. Then we'll go with that data file! Hey, you add a one and two zeros to that or we walk! You're going to do his laundry? I've got to find a way to escape.
                </v-card-text>
                </v-slide-y-transition>
            </v-card>
        </v-flex>
    </v-layout>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

import { USER_QUERY } from '../../graphql/graphql'

@Component({
    apollo: {
        // Fetch user by ID
        User: {
            query: USER_QUERY,
            variables () {
                return {
                    id: this.$route.params.id
                }
            }
        }
    }
})
export default class UserDetails extends Vue {

    show: boolean = false;

    constructor() {
        super();
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
</style>