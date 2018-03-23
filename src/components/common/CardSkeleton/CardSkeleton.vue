<template>
    <v-card>   
        <v-container fluid grid-list-lg>
            <v-layout row>
            <v-flex xs7>
                <card-skeleton-header v-if="hasHeader">
                </card-skeleton-header>
                <v-spacer></v-spacer>
                <card-skeleton-actions v-if="hasActions"></card-skeleton-actions>
            </v-flex>
            <v-flex xs5>
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