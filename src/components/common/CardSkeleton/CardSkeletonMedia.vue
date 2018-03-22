<template>
    <div class="card__media" style="height: 200px;">
        <div class="card__media__background" style="background: url(&quot;http://maestroselectronics.com/wp-content/uploads/2017/12/No_Image_Available.jpg&quot;) center center / contain no-repeat;">
        </div>
        <div class="card__media__content"></div>
    </div>
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
</style>