<template>
    <section v-if="Post">
        <h1>Post Details</h1>
        <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
            <v-card>
                <v-card-media src="http://jjblog.wp-themes.pro/wp-content/uploads/2015/09/zgsdfg-1200x700.jpg" height="200px">
                </v-card-media>
                <v-card-title primary-title>
                <div>
                    <div class="headline">{{ Post.title }}</div>
                    <v-avatar size="36px">
                        <img src="https://avatars0.githubusercontent.com/u/9064066?v=4&s=460" alt="">
                    </v-avatar>
                    <span class="grey--text">{{ Post.user.username }}</span>
                </div>
                </v-card-title>
                <v-card-actions>
                <v-btn flat>Share</v-btn>
                <v-btn flat color="purple">Explore</v-btn>
                <v-spacer></v-spacer>
                <v-btn icon @click.native="show = !show">
                    <v-icon>{{ show ? 'keyboard_arrow_down' : 'keyboard_arrow_up' }}</v-icon>
                </v-btn>
                </v-card-actions>
                <v-slide-y-transition>
                <v-card-text v-show="show">
                   {{ Post.content }}
                </v-card-text>
                </v-slide-y-transition>
            </v-card>
            </v-flex>
        </v-layout>
    </section>
</template>

<script lang="ts">

import Vue from 'vue' 
import Component from 'vue-class-component'

import { POST_QUERY } from '../graphql/graphql'

@Component({
    apollo: {
        // Fetch post by id.
        Post: {
            query: POST_QUERY,
            variables () {
                return {
                    id: this.$route.params.id
                }
            }
        }
    }
})
export default class PostDetails extends Vue {

    show: boolean = false;

    constructor() {
        super();
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only. -->
<style scoped>
</style>