<template>
  <div>
    <h1>教务管理系统</h1>
    <ul>
      <li>
        <b>Username:</b> <input v-model="username">
      </li>
      <li>
        <b>Password:</b> <input type="password" v-model="password">
      </li>
      <li>
        <b>Role:</b> <select v-model="role">
          <option value="admin">教务</option>
          <option value="teacher">教师</option>
          <option value="student">学生</option>
        </select>
      </li>
      <li>  
        <button v-on:click="login">Login</button>
        <button v-on:click="register">Register</button>
      </li>
      <li>  
        <p>{{ message }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: 'Login',
  data () {
    return {
      username: null,
      password: null,
      role: null,
      message: null
    }
  },
  methods:{
    login: function () {
      if(this.username==null || this.password==null || this.role==null)
      {
        this.message = "You should fill all blanks";
      }
      else
      {
        var random_key = Math.floor(Math.random()*100000);
        var json_login = {
          username: this.username,
          password: this.password,
          key: random_key
        }
        var str_login = JSON.stringify(json_login);
        this.message = str_login;
        var form_login = new FormData();
        form_login.append("plainText", "1");
        form_login.append("username", this.username);
        form_login.append("password", this.password);
        form_login.append("key", random_key);
        var that = this;
        axios({
          method: 'post',
          baseURL: "",//http://39.105.188.162
          url: '/api/login.php',
          responseType: "json",
          headers: {
            "Content-Type": "multipart/form-data"//"application/json"
          },
          processData: false,
          contentType: false,
          data: form_login//str_login
        })
        .then(function (response) {
          console.log(response);
          that.message=JSON.stringify(response.data);
        })
        .catch(function (error) {
          console.log(error.response);
          that.message=JSON.stringify(error.response);
        });
      }
    },

    register: function () {
      if(this.username==null || this.password==null || this.role==null)
      {
        this.message = "You should fill all blanks";
      }
      else
      {
        var json_register = {
          username: this.username,
          password: this.password,
          role: this.role
        }
        var str_register = JSON.stringify(json_register);
        this.message = str_register;
        var form_register = new FormData();
        form_register.append("username", this.username);
        form_register.append("password", this.password);
        form_register.append("role", this.role);
        form_register.append("plainText", "1");
        var that = this;
        axios({
          method: 'post',
          baseURL: "",//http://39.105.188.162
          url: '/api/register.php',
          responseType: "json",
          headers: {
            "Content-Type": "multipart/form-data"//"application/json"
          },
          processData: false,
          contentType: false,
          data: form_register//json_register
        })
        .then(function (response) {
          console.log(response);
          that.message=JSON.stringify(response.data);
        })
        .catch(function (error) {
          console.log(error);
          that.message=JSON.stringify(error.response);
        });
      }
    }
  },
  watch: {
    message() {
      if(this.message=="{\"code\":0,\"msg\":\"login success\"}")
      {
        this.$emit("ifloginsuccess", true);
        this.$emit("loginrole",this.role)
      }
      else
      {
        this.$emit("ifloginsuccess", false);
      }
    }
  }
}
</script>

<style scoped>
ul {
  padding: 0;
}
li {
  margin: 15px 0px;
}
button {
  margin: 0px 15px;
}
</style>