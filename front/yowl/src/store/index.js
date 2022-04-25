import { createStore } from 'vuex';

export default createStore({
    state: {
        isAuthenticated: (state) => !!state.user,
        currentUser: {
            isAdmin: null,
            token: null
        },
        users: [],
        posts: [],
        comments: [],
    },
    mutations: {
        setUsers(state, users) {
            state.users = users;
        },
        setPosts(state, posts) {
            state.posts = posts;
        },
        setComments(state, comments) {
            state.comments = comments;
        },
        setCurrentUsers(state, user) {
            state.currentUser = user;
        },
    },
    actions: {
        async fetchUsers({ commit }) {
            const queryUsers = await fetch(
                "http://localhost:8000/api/users"
            );
            const users = await queryUsers.json();
            commit("setUsers", users);
        },
        async fetchPosts({ commit }) {
			const queryPosts = await fetch(
				"http://localhost:8000/api/posts"
			);
			const posts = await queryPosts.json();
			commit("setPosts", posts);
        },
        async fetchComments({ commit }) {
			const queryComents = await fetch(
				"http://localhost:8000/api/comments"
			);
			const comments = await queryComents.json();
			commit("setComments", comments);
		},

        async login({state},{email, password}){
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

			var raw = JSON.stringify({
				email: email,
				password: password,
			});

			var requestOptions = {
				method: "POST",
				headers: myHeaders,
				body: raw,
				redirect: "follow",
			};

            fetch("http://localhost:8000/api/login", requestOptions)
                .then((response) => response.json())
				.then((result) => {
					state.currentUser.token = 'Bearer ' + result.token;
					return localStorage.setItem('user', 'Bearer ' + result.token);
				})
                .catch((error) => console.log("error", error));
		},
		async SetCurrentUser({state}) {
			var requestOptions = {
				method: 'GET',
				headers: {
					Authorization: localStorage.getItem('user')
				},
				redirect: 'follow'
			};

			const request = await fetch("http://localhost:8000/api/dashboard", requestOptions);

			const user = await request.json();

			localStorage.setItem('admin', user.admin)
		
			state.currentUser.data = await user;
			console.log(localStorage.getItem('admin'))
		},

        newPost({ state }, { title, url, user_id }) {
            var requestOptions = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    title: title,
                    url: url,
                    user_id: user_id,
                }),
                redirect: "follow",
            };

            fetch("http://localhost:8000/api/posts", requestOptions)
                .then((response) => response.json())
                .then((result) => state.posts.push(result))
                .catch((error) => console.log("error", error));
        },

        newComment({dispatch}, {content, user_id, post_id}){

            var requestOptions = {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "content": content,
                    "user_id": user_id,
                    "post_id": post_id
                    }),
                redirect: 'follow'
            };

            fetch("http://localhost:8000/api/comments", requestOptions)
            .then(response => response.text())
            .then(result => dispatch("fetchComments", result))
            .catch(error => console.log('error', error));
        },

		newUser({ state }, { firstname, lastname, birthday, email, username, password }) {
			console.log(firstname, lastname, birthday, email, username, password)
			var requestOptions = {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					firstname: firstname,
					lastname: lastname,
					birthdate: birthday,
					email: email,
					username: username,
					password: password,
					admin: 0,
				}),
				redirect: "follow",
			};

			fetch("http://localhost:8000/api/users", requestOptions)
				.then((response) => response.json())
				.then((result) => state.users.push(result))
				.catch((error) => console.log("error", error));
		},

		updateUser({ dispatch }, { id, firstname, lastname, birthdate, email, username, password, admin }) {
			var requestOptions = {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					firstname: firstname,
					lastname: lastname,
					birthdate: birthdate,
					email: email,
					username: username,
					password: password,
					admin: admin,
				}),
				redirect: "follow",
			};

			fetch("http://localhost:8000/api/users/" + id, requestOptions)
				.then((response) => response.json())
				.then(dispatch("fetchUsers"))
				.catch((error) => console.log("error", error));
		},

		updatePost({ dispatch }, { id, title, url }) {
			var requestOptions = {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					title: title,
					url: url,
				}),
				redirect: "follow",
			};
			fetch("http://localhost:8000/api/posts/" + id, requestOptions)
				.then((response) => response.json())
				.then(dispatch("fetchPosts"))
				.catch((error) => console.log("error", error));
		},

		updateComment({ dispatch }, { id, content }) {
			var requestOptions = {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					content: content,
				}),
				redirect: "follow",
			};

			fetch("http://localhost:8000/api/comments/" + id, requestOptions)
				.then((response) => response.json())
				.then(dispatch("fetchComments"))
				.catch((error) => console.log("error", error));
		},

        deleteUser({ state }, id) {
            var requestOptions = {
                method: 'DELETE',
                redirect: 'follow'
            };

            fetch("http://localhost:8000/api/users/" + id, requestOptions)
                .then(() => state.users = state.users.filter(user => user.id !== id))
                .catch(error => console.log('error', error));
        },

        deletePost({ state }, id) {
            var requestOptions = {
                method: 'DELETE',
                redirect: 'follow'
            };

            fetch("http://localhost:8000/api/posts/" + id, requestOptions)
                .then(() => state.posts = state.users.find(post => post.id !== id))
                .catch(error => console.log('error', error));
        },

        deleteComment({ state }, id) {
            var requestOptions = {
                method: 'DELETE',
                redirect: 'follow'
            };

            fetch("http://localhost:8000/api/comments/" + id, requestOptions)
                .then(() => state.comments = state.posts.filter(comment => comment.id !== id))
                .catch(error => console.log('error', error));
		},
		likePost({ dispatch }, { post_id, likes }) {
			var requestOptions = {
				method: 'PUT',
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({
					"likes": likes
				}),
				redirect: 'follow'
			};

			fetch("http://localhost:8000/api/posts/" + post_id, requestOptions)
			.then(response => response.json())
			.then(dispatch('fetchPosts'))
			.catch(error => console.log('error', error));
		},
		dislikePost({ dispatch }, { post_id, dislikes }) {
			var requestOptions = {
				method: 'PUT',
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({
					"dislikes": dislikes
				}),
				redirect: 'follow'
			};

			fetch("http://localhost:8000/api/posts/" + post_id, requestOptions)
			.then(response => response.json())
			.then(dispatch('fetchPosts'))
			.catch(error => console.log('error', error));
		},
		likeComment({ dispatch }, { comm_id, likes }) {			
			var requestOptions = {
				method: 'PUT',
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({
					"likes": likes
				}),
				redirect: 'follow'
			};

			fetch("http://localhost:8000/api/comments/" + comm_id, requestOptions)
			.then(response => response.json())
			.then(dispatch('fetchComments'))
			.catch(error => console.log('error', error));
		},
		dislikeComment({ dispatch }, { comm_id, dislikes }) {			
			var requestOptions = {
				method: 'PUT',
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({
					"dislikes": dislikes
				}),
				redirect: 'follow'
			};

			fetch("http://localhost:8000/api/comments/" + comm_id, requestOptions)
			.then(response => response.json())
			.then(dispatch('fetchComments'))
			.catch(error => console.log('error', error));
		}
    },
	getters: {
		getUserByEmail: (state) => (email) => {
			return state.users.find((user) => user.email == email)
		},
		getPostByUser: (state) => (user_id) => {
			return state.posts.filter((post) => post.user_id == user_id)
		},
		getCommentByPost: (state) => (post_id) => {
			return state.comments.filter((comment) => comment.post_id == post_id)
		},
		IsAuthenticated: () => !!localStorage.getItem('user'),

		async isAdmin() {
			var requestOptions = {
				method: 'GET',
				headers: {
					Authorization: localStorage.getItem('user')
				},
				redirect: 'follow'
			};

			const request = await fetch("http://localhost:8000/api/dashboard", requestOptions);

			const user = await request.json();

			return user.admin == 1;
		},
		
		getCurrentUserId: (state) => {return  state.currentUser.data.id}
    },
    modules: {
    },
});
