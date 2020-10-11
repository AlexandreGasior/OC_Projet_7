<template>
    <section class="posts-menu">
        <h1 class="posts-menu__title">Les Posts</h1>
        <div class="posts-menu__posts" v-for="post in posts" :key="post.id">
            <div class="post__title">
                <p class="post__user">{{ post.user.firstName }}  {{ post.user.lastName }}</p>
                <p class="post__desc">{{ post.content }}</p>
                <button class="post__delete">
                    Supprimer
                </button>
            </div>
        </div>
    </section>
</template>

<script>
import axios from 'axios'

export default {
    name: 'PostsMenu',
    data() {
        return {
            posts: []
        }
    },
    methods: {
        getAllPosts(){
            axios.get('http://localhost:3000/api/posts/')
            .then(res => {
                this.posts = res.data;
            })
            .catch(error => console.log({error}));
        }
    },
    beforeMount() {
        this.getAllPosts();
    }
}
</script>

<style lang="scss">
.posts-menu {
    background-color: #b8b8b8;
    border-radius: 30px;
}
</style>