<template>
    <section>
        <v-card-title v-if="actions.search">
            <v-spacer></v-spacer>
            <v-text-field append-icon="search" label="Search" single-line hide-details v-model="search"></v-text-field>
        </v-card-title>
        <v-data-table :headers="headers" :items="data" :search="search" :loading="!data" hide-actions class="elevation-1">
            <v-progress-linear slot="progress" color="blue" indeterminate></v-progress-linear>
            <template slot="items" slot-scope="props">
                <!-- Posts fields. -->
                <template v-if="props.item.__typename === 'Post'">
                    <td class="text-xs-left">{{ props.item.title }}</td>
                    <td v-if="typeof props.item.user !== 'undefined'" class="text-xs-left">{{ props.item.user.username }}</td>
                    <td class="text-xs-left">{{ props.item.createdAt | formatDate }}</td>
                </template>
                <!-- Users fields. -->
                <template v-if="props.item.__typename === 'User'">
                    <td class="text-xs-left">{{ props.item.username }}</td>
                    <td class="text-xs-left">{{ props.item.email }}</td>
                </template>
                <td class="justify-center layout px-0">
                    <v-btn icon class="mx-0" @click="viewItem(props.item)" v-if="actions.view">
                        <v-icon color="primary">visibility</v-icon>
                    </v-btn>
                    <v-btn icon class="mx-0" @click="editItem(props.item)" v-if="actions.edit">
                        <v-icon color="teal">edit</v-icon>
                    </v-btn>
                    <v-btn icon class="mx-0" @click="deleteItem(props.item)" v-if="actions.delete">
                        <v-icon color="pink darken-1">delete</v-icon>
                    </v-btn>
                </td>
            </template>
            <v-alert slot="no-results" :value="true" color="error" icon="warning">
                Your search for "{{ search }}" found no results.
            </v-alert>
        </v-data-table>
    </section>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component'

@Component({
    props: {
        data: { type: Array, default: () => [] },
        headers: { type: Array, default: () => [] },
        actions: Object
    }
})
export default class AppDataTable extends Vue {

    search: string = '';

    constructor() {
        super();
    }

    viewItem(item: any) {
        // console.log('viewItem', item);
        this.$emit('clicked', {action: 'viewItem', item: item});
    }

    editItem(item: any) {
        // console.log('editItem', item);
        this.$emit('clicked', {action: 'editItem', item: item});
    }

    deleteItem(item: any) {
        // console.log('deleteItem', item);
        this.$emit('clicked', {action: 'deleteItem', item: item});
    }

};
</script>
   
<style scoped>
</style>