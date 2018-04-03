<template>
    <section>
        <v-layout>
            <v-flex xs10 sm6 lg4 offset-xs1 offset-sm3 offset-lg4>
                <v-card class="resetPassword">
                    <v-card-text>
                        <h3 class="headline mb-0">Reset Password</h3>    
                    </v-card-text>
                    <v-card-media src="http://jjblog.wp-themes.pro/wp-content/uploads/2015/09/zgsdfg-1200x700.jpg" height="200px">
                    </v-card-media>
                    <v-card-title primary-title>
                    <div class="resetPasswordForm">
                        <v-form v-model="valid" ref="form" lazy-validation>
                            <v-text-field type="password" label="New password" v-model="password" :rules="passwordRules" required></v-text-field>
                        </v-form>
                    </div>
                    </v-card-title>
                    <v-card-actions>
                        <v-btn raised color="pink darken-1" class="white--text" @click="update" :disabled="!valid">Update</v-btn>
                    </v-card-actions>
                </v-card>
            </v-flex>
        </v-layout>
    </section>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

import EventBus from '../../event.bus';

import { RESET_PASSWORD_MUTATION  } from '../../graphql/graphql'

@Component
export default class ResetPassword extends Vue {

    valid: boolean = true;
    password: string = '';
    passwordRules: any;

    constructor() {
        super();
        this.passwordRules = [(v: any) => !!v || 'Password is required.'];
    }

    mounted() {
        console.log(this.$route.query.token);
    }

    update() {
        console.log('Update');

        if ((<any>this.$refs.form).validate()) {
             this.$apollo
                .mutate({
                    mutation: RESET_PASSWORD_MUTATION,
                    variables: {
                        resetToken: this.$route.query.token,
                        password: this.password
                    }
                })
                .then(response => {
                    // console.log(response);
                    EventBus.$emit('SHOW_SNACKBAR', {show: true, color: "info", timeout: 6000, text: "Password updated"});
                })
                .catch( reason => {
                    console.log(JSON.parse(JSON.stringify(reason)));
                    EventBus.$emit('SHOW_SNACKBAR', {show: true, color: "error", timeout: 6000, text: JSON.parse(JSON.stringify(reason)).message});
                    console.error( 'onRejected function called: ', reason );
                })
        }
    }
    
};
</script>

<style scoped>
    .resetPassword {
        border-top: 5px solid #c73460;
        border-radius: 10px;
    }
    .resetPasswordForm {
        width: 100%;
    }
</style>