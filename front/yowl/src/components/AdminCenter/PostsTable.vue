<template>
	<tr>
		<td>{{ id }}</td>
		<td contenteditable="true" :id="'title->'+id">{{ title }}</td>
		<td contenteditable="true" :id="'url->'+id">{{ url }}</td>
		<td>{{ likes }}</td>
		<td>{{ dislikes }}</td>
		<td contenteditable="true" :id="'user_id->'+id">{{ user_id }}</td>
		<td><button @click="updPost(id)">Update</button></td>
		<td><button @click="delPost(id)">Delete</button></td>
	</tr>
</template>

<script>
export default {
	name: 'PostsTable',
	props: {
		id: {
			type: Number,
		},
		title : {
			type: String,
		},
		url : {
			type: String,
		},
		likes : {
			type: Number,
		},
		dislikes : {
			type: Number,
		},
		user_id : {
			type: Number,
		},
	},
	methods: {
		delPost(id, post_id) {
			this.$store.dispatch("deleteComment", post_id)
			this.$store.dispatch("deletePost", id)
		},
		updPost(id) {
			const title = document.getElementById('title->'+id).innerText;
			const url = document.getElementById('url->'+id).innerText;
			const user_id = document.getElementById('user_id->'+id).innerText;
			this.$store.dispatch("updatePost", {id, title, url, user_id});
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
	border: 1px solid #ffcc57;
}

td {
	color: #ffcc57;
	vertical-align: middle;
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