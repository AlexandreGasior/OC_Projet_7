<template>
    <section class="posts-menu">
        <h1 class="posts-menu__title">Les Posts</h1>
        <router-link class="posts-menu__create-link" to="/createpost">
            <button class="posts-menu__create-button">
                <font-awesome-icon icon="pen" /> Créer un nouveau post
            </button>
        </router-link>
        <div class="posts-menu__posts" v-for="post in posts" :key="post.id">
            <router-link
                :to="{ name: 'Post', params: { id: post.id } }"
                class="post__router-link"
            >
                <p class="post__user">
                    {{ post.user.firstName }} {{ post.user.lastName }}
                </p>
                <img
                    :src="post.imageUrl"
                    :alt="post.content"
                    class="post__image"
                />
                <p class="post__desc">{{ post.content }}</p>
            </router-link>
        </div>
    </section>
</template>

<script>
import axios from "axios";
import VueJwtDecode from "vue-jwt-decode";

export default {
    name: "PostsMenu",
    data() {
        return {
            posts: [],
            userRole: VueJwtDecode.decode(sessionStorage.getItem("userToken"))
                .userRole,
            userId: sessionStorage.getItem("userId"),
            userToken: sessionStorage.getItem("userToken"),
        };
    },
    methods: {
        getAllPosts() {
            // Create header to get authentified for request
            const header = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${this.userToken}`,
                },
            };
            // Send request to get all posts
            axios
                .get("http://localhost:3000/api/posts/", header)
                .then((res) => {
                    this.posts = res.data;
                })
                .catch((error) => console.log({ error }));
        },
    },
    beforeMount() {
        this.getAllPosts();
    },
};
</script>

<style lang="scss">
.posts-menu {
    background-color: #b8b8b8;
    border-radius: 30px;
}
</style>