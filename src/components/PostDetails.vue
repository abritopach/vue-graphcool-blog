<template>
    <section v-if="Post">
        <h1>Post Details</h1>
        <v-layout row>
            <v-flex xs12 sm6 lg4 offset-sm3 offset-lg4>
            <v-card>
                <v-card-media src="http://jjblog.wp-themes.pro/wp-content/uploads/2015/09/zgsdfg-1200x700.jpg" height="200px">
                </v-card-media>
                <v-card-title primary-title>
                    <v-avatar size="48px">
                        <img v-if="Post.user.avatar !== null" :src="Post.user.avatar" alt="">
                        <img v-else src="../assets/avatar.png" alt="">
                    </v-avatar>
                    <div>
                        <v-list three-line>
                            <v-list-tile avatar>
                                <v-list-tile-content>
                                    <v-list-tile-title>{{ Post.title }}</v-list-tile-title>
                                    <v-list-tile-sub-title>{{ Post.user.username }}</v-list-tile-sub-title>
                                    <v-list-tile-sub-title>
                                        <v-chip label color="pink" text-color="white">
                                            <v-icon left>label</v-icon>{{ Post.categories.length }} categories
                                        </v-chip>
                                    </v-list-tile-sub-title>
                                </v-list-tile-content>
                            </v-list-tile>
                        </v-list>
                    </div>

                </v-card-title>
                <v-card-actions>
                <v-btn flat color="primary">Share <v-icon right dark>share</v-icon></v-btn>
                <v-btn flat color="purple" @click="onClickLike(Post)">Like <v-icon right dark>favorite</v-icon></v-btn>
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

import { Getter } from 'vuex-class';

import { POST_QUERY, UPDATE_POST_LIKES_MUTATION } from '../graphql/graphql'

import { PostModel } from '../types'

@Component({
    apollo: {
        // Fetch post by id.
        Post: {
            query: POST_QUERY,
            variables () {
                return {
                    id: this.selectedPost.id
                }
            }
        }
    }
})
export default class PostDetails extends Vue {

    show: boolean = false;

    @Getter('selectedPost') selectedPost: any;

    constructor() {
        super();
    }

    onClickLike(post: PostModel) {
        console.log(post);
        this.$apollo
            .mutate({
                mutation: UPDATE_POST_LIKES_MUTATION,
                variables: {
                    id: this.selectedPost.id,
                    likes: this.selectedPost.likes + 1
                }
            })
            .then(response => {
                console.log(response);
            })
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only. -->
<style scoped>
    .avatar {
        margin-top: 15px;
    }
    .card__title, card__actions {
        justify-content: center;
        padding: 0;
    }
    .list__tile__title, .list__tile__sub-title {
        text-align: center;
    }
</style>
