<template>
    <section class="posts-menu">
        <div class="posts-menu__main">
            <h1 class="posts-menu__title">Les Posts</h1>
            <router-link class="posts-menu__create-link" to="/createpost">
                <button class="posts-menu__create-button">
                    <font-awesome-icon icon="pen" /> Créer un nouveau post
                </button>
            </router-link>
            <div class="posts-menu__posts" v-for="post in posts" :key="post.id">
                <router-link
                    :to="{ name: 'Post', params: { id: post.id } }"
                    class="posts-menu__router-link"
                >
                    <div class="posts-menu__image">
                        <img
                            :src="post.imageUrl"
                            :alt="post.content"
                            class="posts-menu__image"
                        />
                    </div>
                </router-link>
                <div class="posts-menu__author">
                    Post de
                    <span class="posts-menu__author-name"
                        >{{ post.user.firstName }}
                        {{ post.user.lastName }}</span
                    >
                </div>
            </div>
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
    display: flex;
    flex-direction: column;
    align-items: center;

    &__main {
        border-radius: 30px;
        box-shadow: 0px 0px 10px 5px rgba(184, 184, 184, 0.7);
        margin: 20px auto;
        background-color: #192946;
        max-width: 1000px;
        width: 90%;
    }

    &__title {
        text-transform: uppercase;
    }

    &__create-button {
        background-color: #d1515a;
        color: #ffffff;
        border: none;
        border-radius: 15px;
        padding: 15px 30px;
        margin-bottom: 30px;
        cursor: pointer;
    }

    &__posts {
        margin: 10px auto 10px auto;
        width: 90%;
        border: 1px solid #d1515a;
        border-radius: 15px;
    }

    &__image {
        max-width: 100%;
        border-radius: 15px 15px 0 0;
        background-color: #d1515a;
        &:hover {
            opacity: 0.7;
        }
    }

    &__author {
        background-color: #d1515a;
        border-radius: 0 0 15px 15px;
        padding: 5px 0;
    }

    &__author-name {
        font-style: italic;
        color: #192946;
    }
}
</style>