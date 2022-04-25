<template>
    <div class="AllPosts">
        <div>
            <div>
                <a>{{ title }}</a>
                <br>
                <a>{{ url }}</a>
                <div>
                    <p><button @click="like(id)">👍</button> : {{ likes }}</p>
                    <p><button @click="dislike(id)">👎</button> : {{ dislikes }}</p>
                </div>
            </div>
            <div class="CommentPost"><CommentPost
                v-for="comment in comments"
                :key="comment.id"
                :content="comment.content"
                :likes="comment.likes"
                :dislikes="comment.dislikes"
                :user_id="comment.user_id"
                :post_id="comment.post_id"
                :id="comment.id"
            />
        </div>
            <div>
                <textarea :id="'content->'+id" cols="55" rows="3" placeholder="your comment"></textarea>
                <button @click="newComment(id, userId)">Post</button>
            </div>
        </div>
  </div>
</template>



<script>
import CommentPost from "/src/components/HomePage/CommentPost.vue";
import { mapGetters } from "vuex";


export default {
    components: {
        CommentPost
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
            'getCommentByPost',
            'getCurrentUserId'
        ]),
        comments () {
            return this.getCommentByPost(this.id);
        },
        userId(){
            return this.getCurrentUserId
        }
    },
    methods: {
        newComment(post_id, user_id){
            let content = document.getElementById('content->'+ post_id).value;
            this.$store.dispatch("newComment", {content , user_id, post_id})
        },
        like(post_id){
            this.likes + 1;
            let curentLikes = this.likes;
            let likes = curentLikes + 1;
            this.$store.dispatch('likePost', {post_id, likes})
        },
        dislike(post_id){
            this.dislikes + 1;
            let currentDislikes = this.dislikes;
            let dislikes = currentDislikes + 1;
            this.$store.dispatch('dislikePost', {post_id, dislikes})
        }
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
display:flex ;
width: auto;
justify-content: stretch;
}
</style>