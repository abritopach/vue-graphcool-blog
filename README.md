# Vue-Graphcool-Blog

Sample project that shows how to build a Blog App (Role Based Authentication) with VueJS, Vuex, GraphQL, Apollo Client and Graphcool.

This example is based on the example ["Build a Blog with VueJS, GraphQL and Apollo Client"](https://scotch.io/tutorials/build-a-blog-with-vue-graphql-and-apollo-client) that I modified to practice my skills. The original post uses GraphQL server built with AdonisJS and it also uses Bulma CSS. I have decided to replace "GraphQL server built with AdonisJS and Bulma CSS" with Graphcool and Vuetify. This project integrates Typescript in VueJS.

This project shows you how to:

    * Integrates Typescript in VueJS.
    * Role based authentication.
    * Use vuex to manage state app.
    * Use graphql: queries, mutations, subscriptions.
    * User login and signup.
    * Forgot password: 
        - Sendgrid is used for sending emails: [outdated documentation]https://github.com/graphcool/templates/tree/master/outdated/auth/email-user-management/functions/reset-password
    * If you are a simple user
        * Edit your profile (change your avatar image).
        * Show the latest posts published by users.
        * Show post details
        * Manage your posts: show, filter, edit, delete.
    * If you are a admin user (extra functionality)
        * Manage all posts: show, filter, edit, delete.
        * Manage all users: show, filter, edit, delete (delete posts associated with a user when the user is deleted.).
    * Infinite scroll in latest post view.
    * Skeleton Screen in latest post view.


Technologies: Vue.js, Vuetify.js, Vuex, Typescript, GraphQL, Apollo Client and Graphcool.

![Technologies](readme_resources/graphql_apollo_vue_graphcool.png "Technologies")

## App Example

![App example](readme_resources/app.gif "App example")

## Build Setup

Before you go through this example, you should have at least a basic understanding of Vue concepts. You must also already have Vue Cli installed on your machine.

``` bash
# Install dependencies.
npm install

# Serve with hot reload at localhost:8080
npm run dev

# Build for production with minification
npm run build
```

For detailed explanation on how things work, consult the [docs for vue-loader](http://vuejs.github.io/vue-loader).

## Requirements

* [Node.js](http://nodejs.org/)
* [Vue cli](https://github.com/vuejs/vue-cli)