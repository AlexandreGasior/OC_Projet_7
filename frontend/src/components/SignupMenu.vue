<template>
    <div class="form">
        <form method="POST" class="form__form">
            <img src="../assets/icon-left-font-monochrome-black.svg" alt="Groupomania logo" class="form__logo">
            <h1 class="form__title">Inscription</h1>

            <div class="form__box">
                <label for="firstName" class="form__label">Prénom</label>
                <input type="text" name="firstName" id="firstName" class="form__input" placeholder="Prénom" v-model.lazy="$v.firstName.$model">
                <span class="form__error" v-if="!$v.firstName.required && submited">Ce champ doit être complêté.</span>
                <span class="form__error" v-if="!$v.firstName.alpha">Ce champ ne peut contenir que des lettres.</span>
                <span class="form__error" v-if="!$v.firstName.minLength">Le prénom doit contenir au moins {{ $v.firstName.$params.minLength.min }} lettres.</span>
            </div>

            <div class="form__box">
                <label for="lastName" class="form__label">Nom</label>
                <input type="text" name="lastName" id="lastName" class="form__input" placeholder="Nom" v-model.lazy="$v.lastName.$model">
                <span class="form__error" v-if="!$v.lastName.required && submited">Ce champ doit être complêté</span>
                <span class="form__error" v-if="!$v.lastName.alpha">Ce champ ne peut contenir que des lettres.</span>
                <span class="form__error" v-if="!$v.lastName.minLength">Le Nom doit contenir au moins {{ $v.lastName.$params.minLength.min }} lettres.</span>
            </div>

            <div class="form__box">
                <label for="email" class="form__label">E-mail</label>
                <input type="text" name="email" id="email" class="form__input" placeholder="E-mail" v-model.lazy="$v.email.$model">
                <span class="form__error" v-if="!$v.email.required && submited">Ce champ doit être complêté</span>
                <span class="form__error" v-if="!$v.email.email">L'adresse email doit être au format email@groupomania.fr</span>
                <span class="form__error" v-if="emailAlreadyTaken">Cette adresse email est déjà prise</span>
            </div>

            <div class="form__box">
                <label for="password" class="form__label">Mot de passe</label>
                <input type="password" name="password" id="password"  class="form__input" placeholder="Mot de passe" v-model.lazy="$v.password.$model">
                <span class="form__error" v-if="!$v.password.required && submited">Ce champ doit être complêté</span>
                <span class="form__error" v-if="!$v.password.minLength">Le mot de passe doit contenir au moins {{ $v.password.$params.minLength.min }} caractères.</span>
            </div>
                                
            <button class="form__button" type="submit" @click.prevent="submitForm">S'inscrire</button>
            
        </form>
    </div>
</template>

<script>
import axios from 'axios'
import { required, minLength, alpha, email} from 'vuelidate/lib/validators'
export default {
    name: 'Signup',
    data() {
        return{
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            submited: false,
            emailAlreadyTaken: false
        }
    },
    validations: {
        firstName: {
            required,
            alpha,
            minLength: minLength(2)
        },
        lastName: {
            required,
            alpha,
            minLength: minLength(2)
        },
        email: {
            required,
            email
        },
        password: {
            required,
            minLength: minLength(6),
        }
    },
    methods: {
        submitForm() {
            this.submited = true;   // submited equals true once form has been submited to show errors for missing fields
            if(!this.$v.$invalid) { // send a request post to backend if form is correct
                axios.post('http://localhost:3000/api/signup',{
                    firstName: this.firstName,
                    lastName: this.lastName,
                    email: this.email,
                    password: this.password
                },
                {
                    headers:{ 'Content-type': 'application/json'}
                })
                .then(() => {       // then login the user created
                    axios.post('http://localhost:3000/api/login',{
                    email: this.email,
                    password: this.password
                    },
                    {
                        headers:{ 'Content-type': 'application/json'}
                    })
                    .then(res => {  // and create a sessionStorage to save userId and userToken
                        sessionStorage.setItem('userToken', res.data.token);
                        sessionStorage.setItem('userId', parseInt(res.data.userId));
                        window.location.href="/";
                    })
                    .catch(error => {
                        console.log({error})
                    });
                })
                .catch(error => {   // in case email has already been taken change emailAlreadyTaken to true to indicate it to the user
                    this.emailAlreadyTaken = true;
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