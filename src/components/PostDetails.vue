<template>
    <section v-if="Post">
        <h1>Post Details</h1>
        <!-- Dialog Categories. -->
        <app-dialog title="Categories" :show="dialog.show" @clickAccept="onClickAccept">
            <v-layout row wrap>
                <v-flex md6 lg6  v-for="category in dialog.categories" v-bind:key="category.id">
                    <v-chip label color="pink" text-color="white">
                        <v-icon left>label</v-icon>{{ category.name }}
                    </v-chip>
                </v-flex>
            </v-layout>
        </app-dialog>
        <v-layout row>
            <v-flex xs12 sm6 lg4 offset-sm3 offset-lg4>
            <v-card>
                <v-card-media v-if="Post.image !== null" :src="Post.image" height="200px" contain></v-card-media>
                <v-card-media v-else src="http://maestroselectronics.com/wp-content/uploads/2017/12/No_Image_Available.jpg" height="200px" contain></v-card-media>
                <v-card-title primary-title> 
                    <v-avatar size="48px">
                        <img v-if="Post.user.avatar !== null" :src="Post.user.avatar" alt="Avatar image">
                        <img v-else src="../assets/avatar.png" alt="Avatar image not available">
                    </v-avatar>
                    <div>
                        <v-list three-line>
                            <v-list-tile avatar>
                                <v-list-tile-content>
                                    <v-list-tile-title>{{ Post.title }}</v-list-tile-title>
                                    <v-list-tile-sub-title>{{ Post.user.username }}</v-list-tile-sub-title>
                                    <v-list-tile-sub-title v-if="Post.categories.length !== 0">
                                        <v-chip label color="pink" text-color="white" @click.stop="showCategories(Post.categories)">
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
        <v-spacer></v-spacer>
        <div class="comments">
            <vue-disqus shortname="blogadri" :title="Post.title" :identifier="Post.id" url="http://example.com"></vue-disqus>
        </div>
        <related-posts :categories="Post.categories"></related-posts>
    </section>
</template>

<script lang="ts">

import Vue from 'vue' 
import Component from 'vue-class-component'

import AppDialog from '../components/common/AppDialog.vue'
import RelatedPosts from './RelatedPosts.vue'

import VueDisqus from 'vue-disqus/VueDisqus.vue'

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
    },
    components: {
        // Add a reference to the component in the components property.
        AppDialog,
        RelatedPosts,
        VueDisqus
    }
})
export default class PostDetails extends Vue {

    show: boolean = true;

    @Getter('selectedPost') selectedPost: any;
    dialog: any = {show: false};

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

    showCategories(categories: any) {
        console.log("showCategories", categories);
        this.dialog = {show: true, categories: categories};
    }

    onClickAccept() {
        this.dialog.show = false;
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
