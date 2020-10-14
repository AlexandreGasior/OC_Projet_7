<template>
    <section class="profil-menu">
        <div class="profil-menu__main">
            <div class="profil-menu__box" v-bind="user in user" :key="user.id">
                <h1 class="profil-menu__title">Vos informations de compte:</h1>
                <p class="profil-menu__firstname">
                    <strong>Prénom :</strong> {{ user.firstName }}
                </p>
                <p class="profil-menu__lastname">
                    <strong>Nom :</strong> {{ user.lastName }}
                </p>
                <p class="profil-menu__email">
                    <strong>E-mail :</strong> {{ user.email }}
                </p>

                <p class="profil-menu__delete-paragraph">
                    Souhaitez-vous supprimer votre compte ?
                </p>
                <button
                    @click.prevent="deleteUser"
                    class="profil-menu__delete-button"
                >
                    Supprimer mon compte
                </button>
            </div>
        </div>
    </section>
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
.profil-menu {
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

    &__delete-paragraph {
        margin-top: 45px;
        font-style: italic;
        font-size: 0.9rem;
    }

    &__delete-button {
        background-color: #192946;
        color: #fff;
        border: none;
        border-radius: 15px;
        padding: 5px 10px;
        margin-bottom: 15px;
        cursor: pointer;
        &:hover {
            background-color: #d1515a;
        }
    }
}
</style>