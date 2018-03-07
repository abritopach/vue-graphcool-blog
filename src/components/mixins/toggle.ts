import Vue from 'vue';
import { Mixin } from 'vue-mixin-decorator';
 
@Mixin
export default class MyMixin extends Vue {

    isShowing: boolean = false;

    created() {
        console.log('Mixin created()');
    }

    toggleShow() {
        this.isShowing = !this.isShowing;
    }
    
}