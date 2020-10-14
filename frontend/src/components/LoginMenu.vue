<template>
    <section class="login-form-menu">
        <div class="login-form-menu__main">
            <form method="POST" class="login-form-menu__form">
                <h1 class="login-form-menu__title">Connexion</h1>

                <span
                    class="login-form-menu__form-error"
                    v-if="requestError && submited"
                    >Votre E-mail ou votre mot de passe est incorrect</span
                >
                <div class="login-form-menu__form-box">
                    <label for="email" class="login-form-menu__form-label"
                        >E-mail</label
                    >
                    <input
                        type="text"
                        name="email"
                        id="email"
                        class="login-form-menu__form-input"
                        placeholder="E-mail"
                        v-model.lazy="$v.email.$model"
                    />
                    <span
                        class="login-form-menu__form-error"
                        v-if="!$v.email.required && submited"
                        >Ce champ doit être complêté</span
                    >
                    <span
                        class="login-form-menu__form-error"
                        v-if="!$v.email.email"
                        >L'adresse email doit être au format
                        email@groupomania.fr</span
                    >
                </div>

                <div class="login-form-menu__form-box">
                    <label for="password" class="login-form-menu__form-label"
                        >Mot de passe</label
                    >
                    <input
                        type="password"
                        name="password"
                        id="password"
                        class="login-form-menu__form-input"
                        placeholder="Mot de passe"
                        v-model.lazy="$v.password.$model"
                    />
                    <span
                        class="login-form-menu__form-error"
                        v-if="!$v.password.required && submited"
                        >Ce champ doit être complêté</span
                    >
                    <span
                        class="login-form-menu__form-error"
                        v-if="!$v.password.minLength"
                        >Le mot de passe doit contenir au moins
                        {{ $v.password.$params.minLength.min }}
                        caractères.</span
                    >
                </div>

                <button
                    class="login-form-menu__form-submit-button"
                    type="submit"
                    @click.prevent="submitForm"
                >
                    Se connecter
                </button>
            </form>

            <p class="login-form-menu__signup-paragraph">
                Vous n'avez pas encore de compte ?
            </p>
            <router-link class="login-form-menu__router-link" to="/signup">
                <button class="login-form-menu__signup-button">
                    S'incrire
                </button>
            </router-link>
        </div>
    </section>
</template>

<script>
import axios from "axios";
import { required, minLength, email } from "vuelidate/lib/validators";

export default {
    name: "Login",
    data() {
        return {
            email: "",
            password: "",
            submited: false,
            requestError: false,
        };
    },
    validations: {
        email: {
            required,
            email,
        },
        password: {
            required,
            minLength: minLength(6),
        },
    },
    methods: {
        submitForm() {
            this.submited = true; // submited equals true once form has been submited to show errors for missing fields
            if (!this.$v.$invalid) {
                // send a request to backend if form is correct to login the user
                axios
                    .post(
                        "http://localhost:3000/api/login",
                        {
                            email: this.email,
                            password: this.password,
                        },
                        {
                            headers: { "Content-type": "application/json" },
                        }
                    )
                    .then((res) => {
                        // and create a sessionStorage to save userId and userToken
                        sessionStorage.setItem("userToken", res.data.userToken);
                        sessionStorage.setItem(
                            "userId",
                            parseInt(res.data.userId)
                        );
                        window.location.href = "/";
                    })
                    .catch((error) => {
                        this.requestError = true;
                        console.log({ error });
                    });
            }
        },
    },
};
</script>

<style lang="scss">
.login-form-menu {
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

    &__signup-paragraph {
        font-style: italic;
    }

    &__signup-button {
        background-color: #fff;
        color: #192946;
        border: none;
        border-radius: 15px;
        padding: 10px 30px;
        margin-bottom: 15px;
        cursor: pointer;
        &:hover {
            background-color: #d1515a;
        }
    }
}
</style>