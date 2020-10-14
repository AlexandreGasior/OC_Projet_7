<template>
    <section class="signup-form-menu">
        <div class="signup-form-menu__main">
            <form method="POST" class="signup-form-menu__form">
                <h1 class="signup-form-menu__title">Inscription</h1>

                <div class="signup-form-menu__form-box">
                    <label for="firstName" class="signup-form-menu__form-label"
                        >Prénom</label
                    >
                    <input
                        type="text"
                        name="firstName"
                        class="signup-form-menu__form-input"
                        placeholder="Prénom"
                        v-model.lazy="$v.firstName.$model"
                    />
                    <span
                        class="signup-form-menu__form-error"
                        v-if="!$v.firstName.required && submited"
                        >Ce champ doit être complêté.</span
                    >
                    <span
                        class="signup-form-menu__form-error"
                        v-if="!$v.firstName.alpha"
                        >Ce champ ne peut contenir que des lettres.</span
                    >
                    <span
                        class="signup-form-menu__form-error"
                        v-if="!$v.firstName.minLength"
                        >Le prénom doit contenir au moins
                        {{ $v.firstName.$params.minLength.min }} lettres.</span
                    >
                </div>

                <div class="signup-form-menu__form-box">
                    <label for="lastName" class="form__form-label">Nom</label>
                    <input
                        type="text"
                        name="lastName"
                        class="signup-form-menu__form-input"
                        placeholder="Nom"
                        v-model.lazy="$v.lastName.$model"
                    />
                    <span
                        class="signup-form-menu__form-error"
                        v-if="!$v.lastName.required && submited"
                        >Ce champ doit être complêté</span
                    >
                    <span
                        class="signup-form-menu__form-error"
                        v-if="!$v.lastName.alpha"
                        >Ce champ ne peut contenir que des lettres.</span
                    >
                    <span
                        class="signup-form-menu__form-error"
                        v-if="!$v.lastName.minLength"
                        >Le Nom doit contenir au moins
                        {{ $v.lastName.$params.minLength.min }} lettres.</span
                    >
                </div>

                <div class="signup-form-menu__form-box">
                    <label for="email" class="signup-form-menu__form-label"
                        >E-mail</label
                    >
                    <input
                        type="text"
                        name="email"
                        class="signup-form-menu__form-input"
                        placeholder="E-mail"
                        v-model.lazy="$v.email.$model"
                    />
                    <span
                        class="signup-form-menu__form-error"
                        v-if="!$v.email.required && submited"
                        >Ce champ doit être complêté</span
                    >
                    <span
                        class="signup-form-menu__form-error"
                        v-if="!$v.email.email"
                        >L'adresse email doit être au format
                        email@groupomania.fr</span
                    >
                    <span
                        class="signup-form-menu__form-error"
                        v-if="emailAlreadyTaken"
                        >Cette adresse email est déjà prise</span
                    >
                </div>

                <div class="signup-form-menu__form-box">
                    <label for="password" class="signup-form-menu__form-label"
                        >Mot de passe</label
                    >
                    <input
                        type="password"
                        name="password"
                        id="password"
                        class="signup-form-menu__form-input"
                        placeholder="Mot de passe"
                        v-model.lazy="$v.password.$model"
                    />
                    <span
                        class="signup-form-menu__form-error"
                        v-if="!$v.password.required && submited"
                        >Ce champ doit être complêté</span
                    >
                    <span
                        class="signup-form-menu__form-error"
                        v-if="!$v.password.minLength"
                        >Le mot de passe doit contenir au moins
                        {{ $v.password.$params.minLength.min }}
                        caractères.</span
                    >
                </div>

                <button
                    class="signup-form-menu__form-submit-button"
                    type="submit"
                    @click.prevent="submitForm"
                >
                    S'inscrire
                </button>
            </form>

            <p class="signup-form-menu__login-paragraph">
                Vous avez déjà un compte ?
            </p>
            <router-link class="signup-form-menu__router-link" to="/login">
                <button class="signup-form-menu__login-button">
                    Se connecter
                </button>
            </router-link>
        </div>
    </section>
</template>

<script>
import axios from "axios";
import { required, minLength, alpha, email } from "vuelidate/lib/validators";
export default {
    name: "Signup",
    data() {
        return {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            submited: false,
            emailAlreadyTaken: false,
        };
    },
    validations: {
        firstName: {
            required,
            alpha,
            minLength: minLength(2),
        },
        lastName: {
            required,
            alpha,
            minLength: minLength(2),
        },
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
                // send a request post to backend if form is correct
                axios
                    .post(
                        "http://localhost:3000/api/signup",
                        {
                            firstName: this.firstName,
                            lastName: this.lastName,
                            email: this.email,
                            password: this.password,
                        },
                        {
                            headers: { "Content-type": "application/json" },
                        }
                    )
                    .then(() => {
                        // then login the user created
                        axios
                            .post(
                                "http://localhost:3000/api/login",
                                {
                                    email: this.email,
                                    password: this.password,
                                },
                                {
                                    headers: {
                                        "Content-type": "application/json",
                                    },
                                }
                            )
                            .then((res) => {
                                // and create a sessionStorage to save userId and userToken
                                sessionStorage.setItem(
                                    "userToken",
                                    res.data.userToken
                                );
                                sessionStorage.setItem(
                                    "userId",
                                    parseInt(res.data.userId)
                                );
                                window.location.href = "/";
                            })
                            .catch((error) => {
                                console.log({ error });
                            });
                    })
                    .catch((error) => {
                        // in case email has already been taken change emailAlreadyTaken to true to indicate it to the user
                        this.emailAlreadyTaken = true;
                        console.log({ error });
                    });
            }
        },
    },
};
</script>

<style lang="scss">
.signup-form-menu {
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

    &__login-paragraph {
        font-style: italic;
    }

    &__login-button {
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