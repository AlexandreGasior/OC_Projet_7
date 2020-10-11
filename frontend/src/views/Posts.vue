<template>
    <div class="posts">
        <Navbar/>
        <PostsMenu/>
    </div>
</template>

<script>
import Navbar from '../components/Navbar'
import PostsMenu from '../components/PostsMenu'

export default {
    name: 'Posts',
    components:{
        Navbar,
        PostsMenu,
    }
}
</script>

<style lang="scss">
</style>