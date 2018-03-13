<template>
    <section>
        <v-layout>
            <v-flex xs12 sm6 lg4 offset-sm3 offset-lg4>
                <v-card>
                    <v-card-text>
                        <h3 class="headline mb-0">SignUp</h3>    
                    </v-card-text>
                    <v-card-media src="http://jjblog.wp-themes.pro/wp-content/uploads/2015/09/zgsdfg-1200x700.jpg" height="200px">
                    </v-card-media>
                    <v-card-title primary-title>
                    <div class="signUpForm">
                        <v-form v-model="valid" ref="form" lazy-validation>
                        <v-text-field label="Username" v-model="username" :rules="usernameRules" :counter="10" required></v-text-field>
                        <v-text-field label="E-mail" v-model="email" :rules="emailRules" required></v-text-field>
                        <v-text-field type="password" label="Password" v-model="password" :rules="passwordRules" required></v-text-field>
                        </v-form>
                    </div>
                    </v-card-title>
                    <v-card-actions>
                        <v-btn raised color="pink darken-1" class="white--text" @click="signup" :disabled="!valid">SignUp</v-btn>
                    </v-card-actions>
                </v-card>
            </v-flex>
        </v-layout>

    </section>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

import { SIGNUP_MUTATION } from '../../graphql/graphql'

@Component
export default class SignUp extends Vue {

    valid: boolean = true;
    username: string =  '';
    email: string = '';
    password: string = '';
    usernameRules: any;
    emailRules: any;
    passwordRules: any;

    constructor() {
        super();
        this.usernameRules = [(v: any) => !!v || 'Name is required.', (v: any) => (v && v.length <= 10) || 'Name must be less than 10 characters.'];
        this.emailRules = [(v: any) => !!v || 'E-mail is required.', (v: any) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid.'];
        this.passwordRules = [(v: any) => !!v || 'Password is required.'];
    }

    signup() {
        // console.log('signup');
        // console.log('this.$refs.form', this.$refs.form);
        if ((<any>this.$refs.form).validate()) {
            console.log('Valid form');
            // console.log('this.$apollo', this.$apollo);
            this.$apollo
                .mutate({
                    mutation: SIGNUP_MUTATION,
                    variables: {
                        username: this.username,
                        email: this.email,
                        password: this.password
                    }
                })
                .then(response => {

                    console.log(response);

                    // Redirect to login page.
                    this.$router.push('/login')
                })
                .catch( reason => {
                    console.error( 'onRejected function called: ', reason );
                })
        }
    }
    
};
</script>

<style scoped>
    .signUpForm {
        width: 100%;
    }
</style>