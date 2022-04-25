<template>
    <div class="CommentPost">
        <div class="contentPost">
            <p>{{ content }}</p>
        </div>
        <div>
            <p><button @click="like(id)">👍</button> : {{ likes }}</p>
            <p><button @click="dislike(id)">👎</button> : {{ dislikes }}</p>
        </div>
    </div>
</template>

<script>
export default {
  props: {
    id: {
      type: Number,
    },
    content: {
      type: String,
    },
    user_id: {
      type: Number,
    },

    post_id: {
      type: Number,
    },

    likes: {
      type: Number,
    },

    dislikes: {
      type: Number,
    },
  },
  methods: {
    like(comm_id){
      this.likes + 1;
      let curentLikes = this.likes;
      let likes = curentLikes + 1;
      this.$store.dispatch('likeComment', {comm_id, likes})

    },
    dislike(comm_id){
      this.dislikes + 1;
      let currentDislikes = this.dislikes;
      let dislikes = currentDislikes + 1;
      this.$store.dispatch('dislikeComment', {comm_id, dislikes})
    }
  }
};
</script>

<style>

.contentPost{
  display:flex;
}

.CommentPost{
  display:flex;
  flex-wrap: wrap;
  border: 1px solid #ffcc57;
}


</style>