<template>
    <img :src="srcImage()" />
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

@Component({
     props: {
        src: String
    }
})
export default class AppLazyImage extends Vue {

    observer: any;
    intersected: boolean = false;

    constructor() {
        super();
    }

    srcImage() {
        return this.intersected ? this.$props.src : '';
    }

    mounted() {
        this.observer = new IntersectionObserver(entries => {
        const image = entries[0];
            if (image.isIntersecting) {
                this.intersected = true;
                this.observer.disconnect();
            }
        });

        this.observer.observe(this.$el);
    }

    destroyed() {
        this.observer.disconnect();
    }
    
};
</script>
   
<style scoped>
</style>