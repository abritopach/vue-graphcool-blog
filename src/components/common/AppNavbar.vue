<template>
    <v-toolbar dark color="primary">
        <v-toolbar-side-icon></v-toolbar-side-icon>
        <v-toolbar-title class="white--text">{{title}}</v-toolbar-title>
        <v-spacer></v-spacer>
        <!--
        <v-btn icon>
        <v-icon>search</v-icon>
        </v-btn>
        <v-btn icon>
        <v-icon>apps</v-icon>
        </v-btn>
        <v-btn icon>
        <v-icon>refresh</v-icon>
        </v-btn>
        <v-btn icon>
        <v-icon>more_vert</v-icon>
        </v-btn>
        -->
    </v-toolbar>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

@Component
export default class AppNavbar extends Vue {

    title: any;

    constructor() {
        super();
        this.title = "VueJS & GraphCool Blog ";
    }
    
};
</script>

<style>
</style>