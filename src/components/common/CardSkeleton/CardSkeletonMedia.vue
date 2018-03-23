<template>
    <div class="skeleton__card__media"></div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component'

@Component
export default class CardSkeletonMedia extends Vue {

    constructor() {
        super();
    }


};
</script>
   
<style scoped>
    .skeleton__card__media {
        opacity: 0.5;
        height: 100px;
        background-color: lightgrey;
        transform: translateY(50%);
    }
</style>