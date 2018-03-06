<template>
    <!-- Dialog edit post. -->
    <v-dialog v-model="isShowing" max-width="500px">
        <v-card>
        <v-card-title v-if="title">
            {{ title }}
        </v-card-title>
        <v-card-text>
            <v-flex xs12>
            </v-flex>
        </v-card-text>
        <v-card-actions>
            <v-btn color="primary" flat @click.stop="onClickAccept()">Accept</v-btn>
            <v-btn color="pink darken-1" flat @click.stop="toggleShow()">Close</v-btn>
        </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script lang="ts">
import Vue from 'vue';
//import Component from 'vue-class-component'
import { Prop } from 'vue-property-decorator'
import { Component, Mixins } from 'vue-mixin-decorator'

import MyMixin from '../mixins/toggle'

@Component
export default class AppDialog extends Mixins<MyMixin>(MyMixin) {

    @Prop({ default: "Dialog Title"})
    title: String = 'Dialog Title';

    /*
    constructor() {
        super();
    }
    */

    created() {
        console.log("created AppDialog");
        this.toggleShow();
    }

    mounted() {
        console.log("mounted AppDialog");
        console.log("title", this.title);
    }
    
};
</script>
   
<style scoped>
</style>