<template>
    <section v-if="allPosts" class="relatedPosts">
        <h2>Related Posts</h2>
        <v-card v-if="allPosts.length != 0">
        <v-container fluid grid-list-lg class="containerCard">
        <v-layout row wrap>
        <v-flex xs12 sm6 md6 lg4 v-show="!loadingallPosts" v-for="item in allPosts" v-bind:key="item.id" >
            <v-card class="homeCard" height="100%">   
            <v-container fluid grid-list-lg @click="viewItem(item)">
                <v-layout row>
                <v-flex xs7>
                    <v-card-title primary-title>
                        <div>
                            <h3 class="headline">{{ item.title }}</h3>
                            <div class="content">{{ item.content }}</div>
                        </div>
                    </v-card-title>
                    <v-spacer></v-spacer>
                    <v-card-actions>
                        <v-list three-line>
                        <v-list-tile avatar>
                            <v-list-tile-avatar>
                                <img v-if="item.user.avatar !== null" :src="item.user.avatar" alt="">
                                <img v-else src="../assets/avatar.png" alt="">
                            </v-list-tile-avatar>
                            <v-list-tile-content>
                                <v-list-tile-title>{{ item.user.username }}</v-list-tile-title>
                                <v-list-tile-sub-title>{{ item.createdAt | formatDate }}</v-list-tile-sub-title>
                            </v-list-tile-content>
                            <v-list-tile-action v-if="item.likes != 0">
                                <v-list-tile-action-text>{{ item.likes }} <v-icon color="pink">star</v-icon></v-list-tile-action-text>
                            </v-list-tile-action>
                        </v-list-tile>
                        <div class="categories" v-if="item.categories.length !== 0">
                            <v-chip label color="pink" text-color="white">
                                <v-icon left>label</v-icon>{{ item.categories.length }} categories
                            </v-chip>
                        </div>
                        </v-list>
                    </v-card-actions>
                </v-flex>
                <v-flex xs5>
                    <v-card-media v-if="item.image != null" :src="item.image" height="200px" contain></v-card-media>
                    <v-card-media v-else src="http://maestroselectronics.com/wp-content/uploads/2017/12/No_Image_Available.jpg" height="200px" contain></v-card-media>
                </v-flex>
                </v-layout>
            </v-container>
            </v-card>
        </v-flex>
        <v-flex xs12 sm6 md6 lg4 v-show="loadingallPosts">
            <card-skeleton v-for="n in 6" v-bind:key="n" :hasHeader="true" :hasActions="true" :hasMedia="true"></card-skeleton>
        </v-flex>
        </v-layout>
        </v-container>
    </v-card>
    </section>
</template>

<script lang="ts">

import Vue from 'vue' 
import Component from 'vue-class-component'

import { CategoryModel } from '../types'

import { RELATED_POSTS_QUERY } from '../graphql/graphql'

import { Getter, Action } from 'vuex-class';

import CardSkeleton from '../components/common/CardSkeleton/CardSkeleton.vue'

@Component({
    props: {
        categories: {
            type: Array,
            default: function () { return [] }
        }
    },
    apollo: {
        // Fetch all posts.
        allPosts: {
            query: RELATED_POSTS_QUERY,
            variables () {
                return {
                    orderBy: "createdAt_DESC",
                    first: 3,
                    filter: this.filter
                }
            },
            fetchPolicy: "network-only",
            result (data: any) {
                console.log("allPosts result", data);
            },
            watchLoading(isLoading, countModifier) {
                console.log("watchLoading allPosts", isLoading);
                console.log("countModifier", countModifier);
                if (!isLoading) {
                    setTimeout(() => {
                        this.$data.loadingallPosts = isLoading;
                    }, 500);
                }
                console.log("this.$data.loadingallPosts", this.$data.loadingallPosts);
            },
        }
    },
    components: {
        // Add a reference to the component in the components property.
        CardSkeleton
    }
})
export default class RelatedPosts extends Vue {

    loadingallPosts: boolean = true;
    @Getter('selectedPost') selectedPost: any;
    filter: any;
    @Action('SELECTED_POST') actionSelectedPost: any;

    mounted() {
        console.log("mounted");
        console.log(this.$props.categories);
        console.log(this.selectedPost);

        let categories = this.$props.categories.map((category: CategoryModel) => category.name);

        this.filter = {
                    AND: [
                    {
                        categories_some: {
                            name_in: categories
                        }, 
                    },
                    {
                        title_not: this.selectedPost.title
                    }
                    ]
                }

        this.$apollo.queries.allPosts.refetch(
            {
                orderBy: "createdAt_DESC",
                first: 3,
                filter: this.filter
            }
        );
    }

    viewItem(item: any) {
        // console.log('viewItem', item);
        this.actionSelectedPost({ data: item });
        this.$router.push('/postdetails');
        // Scroll to top of page.
        setTimeout(() => {
            window.scrollTo(0, 0);
        }, 100);
    }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only. -->
<style scoped>
    .relatedPosts {
        margin-top: 20px;
        background-color: gainsboro;
    }
    .containerCard {
        background-color: #F0FFFF;
    }
    a {
        text-decoration: none;
        /*color: white;*/
    }
    li {
        list-style: none;
    }
    .content {
        height: 3em;
        overflow: hidden;
        width: 100%;
        justify-content: center;
    }
    content::before {
        content: '...';
        float: right;
    }
    .list__tile {
        height: 56px;
    }
    .categories {
        height: 32px;
    }
    .homeCard {
        border-left: 4px solid #c73460;
    }
</style>
