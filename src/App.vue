<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logox.png">-->
    <!-- <HelloWorld msg="教务管理系统"/>-->
    <Login @ifloginsuccess="loginsuccess" @loginrole="loginrole"/>
    <Page v-bind:role="str_loginrole" v-if="ifshow" />
  </div>
</template>

<script>
//import HelloWorld from './components/HelloWorld.vue'
import Login from './components/Login.vue'
import Page from './components/Page.vue'

export default {
  name: 'App',
  data () {
    return {
      pageloginsuccess: {
        type: Boolean
      },
      str_loginrole: {
        type: String
      }
    }
  },
  components: {
    //HelloWorld,
    Login,
    Page
  },
  methods:{
    loginsuccess(data){
       this.pageloginsuccess = data;
    },
    loginrole(data){
       this.str_loginrole = data;
    }
  },
  computed: {
    ifshow: function () {
      return this.pageloginsuccess==true;
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
