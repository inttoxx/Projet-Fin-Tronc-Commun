<template>
  <div>
    <header class="header">
      <nav class="navbar navbar-light bg-light">
        <div class="container-fluid">
          <router-link :to="{name: 'HomePage'}" ><img id="LogoGrand" srcset="@/assets/LogoYowl.png" class="img-responsive" height="175"/></router-link>
          <AddPost/>
          <div class="profile">
            <p>WELCOME {{currentUser.data.username}}</p>
            <p><router-link :to="{name: 'EspacePerso'}">My Profile</router-link></p>
            <p><button @click="logout">LOGOUT</button></p>
          </div>
        </div>
      </nav>
    </header>
    <div class="grid">
      <div class="col1">
        <div class="AdminButtons">
          <AdminButtons
            v-if="isAdmin"
          />
        </div>
      </div>
      <div class="col2">
        <AllPosts
          v-for="post in posts"
          :key="post.id"
          :id="post.id"
          :title="post.title"
          :url="post.url"
          :likes="post.likes"
          :dislikes="post.dislikes"
          :user_id="post.user_id"
        />
      </div>
      <div class="col3">
      </div>
    </div>
  </div>
</template>

<script>
import AdminButtons from "@/components/AdminCenter/AdminButtons";
import AddPost from "@/components/HomePage/AddPost.vue";
import AllPosts from "@/components/HomePage/AllPosts.vue";
import { mapState } from "vuex";

export default {
  components: {
    AddPost,
    AllPosts,
    AdminButtons,
  },
  created() {
    this.$store.dispatch("fetchUsers");
    this.$store.dispatch("fetchPosts");
    this.$store.dispatch("fetchComments");
    this.$store.dispatch("SetCurrentUser");
  },
  computed: {
    ...mapState(["posts", 'currentUser']),
    isAdmin(){
      return this.currentUser.data.admin == 1;
    }
  },
  methods: {
    logout(){
      localStorage.clear();
      console.log(localStorage.getItem('user'))
      this.$router.push({name : 'LandingPage'})
    }
  },
};
</script>


<style scoped>;

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
  margin-top: 3%;
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
  float: right;
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

/* element addpost */

/* definition 3 colonnes  */

.grid {
  display: grid;
  justify-content: center;
  grid-gap:20px;
  grid-template-columns: 20% 50% 20%;
  grid-template-rows:76vh;
}

/* 1ere colonne  */
.AdminButtons{
  justify-content: center;
  padding: 8px;
  margin-top:20%;
}

/* 2eme colonne */
.col2 {
  overflow: auto;
}
</style>
