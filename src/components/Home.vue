<template>
   <section v-if="allPosts">
        <v-breadcrumbs divider="/">
            <v-breadcrumbs-item v-for="item in allCategories" :key="item.id" @click.native="filterPostsByCategory(item)">
                {{ item.name }}
            </v-breadcrumbs-item>
        </v-breadcrumbs>
        <h2>Latest Posts</h2>
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
        <v-card>
        <v-progress-circular v-if="$apollo.queries.allPosts.loading" indeterminate :size="50" color="primary"></v-progress-circular>
        <v-container fluid grid-list-lg>
            <v-layout row wrap>
            <v-flex xs12 sm6 md6 lg4 v-for="item in allPosts" v-bind:key="item.id" >
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
                                <v-chip label color="pink" text-color="white" @click.stop="showCategories(item.categories)">
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
            </v-layout>
            </v-container>
        </v-card>
        <infinite-loading v-if="!$apollo.queries._allPostsMeta.loading" @infinite="infiniteHandler($event)">
            <!--
            <span slot="no-more">
                There is no more posts :(
            </span>
            -->
        </infinite-loading>
    </section>
</template>

<script lang="ts">

import Vue from 'vue' 
import Component from 'vue-class-component'

import AppDataTable from '../components/common/AppDataTable.vue'
import AppDialog from '../components/common/AppDialog.vue'

import { CategoryModel } from '../types'

import InfiniteLoading from 'vue-infinite-loading/src/components/InfiniteLoading.vue';

// Vuex.
import { Action } from 'vuex-class';

import { ALL_POSTS_QUERY, POSTS_COUNT_QUERY, subscribeToPostsChanges, ALL_CATEGORIES_QUERY } from '../graphql/graphql'

@Component({
    apollo: {
        _allPostsMeta: {
            query: POSTS_COUNT_QUERY,
            fetchPolicy: "network-only",
            result (loading: any) {
                console.log(loading);
                if (!loading) {
                }
            },
        },
        // Fetch all posts.
        allPosts: {
            query: ALL_POSTS_QUERY,
            variables: {
                orderBy: "createdAt_DESC",
                skip: 0,
                first: 6,
                filter: {}
            },
            fetchPolicy: "network-only",
            result (data: any) {
                console.log(data);
            },
        }, 
        allCategories: {
            query: ALL_CATEGORIES_QUERY
        },
    },
    components: {
        // Add a reference to the component in the components property.
        AppDataTable, 
        AppDialog,
        'infinite-loading': InfiniteLoading
    }
})
export default class Home extends Vue {

    search: string = '';
    headers: any;
    subscription: any;
    showActions: any = {search: true, view: true, edit: false, delete: false}
    dialog: any = {show: false};
    postsCount: number = 6;
    skip: number;
    allPosts: any;
    _allPostsMeta: any;
    allCategories: any;

    @Action('SELECTED_POST') actionSelectedPost: any;

    constructor() {
        super();
        this.headers = [
            { text: 'Title', align: 'left', value: 'title'},
            { text: 'Username', align: 'left', value: 'username' },
            { text: 'DateTime', align: 'left', value: 'datetime'},
            { text: 'Actions', align: 'left', value: 'actions' }
        ];
        this.skip = this.postsCount;
    }

    created() {
        console.log("created Home");
    }

    mounted() {
        console.log("mounted Home");
        this.subscription = subscribeToPostsChanges(this.$apollo);
    }

    beforeDestroy() {
        // console.log("beforeDestroy Home");
        this.subscription.unsubscribe();
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

    showCategories(categories: any) {
        console.log("showCategories", categories);
        this.dialog = {show: true, categories: categories};
    }

    onClickAccept() {
        this.dialog.show = false;
    }


    loadMorePosts(event: any) {
        console.log("loadMorePosts");
        console.log(this.$apollo.queries.allPosts);

        // Fetch more data and transform the original result
        this.$apollo.queries.allPosts.fetchMore({
        variables: {
          skip: this.skip
        },
        // Transform the previous result with new data.
        updateQuery: (prevState: any, { fetchMoreResult } : any) => {
            if (!fetchMoreResult) return prevState;

            return {
              ...prevState,
              allPosts: [...prevState.allPosts, ...fetchMoreResult.allPosts],
            };
        },   
      })
    }

    infiniteHandler(event: any) {
        console.log("infiniteHandler");
        if (this.allPosts.length !== this._allPostsMeta.count) {
            if (this.skip <= this._allPostsMeta.count) {
                setTimeout(() => {
                    event.loaded()
                    this.loadMorePosts(event);
                    this.skip = this.skip + this.allPosts.length;
                }, 2000);
            }
            else {
                event.complete();
            }
        }
        else {
            event.complete();
        }
    }

    filterPostsByCategory(item: CategoryModel) {
        console.log("item", item);
        let filter = {
            categories_some: {
                name: item.name
            }
        };
        this.$apollo.queries.allPosts.refetch(
            {
                orderBy: "createdAt_DESC",
                skip: 0,
                first: 6,
                filter: filter
            }
        );
    }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only. -->
<style scoped>
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
