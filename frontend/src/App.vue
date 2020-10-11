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
  color: #2c3e50;

  a{
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
}

#footer {
  position: fixed;
  width: 100%;
  bottom: 0;
  left: 0;
  background-color: #192946;
  color: #fff;
  padding: 5px 0;
}
</style>
