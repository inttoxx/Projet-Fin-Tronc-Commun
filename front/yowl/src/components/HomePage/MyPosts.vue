<template>
	<div class="AllPosts">
		<div>
			<h1 contenteditable="true" :id="'title->'+id">{{ title }}</h1>
			<p contenteditable="true" :id="'url->'+id">{{ url }}</p>
			<div>
				<p>👍 : {{ likes }}</p>
                <p>👎 : {{ dislikes }}</p>
			</div>
		<button @click="update(id)">Update</button>
		<button @click="del(id)">Delete</button>
		</div>
	</div>
</template>



<script>
import { mapGetters} from "vuex";


export default {
	components: {
	},
	props: {
		id: {
			type: Number
		},
		title: {
			type: String
		},
		url: {
			type: String
		},
		likes: {
			type: Number
		},
		dislikes: {
			type: Number
		},
		user_id: {
			type: Number
		},
	},
	computed: {
		...mapGetters([
			'getCommentByPost'
		]),
		comments () {
			return this.getCommentByPost(this.id);
		},
	},
	methods: {
		del(id){
			this.$store.dispatch("deletePost", id)
		},
		update(id) {
			const title = document.getElementById('title->'+id).innerText;
			const url = document.getElementById('url->'+id).innerText;
			this.$store.dispatch("updatePost", {id, title, url});

		},
	}
};
</script>




<style>
.AllPosts {
	font-family: Questrial, Helvetica, Arial, sans-serif;
	font-size: 20px;
	color: #ffcc57;
	background-color: #3b3b3b;
	border: 8px solid #ffcc57;
	border-radius: 25px;
	padding: 10px;
	margin: 5px;
	display: flex;
	width: auto;
	justify-content: stretch;
}

.AllPosts button {
    background-color: #3b3b3b;
    color: #ffcc57;
    border-color: #ffcc57;
    border-radius: 25px;
}

</style>