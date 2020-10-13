<template>
    <div class="profil-menu__box" v-bind="user in user" :key="user.id">
        <h1 class="profil-menu__title">Vos informations de compte:</h1>
        <p class="profil-menu__firstname">
            <strong>Prénom :</strong> {{ user.firstName }}
        </p>
        <p class="profil-menu__lastname">
            <strong>Nom :</strong> {{ user.lastName }}
        </p>
        <p class="profil-menu__email">
            <strong>Votre e-mail :</strong> {{ user.email }}
        </p>

        <button @click.prevent="deleteUser" class="profil-menu__delete-button">
            Supprimer mon compte
        </button>
    </div>
</template>

<script>
import axios from "axios";

export default {
    name: "Profil",
    data() {
        return {
            userId: sessionStorage.getItem("userId"),
            userToken: sessionStorage.getItem("userToken"),
            user: {},
        };
    },
    methods: {
        getUser() {
            axios
                .get("http://localhost:3000/api/users/" + this.userId, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${this.userToken}`,
                    },
                })
                .then((res) => {
                    this.user = res.data;
                })
                .catch((error) => console.log({ error }));
        },
        deleteUser() {
            axios
                .delete("http://localhost:3000/api/users/" + this.userId, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${this.userToken}`,
                    },
                })
                .then(() => {
                    sessionStorage.clear();
                    this.$router.push("/Login");
                });
        },
    },
    beforeMount() {
        this.getUser();
    },
};
</script>

<style lang="scss">
</style>