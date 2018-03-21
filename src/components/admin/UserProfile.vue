<template>
     <v-layout row>
        <v-flex xs12 sm6 lg4 offset-sm3 offset-lg4>
            <h2>User Profile</h2>
            <v-card v-if="loggedUser">
                <div @click="showUpload = !showUpload">
                <v-badge color="red">
                    <span slot="badge"><v-icon color="white">edit</v-icon></span>
                    <v-avatar size="100px">
                        <img v-if="loggedUser.avatar !== null" :src="loggedUser.avatar" alt="">
                        <img v-else src="../../assets/avatar.png" alt="">
                    </v-avatar>
                </v-badge>
                </div>
                <v-card-title primary-title>
                <div>
                    <v-list three-line>
                        <v-list-tile avatar>
                            <v-list-tile-content>
                                <v-list-tile-title>{{loggedUser.username}}</v-list-tile-title>
                                <v-list-tile-sub-title>{{loggedUser.email}}</v-list-tile-sub-title>
                                <v-list-tile-sub-title><v-chip color="pink darken-1" text-color="white">Role: {{loggedUser.role}}</v-chip></v-list-tile-sub-title>
                            </v-list-tile-content>
                        </v-list-tile>
                    </v-list>
                </div>
                </v-card-title>
                <picture-input v-if="showUpload" ref="pictureInput" @change="onChange" width="600" height="600" margin="16"  accept="image/jpeg,image/png,image/gif" 
                            size="10"  buttonClass="ui button primary" :customStrings="{upload: '<h1>Upload it!</h1>', drag: 'Drag and drop your image here'}">}">
                </picture-input>
            </v-card>
        </v-flex>
    </v-layout>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

import { Getter } from 'vuex-class';

import { UPDATE_USER_AVATAR_MUTATION } from '../../graphql/graphql'

import EventBus from '../../event.bus';

// import PictureInput from 'vue-picture-input/PictureInput.vue'

import PictureInput from 'vue-picture-input'

@Component({
    components: {
        'picture-input': PictureInput
    }
})
export default class UserProfile extends Vue {

    @Getter('loggedUser') loggedUser: any;
    showUpload: boolean = false;
    image: any;

    constructor() {
        super();
    }

    onChange (image: any) {
        if (image) {
            this.image = image;
            this.loggedUser.avatar = image;
            this.updateUser();
        } else {
            console.log('FileReader API not supported: use the <form>')
        }
    }

    updateUser() {
        this.$apollo
            .mutate({
                mutation: UPDATE_USER_AVATAR_MUTATION,
                variables: {
                    id: this.loggedUser.id,
                    avatar: this.image
                }
            })
            .then(response => {
                console.log(response);
                this.showUpload = !this.showUpload;
                EventBus.$emit('SHOW_SNACKBAR', {show: true, color: "pink darken-1", timeout: 6000, text: "Image updated successfully"});
            })
    }
    
};
</script>

<style scoped>
    .avatar {
        margin-top: 15px;
    }
    .card__title, card__actions {
        justify-content: center;
        padding: 0;
    }
    .list__tile__title, .list__tile__sub-title {
        text-align: center;
    }
    span.badge__badge {
        top: 15px!important;
        right: 8px!important;
    }
</style>