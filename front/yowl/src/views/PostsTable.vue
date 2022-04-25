<template>
<div>
		<GlobalHeader />
	<div class="postsTable">
		<AdminButtons />
		<table class="table table-borderless table-sm table-responsive">
			<thead>
				<tr>
					<th>ID</th>
					<th>Title</th>
					<th>URL</th>
					<th>Likes</th>
					<th>Dislikes</th>
					<th>User ID</th>
					<th>Update</th>
					<th>Delete</th>
				</tr>
			</thead>
			<tbody>
				<PostsTable
					v-for="post in posts"
					:key="post.id"
					:id="post.id"
					:title="post.title"
					:url="post.url"
					:likes="post.likes"
					:dislikes="post.dislikes"
					:user_id="post.user_id"
				/>
			</tbody>
		</table>
		<td><button @click="addPost(id)">NEW POST</button></td>
	</div>
</div>
</template>


<script>
import GlobalHeader from "@/components/GlobalHeader.vue";
import AdminButtons from '@/components/AdminCenter/AdminButtons.vue';
import PostsTable from '@/components/AdminCenter/PostsTable.vue';
import { mapState } from 'vuex';
import { mapGetters } from 'vuex';

export default {
	name: 'AdminCenter',
	components: {
		GlobalHeader,
		AdminButtons,
		PostsTable,
	},
	created() {
		this.$store.dispatch("fetchPosts");
		this.$store.dispatch("fetchComments");
		this.$store.dispatch("SetCurrentUser");
	},
	computed: {
		...mapState(['posts']),
		...mapGetters(['getCurrentUserId']),
		id(){
			return this.getCurrentUserId
		}
	},
	methods: {
		addPost(user_id) {
			this.$store.dispatch("newPost", {
				"title": "title",
				"url": "url",
				"user_id": user_id
			})
		}
	}
}

</script>

<style scoped>
button {
	background-color: #3b3b3b;
	color: #ffcc57;
	border-color: #ffcc57;
	border-radius: 25px;
}

.postsTable {
	font-family: Questrial, Helvetica, Arial, sans-serif;
    font-size: 1.2rem;
	display: flex;
	flex-direction: row;
}

table {
	border: 3px solid #ffcc57;
	background-color: #3b3b3b;
	margin-top: 5px;
}

th {
	background-color: #3b3b3b;
	color: #ffcc57;
	vertical-align: middle;
	cursor: pointer;
	align-content: left;
	-webkit-user-select: none;
	-moz-user-select: none;
	-ms-user-select: none;
	user-select: none;
}

tr {
	border-bottom: 1px solid #ffcc57;
}
td {
	background-color: #3b3b3b;
	color: #ffcc57;
}

th,
td {
	min-width: 100px;
	padding: 10px 20px;
}

th.active .arrow {
	opacity: 1;
}

.arrow {
	display: inline-block;
	vertical-align: middle;
	width: 0;
	height: 0;
	margin-left: 5px;
	opacity: 1;
}

.arrow.asc {
	border-left: 4px solid transparent;
	border-right: 4px solid transparent;
	border-bottom: 4px solid #ffcc57;
}

.arrow.dsc {
	border-left: 4px solid transparent;
	border-right: 4px solid transparent;
	border-top: 4px solid #ffcc57;
}

</style>