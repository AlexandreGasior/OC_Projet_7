<template>
    <div class="create-post">
        <form method="POST" class="create-post__form">
            <div class="create-post__form-box">
                <label for="title" class="create-post__form-label"
                    >Titre de votre post</label
                >
                <input
                    type="text"
                    name="title"
                    id="title"
                    value=""
                    v-model.lazy="content"
                    class="create-post__form-input"
                    placeholder="Le titre de votre post"
                />
            </div>

            <div class="create-post__form-box">
                <label
                    for="file"
                    title="Choisir une image"
                    role="button"
                    class="create-post__form-label create-post__form-label"
                    ><font-awesome-icon icon="images"
                /></label>
                <input
                    type="file"
                    name="image"
                    id="file"
                    @change="onFileSelected"
                    hidden
                />
                <button
                    type="submit"
                    title="Valider"
                    class="create-post__form-submit"
                    @click.prevent="createPost"
                >
                    <font-awesome-icon icon="paper-plane" />
                </button>
            </div>
        </form>
        <span v-if="selectedFile"
            >Image sélectionnée : {{ selectedFile.name }}
        </span>
        <span class="create-post__error" v-if="!$v.content.required && submited"
            >Veuillez ajouter un titre
        </span>
        <span
            class="create-post__error"
            v-if="
                !$v.selectedFile.required && $v.selectedFile.$dirty && submited
            "
            >Veuillez ajouter une image
        </span>
    </div>
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
</style>