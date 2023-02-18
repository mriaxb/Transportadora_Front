<template>
  <div id="app" class="pageOne">
    
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/frete">Frete</router-link>
    </nav>
    
    <router-view/>
  </div>
</template>

<style lang="scss">

@import "~bulma/bulma.sass";

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  position: relative;
  width: 100%;
  height: 100vh;
}
.pageOne{
  background: #ebe5e5;
}
nav {
  padding: 30px;
  background-color: #303030;
  position: absolute;
  width: 100%;
  height: 10%;
  a {
    font-weight: bold;
    color: white;
    padding:1%;
    padding-top: 4%;

    &.router-link-exact-active {
      color: #00c4a7;;
      background: rgba(108, 108, 108, 0.76);
      transition: 0.4s;
    }
  }
  a:hover{
    background: rgba(108, 108, 108, 0.76);
    transition: 0.4s;
  }
}

</style>
