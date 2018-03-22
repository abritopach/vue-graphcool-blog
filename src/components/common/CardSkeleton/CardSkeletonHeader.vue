<template>
    <v-card-title primary-title>
        <div>
            <div class="skeleton__card__header__title mt-2">Título del post</div>
            <div class="skeleton__card__header__subtitle mt-1">Contenido del post</div>
            <div class="skeleton__card__header__subtitle mt-1">Contenido del post</div>
        </div>
    </v-card-title>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component'

@Component
export default class CardSkeletonHeader extends Vue {

    constructor() {
        super();
    }


};
</script>
   
<style scoped>
    .skeleton__card__header__subtitle {
        height: 1em;
        width: 100%;
        justify-content: center;
        background-color: gainsboro;
        color: transparent;
    }
    .skeleton__card__header__title {
        height: 1em;
        width: 100%;
        background-color: gray;
        font-size: 24px;
        font-weight: 400;
        line-height: 32px;
        color: transparent;
    }
</style>