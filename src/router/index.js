import { createRouter, createWebHistory } from 'vue-router';

const routes = [
	{
		path: '/recipes',
		name: 'Recipes',
		component: () => import(/* webpackChunkName: "RecipesView" */ '../views/recipes/RecipesView.vue'),
	},
	{
		path: '/recipes/:action/:id?',
		name: 'RecipeDetails',
		component: () => import(/* webpackChunkName: "RecipeDetails" */ '../views/recipes/RecipeDetails.vue'),
	},
	{
		path: '/about',
		name: 'About',
		component: () => import(/* webpackChunkName: "About" */ '../views/AboutView.vue'),
	},
	{
		path: '/:pathMatch(.*)*', // Catch-all route
		redirect: '/recipes',
	},
];

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes,
});

export default router;
