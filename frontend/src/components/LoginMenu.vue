<template>
    <div class="form">
        <form method="POST" class="form__form">
            <img src="../assets/icon-left-font-monochrome-black.svg" alt="Groupomania logo" class="form__logo">
            <h1 class="form__title">Connection</h1>

            <div class="form__box">
                <span class="form__error form__error--high" v-if="requestError && submited">Votre E-mail ou votre mot de passe est incorrect</span>
                <label for="email" class="form__label">E-mail</label>
                <input type="text" name="email" id="email" class="form__input" placeholder="E-mail" v-model.lazy="$v.email.$model">
                <span class="form__error" v-if="!$v.email.required && submited">Ce champ doit être complêté</span>
                <span class="form__error" v-if="!$v.email.email">L'adresse email doit être au format email@groupomania.fr</span>
            </div>

            <div class="form__box">
                <label for="password" class="form__label">Mot de passe</label>
                <input type="password" name="password" id="password"  class="form__input" placeholder="Mot de passe" v-model.lazy="$v.password.$model">
                <span class="form__error" v-if="!$v.password.required && submited">Ce champ doit être complêté</span>
                <span class="form__error" v-if="!$v.password.minLength">Le mot de passe doit contenir au moins {{ $v.password.$params.minLength.min }} caractères.</span>
            </div>
                                
            <button class="form__button" type="submit" @click.prevent="submitForm">Se connecter</button>
        </form>

        <p>Vous n'avez pas encore de compte ?</p>
        <router-link class="form__router-link" to="/signup">
            <button class="form__signup-button">S'incrire</button>
        </router-link>
    </div>
</template>

<script>
import axios from 'axios'
import { required, minLength, email} from 'vuelidate/lib/validators'

export default {
    name: 'Login',
    data() {
        return{
            email: '',
            password: '',
            submited: false,
            requestError: false
        }
    },
    validations: {
        email: {
            required,
            email
        },
        password: {
            required,
            minLength: minLength(6)
        }
    },
    methods: {
        submitForm() {
            this.submited = true;   // submited equals true once form has been submited to show errors for missing fields
            if(!this.$v.$invalid) { // send a request to backend if form is correct to login the user
                axios.post('http://localhost:3000/api/login',{
                email: this.email,
                password: this.password
                },
                {
                    headers:{ 'Content-type': 'application/json'}
                })
                .then(res => {  // and create a sessionStorage to save userId and userToken
                    sessionStorage.setItem('userToken', res.data.userToken);
                    sessionStorage.setItem('userId', parseInt(res.data.userId));
                    window.location.href="/";
                })
                .catch(error => {
                    this.requestError = true;
                    console.log({error})
                });
            }
        }
    }
}
</script>

<style lang="scss">
.form__logo {
    max-height: 250px;
}

.form__error {
  color: red;
  font-size: 12px;
  text-transform: uppercase;
}
</style>