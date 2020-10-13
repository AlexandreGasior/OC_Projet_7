<template>
    <div class="post-menu" id="post" v-bind="post" :key="post.id">
        <p class="post__user">
            {{ post.user.firstName }} {{ post.user.lastName }}
        </p>
        <p class="post__content">{{ post.content }}</p>
        <img :src="post.imageUrl" alt="" class="post__image" />
        <router-link
            class="post__modify-router"
            :to="{ name: 'ModifyPost', params: { id: post.id } }"
        >
            <button
                class="post__modify-button"
                v-if="post.userId === userId || userRole === 'admin'"
            >
                <font-awesome-icon icon="pen" /> Modifier
            </button>
        </router-link>
        <button
            class="post__delete"
            v-if="post.userId === userId || userRole === 'admin'"
            v-on:click="deletePost(post.id)"
        >
            <font-awesome-icon icon="trash" /> Supprimer
        </button>
    </div>
</template>

<script>
import axios from "axios";
import VueJwtDecode from "vue-jwt-decode";

export default {
    name: "PostMenu",
    data() {
        return {
            postId: window.location.href.substr(-1),
            post: {},
            userRole: VueJwtDecode.decode(sessionStorage.getItem("userToken"))
                .userRole,
            userId: parseInt(sessionStorage.getItem("userId")),
            userToken: sessionStorage.getItem("userToken"),
        };
    },
    methods: {
        getPost() {
            axios
                .get("http://localhost:3000/api/posts/" + this.postId, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${this.userToken}`,
                    },
                })
                .then((res) => {
                    this.post = res.data;
                })
                .catch((error) => console.log({ error }));
        },
        deletePost(id) {
            axios
                .delete("http://localhost:3000/api/posts/" + id, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${this.userToken}`,
                    },
                })
                .then(() => {
                    window.location.href = "/";
                })
                .catch((error) => console.log(error));
        },
    },
    beforeMount() {
        this.getPost();
    },
};
</script>

<style lang="scss">
</style>