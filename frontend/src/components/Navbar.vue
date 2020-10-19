<template>
    <nav id="nav">
        <div>
            <router-link to="/">
                <img
                    class="nav__logo"
                    src="../assets/icon-left-font-no-background.png"
                    alt="logo groupomania"
                />
            </router-link>
        </div>
        <div>
            <router-link
                class="nav__link"
                v-if="$store.state.authenticated == false"
                to="/signup"
                >Inscription</router-link
            >
            <router-link
                class="nav__link"
                v-if="$store.state.authenticated == false"
                to="/login"
                >Connexion</router-link
            >
            <router-link
                class="nav__link"
                v-if="$store.state.authenticated == true"
                to="/profil"
                ><span class="nav__icon"
                    ><font-awesome-icon icon="user"
                /></span>
                Profil</router-link
            >
            <span
                class="nav__link"
                v-if="$store.state.authenticated == true"
                @click="logout"
                >Déconnexion</span
            >
        </div>
    </nav>
</template>

<script>
export default {
    name: "Navbar",
    methods: {
        logout() {
            sessionStorage.clear();
            this.$store.commit("setAuthentication", false);
            this.$router.push("/Login");
        },
    },
};
</script>

<style lang="scss">
#nav {
    background-color: #192946;
    padding: 30px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #d1515a;
    max-width: 100%;

    a {
        font-weight: bold;
        color: #fff;
    }

    .nav__logo {
        max-height: 30px;
        @media (max-width: 500px) {
            max-height: 20px;
        }
    }

    .nav__link {
        padding: 0 0 0 10px;
        text-decoration: none;
        color: #fff;
        cursor: pointer;
        font-weight: bold;
        &:hover {
            text-decoration: underline;
            text-decoration-color: #d1515a;
            opacity: 0.7;
        }
        @media (max-width: 350px) {
            font-size: 0.9rem;
        }
    }

    .nav__icon {
        @media (max-width: 350px) {
            display: none;
        }
    }
}
</style>
