<template>
    <div>
        <v-toolbar dark color="primary">
        <v-toolbar-side-icon @click.stop="drawer = !drawer">
        </v-toolbar-side-icon>
        <v-toolbar-title class="white--text">{{title}}</v-toolbar-title>
        <v-spacer></v-spacer>
        <router-link to="/login">
            <v-btn flat>Login</v-btn>
        </router-link>
        <router-link to="/signup">
            <v-btn flat>
                SignUp
            </v-btn>
        </router-link>
        <!--
        <v-btn icon>
        <v-icon>refresh</v-icon>
        </v-btn>
        <v-btn icon>
        <v-icon>more_vert</v-icon>
        </v-btn>
        -->
    </v-toolbar>
    <v-navigation-drawer temporary v-model="drawer" absolute>
        <v-list class="pa-1">
            <v-list-tile avatar>
            <v-list-tile-avatar>
                <img src="https://randomuser.me/api/portraits/men/85.jpg" >
            </v-list-tile-avatar>
            <v-list-tile-content>
                <v-list-tile-title>John Leider</v-list-tile-title>
            </v-list-tile-content>
            </v-list-tile>
        </v-list>
        <v-list class="pt-0" dense>
            <v-divider></v-divider>
            <router-link v-for="item in items" :key="item.title" :to="item.to">
            <v-list-tile>
            <v-list-tile-action>
                <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
                <v-list-tile-title>{{ item.title }}</v-list-tile-title>
            </v-list-tile-content>
            </v-list-tile>
            </router-link>
        </v-list>
    </v-navigation-drawer>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

@Component
export default class AppNavbar extends Vue {

    title: any;
    items: any;
    drawer: any;

    constructor() {
        super();
        this.title = "VueJS & GraphCool Blog ";
        this.drawer = null,
        this.items = [
          { title: 'New Post', icon: 'create', to: '/admin/posts/new'},
          { title: 'Posts', icon: 'description', to: '/admin/posts' },
          { title: 'Users', icon: 'people', to: '/admin/users' }
        ];
    }
    
};
</script>
   
<style scoped>
    a {
        text-decoration: none;
    }
</style>