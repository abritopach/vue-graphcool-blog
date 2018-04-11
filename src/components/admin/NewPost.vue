<template>
     <section>
        <v-layout>
            <v-flex xs10 sm6 lg4 offset-xs1 offset-sm3 offset-lg4>
                <v-card>
                    <v-card-text>
                        <h3 class="headline mb-0">New Post</h3>    
                    </v-card-text>
                    <v-card-media src="http://jjblog.wp-themes.pro/wp-content/uploads/2015/09/zgsdfg-1200x700.jpg" height="200px">
                    </v-card-media>
                    <v-card-title primary-title>
                    <div class="newPostForm">
                        <v-form v-model="valid" ref="form" lazy-validation>
                            <v-select v-if="allCategories" v-model="select" label="Categories" multiple chips tags :items="allCategories" return-object 
                            item-text="name" item-value="name" :rules="[() => select.length > 0 || 'You must choose at least one']">
                                <template slot="selection" slot-scope="data">
                                    <v-chip @input="data.parent.selectItem(data.item)" class="chip--select-multi"
                                            :selected="data.selected" :key="JSON.stringify(data.item)">
                                        <v-avatar class="accent">{{ data.item.name.slice(0, 1).toUpperCase() }}</v-avatar>
                                        {{ data.item.name }}
                                    </v-chip>
                                </template>
                            </v-select>
                            <v-text-field label="Title" v-model="title" :rules="titleRules" required></v-text-field>
                            <v-text-field label="Content" v-model="content" multi-line :rules="contentRules" required=""></v-text-field>
                            <v-switch :label="`Publish: ${publish.toString()}`" v-model="publish"></v-switch>
                            <picture-input ref="pictureInput"  @change="onChange" width="600" height="600" margin="16"  accept="image/jpeg,image/png,image/gif" 
                            size="10"  buttonClass="ui button primary" :customStrings="{upload: '<h1>Upload it!</h1>', drag: 'Drag and drop your image here'}">}">
                            </picture-input>
                        </v-form>
                    </div>
                    </v-card-title>
                    <v-card-actions>
                        <v-btn raised color="pink darken-1" class="white--text" @click="addPost" :disabled="!valid">Add Post</v-btn>
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

import { Getter } from 'vuex-class';

import { UserModel, CategoryModel  } from '../../types'

import { ADD_POST_MUTATION , ALL_POSTS_QUERY, ALL_CATEGORIES_QUERY } from '../../graphql/graphql' 

// import PictureInput from 'vue-picture-input/PictureInput.vue'

import PictureInput from 'vue-picture-input'

@Component({
     apollo: {
        // Fetch all categories.
        allCategories: {
            query: ALL_CATEGORIES_QUERY
        },
        // Fetch all posts.
        allPosts: {
            query: ALL_POSTS_QUERY
        }
    },
    components: {
        'picture-input': PictureInput
    }
})
export default class NewPost extends Vue {

    valid: boolean = true;
    title: string = '';
    content: string = '';
    titleRules: any;
    contentRules: any;
    categoriesRules: any;
    image: any;
    select: CategoryModel[] = [];
    publish: boolean = false;

    @Getter('loggedUser') loggedUser: any;

    constructor() {
        super();
        this.titleRules = [(v: any) => !!v || 'Title is required.'];
        this.contentRules = [(v: any) => !!v || 'Content is required.'];
    }

    addPost() {

        let categories = this.select.map( category => ({ 'name': category.name }));
        console.log(categories);

        if ((<any>this.$refs.form).validate()) {
            this.$apollo
                .mutate({
                    mutation: ADD_POST_MUTATION,
                    variables: {
                        title: this.title,
                        content: this.content,
                        image: this.image,
                        userId: this.loggedUser.id,
                        categories: categories,
                        isPublished: this.publish
                    },
                    update: (store, { data: { createPost } }) => {
                        // Read data from cache for this query.
                        let data = store.readQuery({ query: ALL_POSTS_QUERY }) || {};
                        console.log(data);

                        // Add new post from the mutation to existing posts.
                        (data as any)['allPosts'].push(createPost)

                        // Write data back to the cache.
                        store.writeQuery({ query: ALL_POSTS_QUERY, data })
                    }
                })
                .then(response => {
                    EventBus.$emit('SHOW_SNACKBAR', {show: true, color: "pink darken-1", timeout: 6000, text: "Post added successfully"});
                    // redirect to all posts
                    this.$router.push('/')
                })
        }
    }

    onChange (image: any) {
        //console.log('New picture selected!')
        if (image) {
            //console.log('Picture loaded.')
            //console.log(image);
            this.image = image;
        } else {
            console.log('FileReader API not supported: use the <form>')
        }
    }
    
};
</script>

<style scoped>
    .newPostForm {
        width: 100%;
    }
</style>