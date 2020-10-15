<template>
    <section class="post-menu">
        <div class="post-menu__main" id="post" v-bind="post" :key="post.id">
            <p class="post-menu__content">{{ post.content }}</p>
            <img :src="post.imageUrl" alt="" class="post-menu__image" />
            <p class="post-menu__author">
                Post de {{ post.user.firstName }} {{ post.user.lastName }}
            </p>
            <router-link
                class="post-menu__modify-router"
                :to="{ name: 'ModifyPost', params: { id: post.id } }"
            >
                <button
                    class="post-menu__modify-button"
                    v-if="post.userId === userId || userRole === 'admin'"
                >
                    <font-awesome-icon icon="pen" /> Modifier
                </button>
            </router-link>
            <button
                class="post-menu__delete-button"
                v-if="post.userId === userId || userRole === 'admin'"
                v-on:click="deletePost(post.id)"
            >
                <font-awesome-icon icon="trash" /> Supprimer
            </button>
        </div>
        <!-- <CommentsMenu /> -->
        <CreateCommentMenu />
    </section>
</template>

<script>
import axios from "axios";
import VueJwtDecode from "vue-jwt-decode";
// import CommentsMenu from "./CommentsMenu";
import CreateCommentMenu from "./CreateCommentMenu";

export default {
    name: "PostMenu",
    components: {
        // CommentsMenu,
        CreateCommentMenu,
    },
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
.post-menu {
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

    &__content {
    }

    &__image {
        max-width: 100%;
    }

    &__author {
    }

    &__modify-button {
        background-color: #d1515a;
        color: #ffffff;
        border: none;
        border-radius: 15px;
        padding: 15px 30px;
        margin-bottom: 30px;
        cursor: pointer;
        &:hover {
            opacity: 0.7;
        }
    }

    &__delete-button {
        background-color: gray;
        color: #ffffff;
        border: none;
        border-radius: 15px;
        padding: 15px 30px;
        margin-bottom: 30px;
        cursor: pointer;
        &:hover {
            opacity: 0.7;
        }
    }
}
</style>