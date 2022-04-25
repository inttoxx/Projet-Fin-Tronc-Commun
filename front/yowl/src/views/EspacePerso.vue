<template>
<div>
	<GlobalHeader />
    <div class="espacePerso">
        <div class="myInfos">
            <h1>My Infos</h1>
            <p>First Name :</p>
            <p contenteditable="true" id="firstname">{{currentUser.data.firstname}}</p>
            <p>Last Name :</p>
            <p contenteditable="true" id="lastname">{{currentUser.data.lastname}}</p>
            <p>User Name :</p>
            <p contenteditable="true" id="username">{{currentUser.data.username}}</p>
            <p>Email :</p>
            <p contenteditable="true" id="email">{{currentUser.data.email}}</p>
            <p>Birthday :</p>
            <p contenteditable="true" id="birthdate">{{currentUser.data.birthdate}}</p>
            <button @click="update(currentUser.data.id)">Update</button>
        </div>
        <MyPosts
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
</div>
</template>

<script>
import GlobalHeader from "@/components/GlobalHeader.vue";
import { mapState } from 'vuex';
import { mapGetters } from 'vuex';
import MyPosts from "@/components/HomePage/MyPosts.vue";


export default {
    components:{
        MyPosts,
        GlobalHeader
    },
    created(){
        this.$store.dispatch("fetchPosts");
		this.$store.dispatch("SetCurrentUser");
        this.$store.dispatch("fetchComments");
		this.$store.dispatch("SetCurrentUser");
    },
    computed:{
        ...mapGetters(['getPostByUser', 'getCurrentUserId']),
        ...mapState(["currentUser"]),
        id(){
			return this.getCurrentUserId
		},
        posts(){
            return this.getPostByUser(this.id)
        }
    },
    methods: {
        update(id){
            const firstname = document.getElementById('firstname').innerText;
			const lastname = document.getElementById('lastname').innerText;
			const username = document.getElementById('username').innerText;
			const birthdate = document.getElementById('birthdate').innerText;
			const email = document.getElementById('email').innerText;
			const admin = this.currentUser.data.admin;
			this.$store.dispatch("updateUser", {id, firstname, lastname, username, birthdate, email, admin});
        }
    },
}
</script>

<style scoped>
*{
    color:#ffcc57;
}

.espacePerso {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
}
.myInfos {
    font-family: Questrial, Helvetica, Arial, sans-serif;
	font-size: 20px;
	border: 8px solid #ffcc57;
	border-radius: 25px;
	padding: 10px;
	margin: 5px;
}
button {
    background-color: #3b3b3b;
    color: #ffcc57;
    border-color: #ffcc57;
    border-radius: 25px;
}

</style>