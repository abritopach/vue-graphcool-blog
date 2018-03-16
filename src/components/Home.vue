<template>
   <section v-if="allPosts">
        <h2>Latest Posts</h2>
        <v-card>
        <v-container fluid grid-list-lg>
            <v-layout row wrap>
            <v-flex xs12 sm6 md6 lg4 v-for="item in allPosts" v-bind:key="item.id" >
                <v-card height="100%">   
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
    </section>
</template>

<script lang="ts">

import Vue from 'vue' 
import Component from 'vue-class-component'

import AppDataTable from '../components/common/AppDataTable.vue'

// Vuex.
import { Action } from 'vuex-class';

import { ALL_POSTS_QUERY, subscribeToPostsChanges } from '../graphql/graphql'

@Component({
    apollo: {
        // Fetch all posts.
        allPosts: {
            query: ALL_POSTS_QUERY
        }
    },
    components: {
        // Add a reference to the component in the components property.
        AppDataTable
    }
})
export default class Home extends Vue {

    search: string = '';
    headers: any;
    items: any = [];
    subscription: any;
    showActions: any = {search: true, view: true, edit: false, delete: false}

    @Action('SELECTED_POST') actionSelectedPost: any;

    constructor() {
        super();
        this.headers = [
            { text: 'Title', align: 'left', value: 'title'},
            { text: 'Username', align: 'left', value: 'username' },
            { text: 'DateTime', align: 'left', value: 'datetime'},
            { text: 'Actions', align: 'left', value: 'actions' }
        ];
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
</style>
