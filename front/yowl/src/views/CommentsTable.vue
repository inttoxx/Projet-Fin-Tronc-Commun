<template>
<div>
		<GlobalHeader />
    <div class="commentsTable">
        <AdminButtons />
        <table class="table table-borderless table-sm table-responsive">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>User ID</th>
                    <th>Post ID</th>
                    <th>Content</th>
                    <th>Likes</th>
                    <th>Dislikes</th>
                    <th>Update</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                <CommentsTable
                    v-for="comment in comments"
                    :key="comment.id"
                    :id="comment.id"
                    :user_id="comment.user_id"
                    :post_id="comment.post_id"
                    :content="comment.content"
                    :likes="comment.likes"
                    :dislikes="comment.dislikes"
                />
            </tbody>
        </table>
        <td><select id="post_id">
            <option
                v-for="post in posts"
                :key="post.id"
                :value="post.id">
                    {{post.id}}
            </option>
            </select></td>
        <td><button @click="addComment(id)">NEW COMMENT</button></td>
    </div>
</div>
</template>


<script>
import GlobalHeader from "@/components/GlobalHeader.vue";
import AdminButtons from "@/components/AdminCenter/AdminButtons.vue";
import CommentsTable from "@/components/AdminCenter/CommentsTable.vue";
import { mapState } from "vuex";
import { mapGetters } from "vuex";

export default {
    name: "AdminCenter",
    components: {
		GlobalHeader,
        AdminButtons,
        CommentsTable,
    },
    created() {
        this.$store.dispatch("fetchPosts");
		this.$store.dispatch("SetCurrentUser");
        this.$store.dispatch("fetchComments");
    },
    computed: {
        ...mapState(["comments", "posts"]),
        ...mapGetters(['getCurrentUserId']),
		id(){
			return this.getCurrentUserId
		}
    },
    methods: {
        addComment(user_id) {
            let post_id = document.getElementById('post_id').value;
            console.log(post_id)
            this.$store.dispatch("newComment", {
                user_id: user_id,
                post_id: post_id,
                content: "content",
            });
        },
    },
};
</script>

<style scoped>
button {
    background-color: #3b3b3b;
    color: #ffcc57;
    border-color: #ffcc57;
    border-radius: 25px;
}

.commentsTable {
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