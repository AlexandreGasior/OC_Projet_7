<template>
    <div id="app">
        <router-view />
        <footer id="footer">©Groupomania 2020</footer>
    </div>
</template>

<style lang="scss">
body {
    margin: 0 auto;
}

#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #fff;
    margin-bottom: 50px;

    a {
        text-decoration: none;
        color: #fff;
        &:hover {
            text-decoration: underline;
            text-decoration-color: #d1515a;
            opacity: 0.7;
        }
    }
}

#footer {
    position: fixed;
    width: 100%;
    bottom: 0;
    left: 0;
    background-color: #192946;
    padding: 5px 0;
}
</style>
