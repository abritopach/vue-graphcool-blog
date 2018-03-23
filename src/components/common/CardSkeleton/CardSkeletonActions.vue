<template>
    <v-card-actions>
        <v-list three-line>
        <v-list-tile avatar>
            <v-list-tile-avatar>
                <div class='skeleton-card_actions__avatar'></div>
            </v-list-tile-avatar>
            <v-list-tile-content>
                <v-list-tile-title class="skeleton-card_actions__title"></v-list-tile-title>
                <v-list-tile-sub-title class="skeleton-card_actions__subtitle mt-1"></v-list-tile-sub-title>
            </v-list-tile-content>
        </v-list-tile>
        </v-list>
    </v-card-actions>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component'

@Component
export default class CardSkeletonActions extends Vue {

    constructor() {
        super();
    }


};
</script>
   
<style scoped>
   .skeleton-card_actions__avatar {
        border-radius: 50%;
        height: 40px;
        width: 40px;
        background-color: lightgray;
        opacity: 0.5;
    }
    .skeleton-card_actions__title, .skeleton-card_actions__subtitle {
        background-color: lightgray;
        opacity: 0.5;
        height: 1em;
        width: 100px;
    }
</style>