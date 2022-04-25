<template>
	<tr>
		<td>{{ id }}</td>
		<td contenteditable="true" :id="'firstname->'+id">{{ firstname }}</td>
		<td contenteditable="true" :id="'lastname->'+id">{{ lastname }}</td>
		<td contenteditable="true" :id="'username->'+id">{{ username }}</td>
		<td contenteditable="true" :id="'birthdate->'+id">{{ birthdate }}</td>
		<td contenteditable="true" :id="'email->'+id">{{ email }}</td>
		<td contenteditable="true" :id="'admin->'+id">{{ admin }}</td>
		<td><button @click="updUser(id)">Update</button></td>
		<td><button @click="delUser(id)">Delete</button></td>
	</tr>
</template>

<script>
export default {
	name: 'UsersTable',
	props: {
		id: {
			type: Number,
		},
		firstname : {
			type: String,
		},
		lastname : {
			type: String,
		},
		username : {
			type: String,
		},
		birthdate : {
			type: String,
		},
		email : {
			type: String,
		},
		admin : {
			type: Number,
		},
	},
	methods: {
		delUser(id) {
			this.$store.dispatch("deleteUser", id)
		},
		updUser(id) {
			const firstname = document.getElementById('firstname->'+id).innerText;
			const lastname = document.getElementById('lastname->'+id).innerText;
			const username = document.getElementById('username->'+id).innerText;
			const birthdate = document.getElementById('birthdate->'+id).innerText;
			const email = document.getElementById('email->'+id).innerText;
			const admin = document.getElementById('admin->'+id).innerText;
			this.$store.dispatch("updateUser", {id, firstname, lastname, username, birthdate, email, admin});
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

th {
  background-color: #3b3b3b;
  color: #ffcc57;
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
	color: #ffcc57;
	vertical-align:middle;
}

th, td {
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