<template>
    <div class="signup">
        <Navbar />
        <SignupMenu />
    </div>
</template>

<script>
import Navbar from "../components/Navbar";
import SignupMenu from "../components/SignupMenu";

export default {
    name: "Signup",
    components: {
        Navbar,
        SignupMenu,
    },
};
</script>

<style lang="scss">
</style>