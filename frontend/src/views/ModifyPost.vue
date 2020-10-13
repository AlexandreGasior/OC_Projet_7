<template>
    <div class="home">
        <div class="header">
            <Navbar />
        </div>
        <div class="contentBar">
            <ModifyPostMenu />
        </div>
    </div>
</template>

<script>
import Navbar from "../components/Navbar";
import ModifyPostMenu from "../components/ModifyPostMenu";

export default {
    name: "ModifyPost",
    components: {
        Navbar,
        ModifyPostMenu,
    },
};
</script>

<style lang="scss">
</style>