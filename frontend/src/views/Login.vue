<template>
    <div class="login">
        <Navbar/>
        <LoginMenu/>
    </div>
</template>

<script>
import Navbar from '../components/Navbar'
import LoginMenu from '../components/LoginMenu'

export default {
    name: 'Login',
    components:{
        Navbar,
        LoginMenu
    }
}
</script>

<style lang="scss">
</style>