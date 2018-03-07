<template>
    <section>
        <v-layout>
            <v-flex xs12 sm6 offset-sm3>
                <v-card>
                    <v-card-text>
                        <h3 class="headline mb-0">Login</h3>    
                    </v-card-text>
                    <v-card-media src="http://jjblog.wp-themes.pro/wp-content/uploads/2015/09/zgsdfg-1200x700.jpg" height="200px">
                    </v-card-media>
                    <v-card-title primary-title>
                    <div class="loginForm">
                        <v-form v-model="valid" ref="form" lazy-validation>
                            <v-text-field label="E-mail" v-model="email" :rules="emailRules" required></v-text-field>
                            <v-text-field type="password" label="Password" v-model="password" :rules="passwordRules" required></v-text-field>
                        </v-form>
                    </div>
                    </v-card-title>
                    <v-card-actions>
                        <v-btn raised color="pink darken-1" class="white--text" @click="login" :disabled="!valid">Login</v-btn>
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

import { LOGIN_MUTATION  } from '../../graphql/graphql'

// Vuex.
import { Action } from 'vuex-class';

@Component
export default class SignUp extends Vue {

    valid: boolean = true;
    email: string = '';
    password: string = '';
    emailRules: any;
    passwordRules: any;

    @Action('LOGGED_USER') actionLoggedUser: any;

    constructor() {
        super();
        this.emailRules = [(v: any) => !!v || 'E-mail is required.', (v: any) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid.'];
        this.passwordRules = [(v: any) => !!v || 'Password is required.'];
    }

    login() {
         console.log('login');
         this.$apollo
                .mutate({
                    mutation: LOGIN_MUTATION,
                    variables: {
                        email: this.email,
                        password: this.password
                    }
                })
                .then(response => {
                    // console.log(response);

                    // Save user token to localstorage.
                    localStorage.setItem('blog-app-token', JSON.stringify(response.data.signinUser.token));

                    // Save user to state.
                    this.actionLoggedUser({ data: response.data.signinUser });

                    // Redirect user.
                    this.$router.push('/');
                })
                .catch( reason => {
                    console.log(JSON.parse(JSON.stringify(reason)));
                    EventBus.$emit('SHOW_SNACKBAR', {show: true, color: "error", timeout: 6000, text: JSON.parse(JSON.stringify(reason)).message});
                    console.error( 'onRejected function called: ', reason );
                })
    }
    
};
</script>

<style scoped>
    .loginForm {
        width: 100%;
    }
</style>