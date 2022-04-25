<template>
	<div>
		<GlobalHeader />
	<div class="usersTable">
		<AdminButtons />
		<table class="table table-borderless table-sm table-responsive">
			<thead>
				<tr>
					<th>ID</th>
					<th>Firstname</th>
					<th>Lastname</th>
					<th>Username</th>
					<th>Birthdate</th>
					<th>Email</th>
					<th>Admin</th>
					<th>Update</th>
					<th>Delete</th>
				</tr>
			</thead>
			<tbody>
				<UsersTable
					v-for="user in users"
					:key="user.id"
					:id="user.id"
					:firstname="user.firstname"
					:lastname="user.lastname"
					:username="user.username"
					:birthdate="user.birthdate"
					:email="user.email"
					:admin="user.admin"
				/>
			</tbody>
		</table>
		<td><button @click="addUser()">NEW USER</button></td>
	</div>
</div>

</template>


<script>
import GlobalHeader from "@/components/GlobalHeader.vue";
import AdminButtons from '@/components/AdminCenter/AdminButtons.vue';
import UsersTable from '@/components/AdminCenter/UsersTable.vue';
import { mapState } from 'vuex';

export default {
	name: 'AdminCenter',
	components: {
		GlobalHeader,
		AdminButtons,
		UsersTable
	},
	created() {
		this.$store.dispatch("fetchUsers"),
		this.$store.dispatch("fetchPosts"),
		this.$store.dispatch("fetchComments")
	},
	computed: {
		...mapState(['users'])
	},
	methods: {
		async addUser() {
			await this.$store.dispatch("newUser", {
				"firstname": "firstname",
				"lastname": "lastname",
				"birthday": 12345,
				"email": "email",
				"username": "username",
				"password": "password"
			});
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

.usersTable {
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

th, td {
	min-width: 100px;
	padding: 10px 20px;
	overflow: hidden;
	text-overflow: ellipsis;
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