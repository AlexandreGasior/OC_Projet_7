<template>
    <section class="modify-post-menu">
        <div class="modify-post-menu__main">
            <h1 class="modify-post-menu__title">Modifier le post</h1>
            <form method="POST" class="modify-post-menu__form">
                <div class="modify-post-menu__formbox">
                    <label for="title" class="modify-post-menu__form-label"
                        >Titre
                    </label>
                    <input
                        type="text"
                        class="modify-post-menu__form-input"
                        placeholder="Contenu"
                        v-model.lazy="post.content"
                    />
                </div>
                <div class="modify-post-menu__formbox">
                    <label for="image" class="modify-post-menu__form-label"
                        >Modifier l'image</label
                    >
                    <input
                        type="file"
                        id="image"
                        class="modify-post-menu__form-input"
                        @change="onFileSelected"
                    />
                </div>
                <button
                    type="submit"
                    class="modify-post-menu__form-submit-button"
                    @click.prevent="modifyPost"
                >
                    Valider
                </button>
            </form>
            <div v-show="submited" class="modify-post-menu__form-error">
                <p>{{ message }}</p>
            </div>
        </div>
    </section>
</template>

<script>
import axios from "axios";

export default {
    name: "ModifyPostMenu",
    data() {
        return {
            userId: sessionStorage.getItem("userId"),
            userToken: sessionStorage.getItem("userToken"),
            postId: window.location.href.substr(-1),
            post: {},
            content: "",
            selectedFile: null,
            submited: false,
            message: "",
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
        onFileSelected(event) {
            this.selectedFile = event.target.files[0];
        },
        modifyPost() {
            if (this.post.content.length === 0) {
                this.submited = true;
                this.message = "Veuillez renseigner un titre !";
            } else {
                let fd = new FormData();
                fd.append("userId", this.userId);
                fd.append("content", this.post.content);
                if (this.selectedFile != null) {
                    fd.append(
                        "image",
                        this.selectedFile,
                        this.selectedFile.name
                    );
                }
                axios
                    .post(
                        "http://localhost:3000/api/posts/" + this.post.id,
                        fd,
                        {
                            headers: {
                                "Content-type": "multipart/form-data",
                                Authorization: `Bearer ${this.userToken}`,
                            },
                        }
                    )
                    .then(() => {
                        window.location.href = "/post/" + this.post.id;
                    })
                    .catch((error) => console.log(error));
            }
        },
    },
    beforeMount() {
        this.getPost();
    },
};
</script>

<style lang="scss" >
.modify-post-menu {
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