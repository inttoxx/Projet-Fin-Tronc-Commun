<template>
  <header class="header">
    <nav class="navbar navbar-light bg-light">
      <div class="container-fluid">
        <router-link :to="{name: 'HomePage'}" ><img id="LogoGrand" srcset="@/assets/LogoYowl.png" class="img-responsive" height="175"/></router-link>
        <div class="profile">
          <p>WELCOME {{currentUser.data.username}}</p>
          <p><router-link :to="{name: 'EspacePerso'}">My Profile</router-link></p>
          <p><button @click="logout">LOGOUT</button></p>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: 'GlobalHeader',
  created() {
    this.$store.dispatch("SetCurrentUser");
  },
  computed: {
    ...mapState({
      currentUser: state => state.currentUser
    }),
    isAdmin() {
      return this.currentUser.data.admin == 1;
    }
  },
  methods: {
    logout() {
      localStorage.clear();
      console.log(localStorage.getItem('user'))
      this.$router.push({name: 'LandingPage'});
    },
  },
};
</script>

<style>
/* header */
.header{
  font-family: Questrial, Helvetica, Arial, sans-serif;
	font-size: 20px;
	color: #ffcc57;
	background-color: #3b3b3b;
	border: 2px solid #ffcc57;
	border-radius: 25px;
	padding: 10px;
	margin: none;
  margin-top:3%;
}

.navbar {
  padding: 0;
}

.container-fluid {
  display: inline-flex;
  background-color: #3b3b3b;
}

.navbar>.container-fluid {
  justify-content: space-around;
}

.profile{
  float:right;
  font-family: Questrial, Helvetica, Arial, sans-serif;
	font-size: 20px;
	background-color: #3b3b3b;
  color: #ffcc57;
	border: 5px solid #ffcc57;
	border-radius: 25px;
	padding: 10px;
}

p {
  text-align: center;
  text-decoration: none;
}

a, a:hover {
  text-decoration: none;
  color: #ffcc57;
}

button {
	background-color: #3b3b3b;
	color: #ffcc57;
	border-color: #ffcc57;
	border-radius: 25px;
}

</style>