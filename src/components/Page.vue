<template>
  <div>
    <ul>
      <li>
        <b>role:</b> {{role}}
      </li>
      <li v-if="role_admin">
        <span><button v-on:click="set_teacher_info">set_teacher_info</button></span>
        <span><b>uid:</b> <input v-model="set_teacher_info_uid"></span>
        <span><b>subject:</b> <input v-model="set_teacher_info_subject"></span>
        <span><b>response:</b> {{set_teacher_info_response}}</span>
      </li>
      <li v-if="role_admin">
        <span><button v-on:click="get_teacher_class">get_teacher_class</button></span>
        <span><b>uid:</b> <input v-model="get_teacher_class_uid"></span>
        <span></span>
        <span><b>response:</b> {{get_teacher_class_response}}</span>
      </li>
      <li v-if="role_admin">
        <span><button v-on:click="get_teacher_subject">get_teacher_subject</button></span>
        <span><b>uid:</b> <input v-model="get_teacher_subject_uid"></span>
        <span></span>
        <span><b>response:</b> {{get_teacher_subject_response}}</span>
      </li>
      <li v-if="role_admin || role_teacher">
        <span><button v-on:click="get_student_info">get_student_info</button></span>
        <span><b>uid:</b> <input v-model="get_student_info_uid"></span>
        <span></span>
        <span><b>response:</b> {{get_student_info_response}}</span>
      </li>
      <li v-if="role_admin">
        <span><button v-on:click="get_user_info">get_user_info</button></span>
        <span><b>uid:</b> <input v-model="get_user_info_uid"></span>
        <span></span>
        <span><b>response:</b> {{get_user_info_response}}</span>
      </li>
      <li v-if="role_admin">
        <span><button v-on:click="set_student_info">set_student_info</button></span>
        <span><b>uid:</b> <input v-model="set_student_info_uid"></span>
        <span><b>classid:</b> <input v-model="set_student_info_classid"></span>
        <span><b>response:</b> {{set_student_info_response}}</span>
      </li>
      <li v-if="role_admin">
        <span><button v-on:click="add_teacher_class">add_teacher_class</button></span>
        <span><b>uid:</b> <input v-model="add_teacher_class_uid"></span>
        <span><b>classid:</b> <input v-model="add_teacher_class_classid"></span>
        <span><b>response:</b> {{add_teacher_class_response}}</span>
      </li>
      <li v-if="role_student">
        <span><button v-on:click="submit_paper">submit_paper</button></span>
        <span><b>content:</b> <input v-model="submit_paper_content"></span>
        <span><b>subject:</b> <input v-model="submit_paper_subject"></span>
        <span><b>response:</b> {{submit_paper_response}}</span>
      </li>
      <li v-if="role_teacher">
        <span><button v-on:click="grade_paper">grade_paper</button></span>
        <span><b>paper_id:</b> <input v-model="grade_paper_paper_id"></span>
        <span><b>score:</b> <input v-model="grade_paper_score"></span>
        <span><b>response:</b> {{grade_paper_response}}</span>
      </li>
      <li v-if="role_admin || role_student">
        <span><button v-on:click="get_paper_id_by_uid">get_paper_id_by_uid</button></span>
        <span><b>uid:</b> <input v-model="get_paper_id_by_uid_uid"></span>
        <span></span>
        <span><b>response:</b> {{get_paper_id_by_uid_response}}</span>
      </li>
      <li v-if="role_admin || role_teacher">
        <span><button v-on:click="get_paper">get_paper</button></span>
        <span><b>uid:</b> <input v-model="get_paper_uid"></span>
        <span></span>
        <span><b>response:</b> {{get_paper_response}}</span>
      </li>
      <li v-if="role_admin || role_teacher || role_student">
        <span><button v-on:click="get_all_paper_id">get_all_paper_id</button></span>
        <span></span>
        <span></span>
        <span><b>response:</b> {{get_all_paper_id_response}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: 'Page',
  data () {
    return{
      set_teacher_info_uid: null,
      set_teacher_info_subject: null,
      set_teacher_info_response: null,
      get_teacher_class_uid: null,
      get_teacher_class_response: null,
      get_teacher_subject_uid: null,
      get_teacher_subject_response: null,
      get_student_info_uid: null,
      get_student_info_response: null,
      get_user_info_uid: null,
      get_user_info_response: null,
      set_student_info_uid: null,
      set_student_info_classid: null,
      set_student_info_response: null,
      add_teacher_class_uid: null,
      add_teacher_class_classid: null,
      add_teacher_class_response: null,
      submit_paper_content: null,
      submit_paper_subject: null,
      submit_paper_response: null,
      grade_paper_paper_id: null,
      grade_paper_score: null,
      grade_paper_response: null,
      get_paper_id_by_uid_uid: null,
      get_paper_id_by_uid_response: null,
      get_paper_uid: null,
      get_paper_response: null,
      get_all_paper_id_response: null
    }
  },
  props:{
    loginsuccess: {
      type: Boolean,
      default: false
    },
    role: {
      type: String
    }
  },
  computed: {
    ifshow: function () {
      return this.loginsuccess==true;
    },
    role_admin: function() {
      return this.role=="admin";
    },
    role_teacher: function() {
      return this.role=="teacher";
    },
    role_student: function() {
      return this.role=="student";
    },
  },
  methods:{
    set_teacher_info: function () {
      if(this.set_teacher_info_uid==null || this.set_teacher_info_subject==null)
      {
        this.set_teacher_info_response = "Error: You should fill all blanks";
      }
      else
      {
        var form_get = new FormData();
        form_get.append("uid", this.set_teacher_info_uid);
        form_get.append("subject", this.set_teacher_info_subject);
        form_get.append("plainText", "1");
        var that = this;
        axios({
          method: 'post',
          baseURL: "",
          url: '/api/set_teacher_info.php',
          responseType: "json",
          headers: {
            "Content-Type": "multipart/form-data"
          },
          processData: false,
          contentType: false,
          data: form_get
        })
        .then(function (response) {
          console.log(response);
          that.set_teacher_info_response=JSON.stringify(response.data);
        })
        .catch(function (error) {
          console.log(error.response);
          that.set_teacher_info_response=JSON.stringify(error.response);
        });
      }
    },
    get_teacher_class: function () {
      if(this.get_teacher_class_uid==null)
      {
        this.get_teacher_class_response = "Error: You should fill all blanks";
      }
      else
      {
        var form_get = new FormData();
        form_get.append("uid", this.get_teacher_class_uid);
        form_get.append("plainText", "1");
        var that = this;
        axios({
          method: 'post',
          baseURL: "",
          url: '/api/get_teacher_class.php',
          responseType: "json",
          headers: {
            "Content-Type": "multipart/form-data"
          },
          processData: false,
          contentType: false,
          data: form_get
        })
        .then(function (response) {
          console.log(response);
          that.get_teacher_class_response=JSON.stringify(response.data);
        })
        .catch(function (error) {
          console.log(error.response);
          that.get_teacher_class_response=JSON.stringify(error.response);
        });
      }
    },
    get_teacher_subject: function () {
      if(this.get_teacher_subject_uid==null)
      {
        this.get_teacher_subject_response = "Error: You should fill all blanks";
      }
      else
      {
        var form_get = new FormData();
        form_get.append("uid", this.get_teacher_subject_uid);
        form_get.append("plainText", "1");
        var that = this;
        axios({
          method: 'post',
          baseURL: "",
          url: '/api/get_teacher_subject.php',
          responseType: "json",
          headers: {
            "Content-Type": "multipart/form-data"
          },
          processData: false,
          contentType: false,
          data: form_get
        })
        .then(function (response) {
          console.log(response);
          that.get_teacher_subject_response=JSON.stringify(response.data);
        })
        .catch(function (error) {
          console.log(error.response);
          that.get_teacher_subject_response=JSON.stringify(error.response);
        });
      }
    },
    get_student_info: function () {
      if(this.get_student_info_uid==null)
      {
        this.get_student_info_response = "Error: You should fill all blanks";
      }
      else
      {
        var form_get = new FormData();
        form_get.append("uid", this.get_student_info_uid);
        form_get.append("plainText", "1");
        var that = this;
        axios({
          method: 'post',
          baseURL: "",
          url: '/api/get_student_info.php',
          responseType: "json",
          headers: {
            "Content-Type": "multipart/form-data"
          },
          processData: false,
          contentType: false,
          data: form_get
        })
        .then(function (response) {
          console.log(response);
          that.get_student_info_response=JSON.stringify(response.data);
        })
        .catch(function (error) {
          console.log(error.response);
          that.get_student_info_response=JSON.stringify(error.response);
        });
      }
    },
    get_user_info: function () {
      if(this.get_user_info_uid==null)
      {
        this.get_user_info_response = "Error: You should fill all blanks";
      }
      else
      {
        var form_get = new FormData();
        form_get.append("uid", this.get_user_info_uid);
        form_get.append("plainText", "1");
        var that = this;
        axios({
          method: 'post',
          baseURL: "",
          url: '/api/get_user_info.php',
          responseType: "json",
          headers: {
            "Content-Type": "multipart/form-data"
          },
          processData: false,
          contentType: false,
          data: form_get
        })
        .then(function (response) {
          console.log(response);
          that.get_user_info_response=JSON.stringify(response.data);
        })
        .catch(function (error) {
          console.log(error.response);
          that.get_user_info_response=JSON.stringify(error.response);
        });
      }
    },
    set_student_info: function () {
      if(this.set_student_info_uid==null || this.set_student_info_classid==null)
      {
        this.set_student_info_response = "Error: You should fill all blanks";
      }
      else
      {
        var form_get = new FormData();
        form_get.append("uid", this.set_student_info_uid);
        form_get.append("classid", this.set_student_info_classid);
        form_get.append("plainText", "1");
        var that = this;
        axios({
          method: 'post',
          baseURL: "",
          url: '/api/set_student_info.php',
          responseType: "json",
          headers: {
            "Content-Type": "multipart/form-data"
          },
          processData: false,
          contentType: false,
          data: form_get
        })
        .then(function (response) {
          console.log(response);
          that.set_student_info_response=JSON.stringify(response.data);
        })
        .catch(function (error) {
          console.log(error.response);
          that.set_student_info_response=JSON.stringify(error.response);
        });
      }
    },
    add_teacher_class: function () {
      if(this.add_teacher_class_uid==null || this.add_teacher_class_classid==null)
      {
        this.add_teacher_class_response = "Error: You should fill all blanks";
      }
      else
      {
        var form_get = new FormData();
        form_get.append("uid", this.add_teacher_class_uid);
        form_get.append("classid", this.add_teacher_class_classid);
        form_get.append("plainText", "1");
        var that = this;
        axios({
          method: 'post',
          baseURL: "",
          url: '/api/add_teacher_class.php',
          responseType: "json",
          headers: {
            "Content-Type": "multipart/form-data"
          },
          processData: false,
          contentType: false,
          data: form_get
        })
        .then(function (response) {
          console.log(response);
          that.add_teacher_class_response=JSON.stringify(response.data);
        })
        .catch(function (error) {
          console.log(error.response);
          that.add_teacher_class_response=JSON.stringify(error.response);
        });
      }
    },
    submit_paper: function () {
      if(this.submit_paper_content==null || this.submit_paper_subject==null)
      {
        this.submit_paper_response = "Error: You should fill all blanks";
      }
      else
      {
        var form_get = new FormData();
        form_get.append("content", this.submit_paper_content);
        form_get.append("subject", this.submit_paper_subject);
        form_get.append("plainText", "1");
        var that = this;
        axios({
          method: 'post',
          baseURL: "",
          url: '/api/submit_paper.php',
          responseType: "json",
          headers: {
            "Content-Type": "multipart/form-data"
          },
          processData: false,
          contentType: false,
          data: form_get
        })
        .then(function (response) {
          console.log(response);
          that.submit_paper_response=JSON.stringify(response.data);
        })
        .catch(function (error) {
          console.log(error.response);
          that.submit_paper_response=JSON.stringify(error.response);
        });
      }
    },
    grade_paper: function () {
      if(this.grade_paper_paper_id==null || this.grade_paper_score==null)
      {
        this.grade_paper_response = "Error: You should fill all blanks";
      }
      else
      {
        var form_get = new FormData();
        form_get.append("paper_id", this.grade_paper_paper_id);
        form_get.append("score", this.grade_paper_score);
        form_get.append("plainText", "1");
        var that = this;
        axios({
          method: 'post',
          baseURL: "",
          url: '/api/grade_paper.php',
          responseType: "json",
          headers: {
            "Content-Type": "multipart/form-data"
          },
          processData: false,
          contentType: false,
          data: form_get
        })
        .then(function (response) {
          console.log(response);
          that.grade_paper_response=JSON.stringify(response.data);
        })
        .catch(function (error) {
          console.log(error.response);
          that.grade_paper_response=JSON.stringify(error.response);
        });
      }
    },
    get_paper_id_by_uid: function () {
      if(this.get_paper_id_by_uid_uid==null)
      {
        this.get_paper_id_by_uid_response = "Error: You should fill all blanks";
      }
      else
      {
        var form_get = new FormData();
        form_get.append("uid", this.get_paper_id_by_uid_uid);
        form_get.append("plainText", "1");
        var that = this;
        axios({
          method: 'post',
          baseURL: "",
          url: '/api/get_paper_id_by_uid.php',
          responseType: "json",
          headers: {
            "Content-Type": "multipart/form-data"
          },
          processData: false,
          contentType: false,
          data: form_get
        })
        .then(function (response) {
          console.log(response);
          that.get_paper_id_by_uid_response=JSON.stringify(response.data);
        })
        .catch(function (error) {
          console.log(error.response);
          that.get_paper_id_by_uid_response=JSON.stringify(error.response);
        });
      }
    },
    get_paper: function () {
      if(this.get_paper_uid==null)
      {
        this.get_paper_response = "Error: You should fill all blanks";
      }
      else
      {
        var form_get = new FormData();
        form_get.append("uid", this.get_paper_uid);
        form_get.append("plainText", "1");
        var that = this;
        axios({
          method: 'post',
          baseURL: "",
          url: '/api/get_paper.php',
          responseType: "json",
          headers: {
            "Content-Type": "multipart/form-data"
          },
          processData: false,
          contentType: false,
          data: form_get
        })
        .then(function (response) {
          console.log(response);
          that.get_paper_response=JSON.stringify(response.data);
        })
        .catch(function (error) {
          console.log(error.response);
          that.get_paper_response=JSON.stringify(error.response);
        });
      }
    },
    get_all_paper_id: function () {
      {
        var that = this;
        axios({
          method: 'get',
          baseURL: "",
          url: '/api/get_all_paper_id.php',
          responseType: "json",
          processData: false,
          contentType: false
        })
        .then(function (response) {
          console.log(response);
          that.get_all_paper_id_response=JSON.stringify(response.data);
        })
        .catch(function (error) {
          console.log(error.response);
          that.get_all_paper_id_response=JSON.stringify(error.response);
        });
      }
    }
  }
}
</script>


<style scoped>
div {
  float: center;
  text-align: left;;
  margin:25px 200px;
}
button {
  width: 150px;
}
ul {
  padding: 0;
}
li {
  height: 60px;
  margin: 15px 0px;
  width: 1300px;
}
button {
  margin: 2px 2px;
  height: 26px;
  width: 250px;
}
input {
  margin-right: 10px;
}
span {
  float: left;
  outline:#ffffff solid thin;
  height: 30px;
  width: 300px;
  margin: 5px 5px;
}
</style>