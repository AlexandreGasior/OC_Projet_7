<template>
    <div class="login">
        <Navbar />
        <ProfilMenu />
    </div>
</template>

<script>
import Navbar from "../components/Navbar";
import ProfilMenu from "../components/ProfilMenu";

export default {
    name: "Profil",
    components: {
        Navbar,
        ProfilMenu,
    },
};
</script>

<style lang="scss">
</style>