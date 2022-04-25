import { createRouter, createWebHistory } from 'vue-router';
import LandingPage from "@/views/LandingPage.vue";
import HomePage from "@/views/HomePage.vue";
import UsersTable from "@/views/UsersTable.vue";
import PostsTable from "@/views/PostsTable.vue";
import CommentsTable from "@/views/CommentsTable.vue";
import Register from "@/components/LandingPage/RegisterLanding.vue";
import EspacePerso from '@/views/EspacePerso.vue';


const routes = [
	{
		name: 'LandingPage',
		path: '/',
		component: LandingPage,
		beforeEnter: () => {
			if (localStorage.getItem('user')) {
				return { name: 'HomePage'}
			}
		}
	},
	{
		path: '/register',
		name: 'register',
		component: Register,
		beforeEnter: () => {
			if (localStorage.getItem('user')) {
				return { name: 'HomePage'}
			}
		}
	},
	{
		name: 'HomePage',
		path: '/home',
		component: HomePage,
		beforeEnter: () => {
			if (!localStorage.getItem('user')) {
				return { name: 'LandingPage'}
			}
		}
	},
	
	{
		name:'UsersTable',
		path: '/admin/users',
		component: UsersTable,
		beforeEnter: () => {
			if (!localStorage.getItem('user')) {
				return { name: 'LandingPage'}
			}
			let isAdmin = localStorage.getItem('admin')
			if (isAdmin != 1) {
				return { name: 'HomePage'}
			}
		}
	},
	{
		name:'PostsTable',
		path: '/admin/posts',
		component: PostsTable,
		beforeEnter: () => {
			if (!localStorage.getItem('user')) {
				return { name: 'LandingPage'}
			}
			let isAdmin = localStorage.getItem('admin')
			if (isAdmin != 1) {
				return { name: 'HomePage'}
			}
		}
	},
	{
		name:'CommentsTable',
		path: '/admin/comments',
		component: CommentsTable,
		beforeEnter: () => {
			if (!localStorage.getItem('user')) {
				return { name: 'LandingPage'}
			}
			let isAdmin = localStorage.getItem('admin')
			if (isAdmin != 1) {
				return { name: 'HomePage'}
			}
		}
	},
	{
		name: 'EspacePerso',
		path: '/espacePerso',
		component: EspacePerso,
		beforeEnter: () => {
			if (!localStorage.getItem('user')) {
				return { name: 'LandingPage'}
			}
		}
	}
	];

const router = createRouter({
	history: createWebHistory(),
	routes
});




export default router;