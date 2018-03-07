<template>
    <!-- Dialog edit post. -->
    <v-dialog v-model="isShowing" max-width="500px">
        <v-card>
        <v-card-title>
            {{ dialogTitle }}
        </v-card-title>
        <v-card-text>
            <v-flex xs12>
                <slot></slot>
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
import { Component, Mixins } from 'vue-mixin-decorator'
import { Watch } from 'vue-property-decorator'

import MyMixin from '../mixins/toggle'

@Component({
    props: {
        title: String,
        show: Boolean
    }
})
export default class AppDialog extends Mixins<MyMixin>(MyMixin) {

    dialogTitle: String = "";
    @Watch('show')
    onShowChanged(val: Boolean, oldVal: Boolean) {
        this.toggleShow();
    }

    constructor() {
        super();
    }

    created() {
        console.log("created AppDialog");
    }

    mounted() {
        console.log("mounted AppDialog");
        // console.log(this.$props);
        this.dialogTitle = this.$props.title;
        this.isShowing = this.$props.show;
    }

    onClickAccept() {
        // console.log('onClickAccept');
        this.$emit('clickAccept', 'someValue');
    }
    
};
</script>
   
<style scoped>
</style>