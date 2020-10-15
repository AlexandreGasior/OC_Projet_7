<template>
    <div class="create-comment-menu__main">
        <h2 class="create-comment-menu__title">Ajouter un commentaire</h2>
        <form method="POST" class="create-comment-menu__form">
            <div class="create-comment-menu__formbox">
                <label
                    for="create-comment"
                    class="create-comment-menu__form-label"
                    >Commentaire :</label
                >
                <input
                    type="text"
                    name="create-comment"
                    class="create-comment-menu__form-input"
                    v-model.lazy="content"
                    placeholder="Ecrire un commentaire"
                />
                <span
                    class="create-comment-menu__form-error"
                    v-if="!$v.content.required && submited"
                    >Veuillez écrire un commentaire avant de valider</span
                >
            </div>
            <button
                class="create-comment-menu__form-submit-button"
                title="Valider"
                type="submit"
                @click.prevent="submit"
            >
                Envoyer
            </button>
        </form>
    </div>
</template>

<script>
import axios from "axios";
import { required } from "vuelidate/lib/validators";

export default {
    name: "CreateCommentMenu",
    data() {
        return {
            postId: window.location.href.substr(-1),
            userToken: sessionStorage.getItem("userToken"),
            userId: parseInt(sessionStorage.getItem("userId")),
            content: "",
            submited: false,
        };
    },
    validations: {
        content: {
            required,
        },
    },
    methods: {
        submit() {
            this.submited = true;
            if (!this.$v.$invalid) {
                const body = {
                    userId: this.userId,
                    content: this.content,
                };
                const header = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${this.userToken}`,
                    },
                };
                axios
                    .post(
                        "http://localhost:3000/api/comments/create/" +
                            this.postId,
                        body,
                        header
                    )
                    .then(() => {
                        window.location.href = "/post/" + this.postId;
                    })
                    .catch((error) => console.log({ error }));
            }
        },
    },
};
</script>

<style lang="scss" >
.create-comment-menu {
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

    &__form {
        width: 90%;
        margin: 0 auto 30px auto;
    }

    &__form-label {
        font-size: 18px;
        font-weight: 200;
    }

    &__form-input {
        width: 80%;
        padding: 12px 20px;
        margin: 8px 0;
        box-sizing: border-box;
    }

    &__form-error {
        color: #d1515a;
    }

    &__form-submit-button {
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