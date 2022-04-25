<template>
  <div class="tweet-box">
    <input type="text" id="title" placeholder="Title of your post">
    <input type="text" id="url" placeholder="Url of your post">
    <button @click="newPost(id)">POST</button>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';

export default {
  computed: {
    ...mapGetters(['getCurrentUserId']),
    id(){
      return this.getCurrentUserId
    }
  },
  methods: {
    newPost(user_id) {
      let title = document.getElementById('title').value;
      let url = document.getElementById('url').value;
      this.$store.dispatch("newPost",{title, url, user_id});
    }
  }
};
</script>

<style scoped>
.tweet-box{
  font-family: Questrial, Helvetica, Arial, sans-serif;
	font-size: 20px;
	color: #ffcc57;
	background-color: #3b3b3b;
	border: 5px solid #ffcc57;
	border-radius: 25px;
	padding: 10px;
  display: flex;
  flex-direction: row;
 }

input {
  width: 400px;
  height: 50px;
}
button {
	background-color: #3b3b3b;
	color: #ffcc57;
	border-color: #ffcc57;
	border-radius: 25px;
}

</style>