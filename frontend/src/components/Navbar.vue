<template>
  <nav id="nav">
    <div>
      <router-link to="/">
        <img
          class="nav__logo"
          src="../assets/icon-left-font-monochrome-white.svg"
          alt="logo groupomania"
        />
      </router-link>
    </div>
    <div>
      <router-link class="nav__link" to="/signup">Inscription</router-link>
      <router-link class="nav__link" to="/login">Connection</router-link>
      <router-link class="nav__link" to="/user/:id"><font-awesome-icon icon="user" /> Mon profil</router-link>
      <router-link class="nav__link" to="/">Déconnexion</router-link>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Navbar",
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

a {
    font-weight: bold;
    color: #fff;
  }

.nav__logo {
    max-height: 30px;
  }

.nav__link {
    padding: 0 0 0 10px;
  }
}
</style>
