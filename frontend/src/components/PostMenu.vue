<template>
    <section class="post-menu">
        <div class="post-menu__main" id="post" v-bind="post" :key="post.id">
            <h1 class="post-menu__title">Post</h1>
            <p class="post-menu__content">{{ post.content }}</p>
            <img :src="post.imageUrl" alt="" class="post-menu__image" />
            <p class="post-menu__author">
                Post de
                <span class="post-menu__fullname"
                    >{{ post.user.firstName }} {{ post.user.lastName }}</span
                >
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
        <CreateCommentMenu />
        <div class="comments-menu__main">
            <h2 class="comments-menu__title">Commentaires</h2>
            <div
                class="comments-menu__comment"
                v-for="comment in comments"
                :key="comment.id"
            >
                <p class="comments-menu__comment-author">
                    Posté par
                    <span class="comments-menu__comment-fullname"
                        >{{ comment.user.firstName }}
                        {{ comment.user.lastName }}</span
                    >
                </p>
                <p class="comments-menu__comment-content">
                    {{ comment.content }}
                </p>
                <button
                    class="comments-menu__modify-button"
                    title="Modifier le commentaire"
                    id="modify-button"
                    v-if="comment.userId == userId || userRole == 'admin'"
                    v-on:click="modifyCommentSwitch(comment)"
                >
                    <font-awesome-icon icon="pen" /> Modifier
                </button>
                <button
                    class="comments-menu__delete-button"
                    title="Supprimer le commentaire"
                    v-if="comment.userId == userId || userRole == 'admin'"
                    v-on:click="deleteComment(comment.id)"
                >
                    <font-awesome-icon icon="trash" /> Supprimer
                </button>
                <!-- Modify a comment form -->
                <div
                    class="comments-menu__modify-comment-menu"
                    v-if="
                        (comment.userId == userId || userRole == 'admin') &&
                        commentModify == true
                    "
                >
                    <form action="comments-menu__modify-comment-form">
                        <label
                            for="content"
                            class="comments-menu__modify-comment-label"
                            >Modifier le commentaire</label
                        >
                        <input
                            type="text"
                            class="comments-menu__modify-comment-input"
                            :placeholder="comment.content"
                            v-model.lazy="commentContent"
                        />
                        <button
                            type="submit"
                            class="comments-menu__modify-comment-submit-button"
                            @click.prevent="modifyComment(comment)"
                        >
                            Valider
                        </button>
                    </form>
                    <div
                        v-show="submited"
                        class="comments-menu__modify-comment-form-error"
                    >
                        <p>{{ message }}</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import axios from "axios";
import VueJwtDecode from "vue-jwt-decode";
import CreateCommentMenu from "./CreateCommentMenu";

export default {
    name: "PostMenu",
    components: {
        CreateCommentMenu,
    },
    data() {
        return {
            postId: window.location.href.substr(-1),
            post: {
                id: 0,
                user: {},
            },
            comments: {},
            commentModify: false,
            commentContent: "",
            submited: false,
            message: "",
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
        getComments() {
            const userToken = sessionStorage.getItem("userToken");
            axios
                .get("http://localhost:3000/api/comments/" + this.postId, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${userToken}`,
                    },
                })
                .then((res) => {
                    this.comments = res.data;
                })
                .catch((error) => console.log({ error }));
        },
        modifyCommentSwitch(comment) {
            this.commentModify = !this.commentModify;
            if (this.commentModify) {
                this.commentContent = comment.content;
                document
                    .getElementById("modify-button")
                    .setAttribute("class", "comments-menu__delete-button");
            } else {
                document
                    .getElementById("modify-button")
                    .setAttribute("class", "comments-menu__modify-button");
            }
        },
        modifyComment(comment) {
            if (this.commentContent.length === 0) {
                this.submited = true;
                this.message = "Le commentaire ne peux pas être vide.";
            } else {
                const body = {
                    content: this.commentContent,
                };
                const header = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${this.userToken}`,
                    },
                };
                axios
                    .post(
                        "http://localhost:3000/api/comments/" + comment.id,
                        body,
                        header
                    )
                    .then(() => {
                        this.modifyCommentSwitch(comment);
                        this.getComments();
                    })
                    .catch((error) => console.log(error));
            }
        },
        deleteComment(id) {
            const header = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${this.userToken}`,
                },
            };
            axios
                .delete("http://localhost:3000/api/comments/" + id, header)
                .then(() => {
                    this.getComments();
                })
                .catch((error) => console.log(error));
        },
    },
    beforeMount() {
        this.getPost();
        this.getComments();
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
        font-size: 1.1rem;
    }

    &__image {
        max-width: 100%;
    }

    &__author {
        font-size: 0.95rem;
        color: silver;
    }

    &__fullname {
        font-style: italic;
        color: #fff;
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

.comments-menu {
    &__main {
        border-radius: 30px;
        box-shadow: 0px 0px 10px 5px rgba(184, 184, 184, 0.7);
        margin: 20px auto;
        background-color: #192946;
        max-width: 1000px;
        width: 90%;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    &__title {
        text-transform: uppercase;
    }

    &__comment {
        width: 90%;
        background-color: rgba(255, 255, 255, 0.2);
        border-radius: 10px;
        margin-bottom: 15px;
        padding: 10px;
    }

    &__comment-author {
        text-align: right;
        font-size: 0.85rem;
        color: silver;
    }

    &__comment-fullname {
        font-style: italic;
        color: #fff;
    }

    &__comment-content {
        text-align: left;
    }

    &__modify-button {
        background-color: #d1515a;
        color: #fff;
        border: none;
        border-radius: 15px;
        padding: 5px 10px;
        cursor: pointer;
        &:hover {
            opacity: 0.7;
        }
    }

    &__delete-button {
        background-color: gray;
        color: #fff;
        border: none;
        border-radius: 15px;
        padding: 5px 10px;
        cursor: pointer;
        &:hover {
            opacity: 0.7;
        }
    }

    &__modify-comment-menu {
        margin-top: 15px;
    }

    &__modify-comment-form {
        width: 90%;
        margin: 0 auto 30px auto;
    }

    &__modify-comment-label {
        font-size: 18px;
        font-weight: 200;
    }

    &__modify-comment-input {
        width: 80%;
        padding: 12px 20px;
        margin: 8px 0;
        box-sizing: border-box;
    }

    &__modify-comment-form-error {
        color: #d1515a;
    }

    &__modify-comment-submit-button {
        background-color: #d1515a;
        color: #ffffff;
        border: none;
        border-radius: 15px;
        padding: 15px 30px;
        cursor: pointer;
        &:hover {
            opacity: 0.7;
        }
    }
}
</style>