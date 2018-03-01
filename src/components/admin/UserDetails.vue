<template>
    <v-layout row>
        <v-flex xs12 sm6 offset-sm3>
            <h2>User Details</h2>
            <v-card>
                <v-avatar size="100px">
                    <img src="https://avatars0.githubusercontent.com/u/9064066?v=4&s=460" alt="">
                </v-avatar>
                <v-card-title primary-title>
                <div>
                    <div class="headline">Top western road trips</div>
                    <span class="grey--text">1,000 miles of wonder</span>
                </div>
                </v-card-title>
                <v-card-actions>
                <!--
                <v-btn flat>Share</v-btn>
                <v-btn flat color="purple">Explore</v-btn>
                -->
                <div>
                    <v-badge color="red">
                        <span slot="badge">2</span>
                        <span>Number of posts</span>
                    </v-badge>
                </div>
                <v-spacer></v-spacer>
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
        user: {
            query: USER_QUERY,
            variables () {
                return {
                    id: 'cje795cezzo140177f263pu5e'
                }
            }
        }
    }
})
export default class UserDetails extends Vue {

    show: boolean = false;
    id: any;

    constructor() {
        super();
    }

    mounted() {
        console.log('this.$route.params.id', this.$route.params.id);
        this.id = this.$route.params.id;
    }
    
};
</script>
   
<style>
    .avatar {
        margin-top: 15px;
    }
</style>