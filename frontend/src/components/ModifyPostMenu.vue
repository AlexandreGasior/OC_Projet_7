<template>
    <div class="modify-post-menu">
        <form method="POST" class="modify-post__form">
            <div class="modify-post__formbox">
                <label for="title" class="modify-post__label"
                    >Changez le titre</label
                >
                <input
                    type="text"
                    id="title"
                    class="modify-post__input"
                    placeholder="Contenu"
                    v-model.lazy="post.content"
                />
            </div>
            <div class="modify-post__formbox">
                <label for="image" class="modify-post__label"
                    >Modifier l'image</label
                >
                <input
                    type="file"
                    id="image"
                    class="modify__input"
                    @change="onFileSelected"
                />
            </div>
            <button
                type="submit"
                class="modale__submit"
                @click.prevent="modifyPost"
            >
                Valider
            </button>
        </form>
        <div v-show="submited" class="">
            <p>{{ message }}</p>
        </div>
    </div>
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
</style>