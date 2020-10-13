<template>
    <div class="home">
        <div class="header">
            <Navbar />
        </div>
        <div class="contentBar">
            <PostMenu />
        </div>
    </div>
</template>

<script>
import Navbar from "../components/Navbar";
import PostMenu from "../components/PostMenu";

export default {
    name: "Post",
    components: {
        Navbar,
        PostMenu,
    },
};
</script>

<style lang="scss">
</style>