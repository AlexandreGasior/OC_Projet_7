<template>
    <section class="create-post-menu">
        <div class="create-post-menu__main">
            <h1 class="create-post-menu__title">Créer un post</h1>
            <form method="POST" class="create-post-menu__form">
                <div class="create-post-menu__form-box">
                    <label for="title" class="create-post-menu__form-label"
                        >Titre du post
                    </label>
                    <input
                        type="text"
                        name="title"
                        id="title"
                        value=""
                        v-model.lazy="content"
                        class="create-post-menu__form-input"
                        placeholder="Titre"
                    />
                </div>

                <div class="create-post-menu__form-box">
                    <label
                        for="file"
                        title="Choisir une image"
                        role="button"
                        class="create-post-menu__form-label"
                        >Image
                    </label>
                    <input
                        type="file"
                        name="image"
                        class="create-post-menu__form-input"
                        @change="onFileSelected"
                    />
                </div>

                <p
                    class="create-post-menu__error"
                    v-if="!$v.content.required && submited"
                >
                    Veuillez ajouter un titre
                </p>
                <p
                    class="create-post-menu__error"
                    v-if="
                        !$v.selectedFile.required &&
                        $v.selectedFile.$dirty &&
                        submited
                    "
                >
                    Veuillez ajouter une image
                </p>
            </form>
            <button
                type="submit"
                title="Valider"
                class="create-post-menu__form-submit-button"
                @click.prevent="createPost"
            >
                <font-awesome-icon icon="paper-plane" />
            </button>
        </div>
    </section>
</template>

<script>
import axios from "axios";
import { required } from "vuelidate/lib/validators";

export default {
    name: "CreatePostMenu",
    data() {
        return {
            content: "",
            selectedFile: null,
            submited: false,
        };
    },
    validations: {
        content: {
            required,
        },
        selectedFile: {
            required,
        },
    },
    methods: {
        onFileSelected(event) {
            this.selectedFile = event.target.files[0];
        },
        createPost() {
            this.submited = true;
            if (!this.$v.$invalid) {
                const userId = parseInt(sessionStorage.getItem("userId"));
                const userToken = sessionStorage.getItem("userToken");
                let fd = new FormData();
                fd.append("userId", userId);
                fd.append("content", this.content);
                fd.append("image", this.selectedFile, this.selectedFile.name);
                axios
                    .post("http://localhost:3000/api/posts/create", fd, {
                        headers: {
                            "Content-Type": "multipart/form-data",
                            Authorization: `Bearer ${userToken}`,
                        },
                    })
                    .then(() => {
                        window.location.href = "/";
                    })
                    .catch((error) => console.log(error));
            }
        },
    },
};
</script>

<style lang="scss">
.create-post-menu {
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

    &__form {
        width: 90%;
        margin: 0 auto 30px auto;
        text-align: left;
    }

    &__form-label {
        font-size: 18px;
        font-weight: 200;
    }

    &__form-input {
        width: 100%;
        padding: 12px 20px;
        margin: 8px 0;
        box-sizing: border-box;
    }

    &__error {
        color: #d1515a;
    }

    &__form-submit-button {
        background-color: #d1515a;
        color: #ffffff;
        border: none;
        border-radius: 15px;
        padding: 15px 30px;
        margin-bottom: 15px;
        cursor: pointer;
        &:hover {
            opacity: 0.7;
        }
    }
}
</style>