<template>
    <v-card>   
        <v-container fluid grid-list-lg @click="viewItem(item)">
            <v-layout row>
            <v-flex xs7>
                <card-skeleton-header v-if="hasHeader">
                </card-skeleton-header>
                <!--
                <v-card-title primary-title>
                    <div>
                        <h3 class="headline">{{ item.title }}</h3>
                        <div class="content">{{ item.content }}</div>
                    </div>
                </v-card-title>
                -->
                <v-spacer></v-spacer>
                <card-skeleton-actions v-if="hasActions"></card-skeleton-actions>
                <!--
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
                -->
            </v-flex>
            <v-flex xs5>
                <!--<v-card-media src="http://maestroselectronics.com/wp-content/uploads/2017/12/No_Image_Available.jpg" height="200px" contain></v-card-media>-->
                <card-skeleton-media v-if="hasMedia"></card-skeleton-media>
            </v-flex>
            </v-layout>
        </v-container>
    </v-card>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component'

import CardSkeletonHeader from './CardSkeletonHeader.vue'
import CardSkeletonMedia from './CardSkeletonMedia.vue'
import CardSkeletonActions from './CardSkeletonActions.vue'

@Component({
    props: {
        hasHeader: Boolean,
        hasMedia: Boolean,
        hasActions: Boolean
    },
    components: {
        // Add a reference to the component in the components property.
        CardSkeletonHeader,
        CardSkeletonMedia,
        CardSkeletonActions
    }
})
export default class CardSkeleton extends Vue {

    constructor() {
        super();
    }


};
</script>
   
<style scoped>
</style>