<template>
    <div>
        <v-toolbar dark color="primary">
            <v-toolbar-side-icon @click.stop="drawer = !drawer" v-if="showMenu() && !showBackButton()"></v-toolbar-side-icon>
            <v-btn v-if="showBackButton()" icon @click.native.stop="onClickBackButton()">
                <v-icon class="white--text">arrow_back</v-icon>
            </v-btn>
            <v-toolbar-title class="white--text">{{title}}</v-toolbar-title>
            <v-spacer></v-spacer>
            <router-link to="/login" v-if="!showMenu()">
                <v-btn flat>Login<v-icon right>input</v-icon></v-btn>
            </router-link>
            <router-link to="/signup" v-if="!showMenu()">
                <v-btn flat>SignUp<v-icon right>perm_identity</v-icon></v-btn>
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
                    <img v-if="loggedUser.avatar !== null" :src="loggedUser.avatar" alt="">
                    <img v-else src="../../assets/avatar.png" alt="">
                </v-list-tile-avatar>
                <v-list-tile-content>
                    <v-list-tile-title>{{ loggedUser.username }}</v-list-tile-title>
                </v-list-tile-content>
                <v-list-tile-action>
                    <router-link to="/profile">
                        <v-btn color="error" fab small aria-label="Edit Profile">
                            <v-icon>edit</v-icon>
                        </v-btn>
                    </router-link>
                </v-list-tile-action>
                </v-list-tile>
            </v-list>
            <v-list class="pt-0" dense subheader>
                <v-divider></v-divider>
                <v-subheader>HOME</v-subheader>
                <router-link v-for="item in itemsHome" :key="item.title" :to="item.to" :title="item.title" :aria-label="item.title">
                    <v-list-tile v-if="showMenuOption(item.roles)">
                    <v-list-tile-action>
                        <v-icon>{{ item.icon }}</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                    </v-list-tile-content>
                    </v-list-tile>
                </router-link>
            </v-list>
            <v-list class="pt-0" dense subheader>
                <v-divider></v-divider>
                <v-subheader>POST</v-subheader>
                <router-link v-for="item in itemsPost" :key="item.title" :to="item.to" :title="item.title" :aria-label="item.title">
                    <v-list-tile v-if="showMenuOption(item.roles)">
                    <v-list-tile-action>
                        <v-icon>{{ item.icon }}</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                    </v-list-tile-content>
                    </v-list-tile>
                </router-link>
            </v-list>
            <v-list class="pt-0" dense subheader>
                <v-subheader>USER</v-subheader>
                <router-link v-for="item in itemsUser" :key="item.title" :to="item.to" :title="item.title" :aria-label="item.title">
                    <v-list-tile v-if="showMenuOption(item.roles)">
                    <v-list-tile-action>
                        <v-icon>{{ item.icon }}</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                    </v-list-tile-content>
                    </v-list-tile>
                </router-link>
                <v-divider></v-divider>
                <v-list-tile @click="logout()">
                    <v-list-tile-action>
                        <v-icon>exit_to_app</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>Logout</v-list-tile-title>
                    </v-list-tile-content>
                    </v-list-tile>
            </v-list>
        </v-navigation-drawer>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

import { Getter, Action } from 'vuex-class';

@Component
export default class AppNavbar extends Vue {

    title: any;
    itemsHome: any;
    itemsPost: any;
    itemsUser: any;
    drawer: any;

    @Getter('loggedUser') loggedUser: any;
    @Action('LOGOUT') actionLogout: any;

    constructor() {
        super();
        this.title = "VueJS & GraphCool Blog ";
        this.drawer = null,
        this.itemsHome = [
            { title: 'Latest Posts', icon: 'schedule', to: '/', roles: ['admin', 'user']}
        ];
        this.itemsPost = [
          { title: 'New Post', icon: 'create', to: '/admin/posts/new', roles: ['admin', 'user']},
          { title: 'Posts', icon: 'description', to: '/admin/posts', roles: ['admin']},
          { title: 'My Posts', icon: 'description', to: '/myposts', roles: ['user']}
        ];
        this.itemsUser = [
            { title: 'Users', icon: 'people', to: '/admin/users', roles: ['admin']}
        ];
    }

    showMenu() {
        return this.$route.meta.requiresAuth;
    }

    showBackButton() {
        return this.$route.meta.showBackButton;
    }

    onClickBackButton() {
        this.$router.go(-1);
    }

    logout() {
        // console.log('logout');
        // Remove token from localstorage.
        localStorage.removeItem('blog-app-token');
        // Clear state.
        this.actionLogout();
        this.$router.push({ path: '/login' })
    }

    showMenuOption(roles: string[]) {
        // let authUser = JSON.parse(localStorage.getItem('blog-app-token') || "null");
        //if (authUser !== null) return roles.includes(authUser.user.role);
        if (this.loggedUser.id != null) return roles.includes(this.loggedUser.role);
        return false;
    }
    
};
</script>
   
<style scoped>
    a {
        text-decoration: none;
    }
    .btn {
        font-size: 8px;
        /*min-width: 60px;*/
    }
</style>