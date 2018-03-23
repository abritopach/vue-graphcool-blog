<template>
    <v-card-title primary-title>
        <div class="skeleton__card__header__title mt-2"></div>
        <div class="skeleton__card__header__subtitle mt-1"></div>
        <div class="skeleton__card__header__subtitle mt-1"></div>
        <div class="skeleton__card__header__subtitle mt-1"> </div>
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
        /* background-color: lightgrey; */
        opacity: 0.5;

        background-image: 
        linear-gradient( 100deg, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.5) 50%, rgba(255, 255, 255, 0) 80% ),
        linear-gradient( lightgrey 20px, transparent 0 );

		background-repeat: repeat-y; 

        background-size: 50px 1em, /* highlight */
        100% 1em;

        background-position: -50px 0, /* highlight */
        0 0;

        animation: shine 1s infinite;
    }
    .skeleton__card__header__title {
        height: 1em;
        width: 75%;
        /*background-color: lightgrey;*/
        opacity: 0.5;
        font-size: 24px;
        font-weight: 400;
        line-height: 32px;

        background-image: 
        linear-gradient( 100deg, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.5) 50%, rgba(255, 255, 255, 0) 80% ),
        linear-gradient( lightgrey 20px, transparent 0 );

		background-repeat: repeat-y; 

        background-size: 50px 1em, /* highlight */
        100% 1em;

        background-position: -50px 0, /* highlight */
        0 0;

        animation: shine 1s infinite;

    }

     @keyframes shine {
		to {
			background-position:
                120% 0, /* move highlight to right */
                0 0
		}
     }

</style>