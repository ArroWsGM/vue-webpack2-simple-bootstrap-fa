<template>
    <div id="app">
        <img src="./assets/img/logo.svg">
        <h1>{{ msg }}</h1>
        <h2>Essential Links</h2>
        <ul>
            <li><a href="https://vuejs.org" target="_blank"><span class="glyphicon glyphicon-glass"></span> Core Docs</a></li>
            <li><a href="https://forum.vuejs.org" target="_blank">Forum</a></li>
            <li><a href="https://gitter.im/vuejs/vue" target="_blank">Gitter Chat</a></li>
            <li><a href="https://twitter.com/vuejs" target="_blank"><i class="fa fa-twitter" aria-hidden="true"></i> Twitter</a></li>
        </ul>
        <h2>Ecosystem</h2>
        <ul>
            <li><a class="btn btn-primary" href="http://router.vuejs.org/" target="_blank">vue-router</a></li>
            <li><a class="btn btn-primary" href="http://vuex.vuejs.org/" target="_blank">vuex</a></li>
            <li><a class="btn btn-primary" href="http://vue-loader.vuejs.org/" target="_blank">vue-loader</a></li>
            <li><a class="btn btn-primary" href="https://github.com/vuejs/awesome-vue" target="_blank">awesome-vue</a></li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'app',
    data () {
        return {
            msg: 'Welcome to Your Vue.js App Test'
        }
    }
}
</script>

<style lang="scss">
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}

h1, h2 {
    font-weight: normal;
}

ul {
    list-style-type: none;
    padding: 0;
}

li {
    display: inline-block;
    margin: 0 10px;
}

a {
    color: #42b983;
}
</style>
