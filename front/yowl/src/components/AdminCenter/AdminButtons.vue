<template>
	<div class="adminButtons">
		<button><router-link :to="{ name: 'UsersTable' }" class="usersTable">USERS' TABLE</router-link></button>
		<button><router-link :to="{ name: 'PostsTable' }" class="postsTable" >POSTS' TABLE</router-link></button>
		<button><router-link :to="{ name: 'CommentsTable' }" class="commentsTable">COMMENTS' TABLE</router-link></button>
	</div>
</template>


<script>

export default {
	name: 'AdminButtons',
	methods: {

	}
};

</script>


<style scoped>

.adminButtons {
	display: inline-grid;
	align-items: center;
	width: max-content;
}

button {
	font-family: Questrial, Helvetica, Arial, sans-serif;
	font-size: 20px;
	color: #ffcc57;
	background-color: #3b3b3b;
	border: 2px solid #ffcc57;
	border-radius: 25px;
	padding: 10px;
	margin: 5px;
}

a, a:hover {
	color: #ffcc57;
	text-decoration: none;
}
</style>