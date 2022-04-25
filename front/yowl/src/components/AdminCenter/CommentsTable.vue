<template>
	<tr>
		<td>{{ id }}</td>
		<td contenteditable="true" :id="'user_id->'+id">{{ user_id }}</td>
		<td contenteditable="true" :id="'post_id->'+id">{{ post_id }}</td>
		<td contenteditable="true" :id="'content->'+id">{{ content }}</td>
		<td>{{ likes }}</td>
		<td>{{ dislikes }}</td>
		<td><button @click="updComment(id)">Update</button></td>
		<td><button @click="delComment(id)">Delete</button></td>
	</tr>
</template>

<script>
export default {
	name: 'CommentsTable',
	props: {
		id: {
			type: Number,
		},
		user_id : {
			type: Number,
		},
		post_id : {
			type: Number,
		},
		content : {
			type: String,
		},
		likes : {
			type: Number,
		},
		dislikes : {
			type: Number,
		},
	},
	methods: {
		delComment(id) {
			this.$store.dispatch("deleteComment", id)
		},
		updComment(id) {
			const user_id = document.getElementById('user_id->'+id).innerText;
			const post_id = document.getElementById('post_id->'+id).innerText;
			const content = document.getElementById('content->'+id).innerText;
			this.$store.dispatch("updateComment", {id, user_id, post_id, content});
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