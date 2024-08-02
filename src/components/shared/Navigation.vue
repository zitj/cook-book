<template>
	<div>
		<nav>
			<div class="link">
				<router-link to="/recipes">Show all recipes</router-link>
				<span>&nbsp;|&nbsp;</span>
			</div>
			<div class="link">
				<router-link to="/recipes/add">Add new recipe</router-link>
				<span v-if="mode === 'view' || mode === 'edit' || mode === 'delete'">&nbsp;|&nbsp;</span>
			</div>
			<div class="link" v-if="mode && mode !== 'add'">
				<router-link :to="`/recipes/edit/${recipeId}`">Edit this recipe</router-link>
				<span v-if="mode && mode !== 'add'">&nbsp;|&nbsp;</span>
			</div>
			<div class="link delete-link" v-if="mode && mode !== 'add'">
				<router-link :to="`/recipes/delete/${recipeId}`">Delete this recipe</router-link>
			</div>
		</nav>
		<router-view />
	</div>
</template>

<script>
import { ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
export default {
	name: 'Navigation',
	setup() {
		const route = useRoute();
		// const router = useRouter();
		const mode = ref(route.params.action);
		const recipeId = ref(route.params.id);

		onMounted(() => {
			console.log('Initial route params:', route.params);
		});

		watch(route, (newRoute) => {
			console.log('Route params changed:', newRoute.params);
			mode.value = newRoute.params.action;
			recipeId.value = newRoute.params.id;
		});

		return {
			mode,
			recipeId,
		};
	},
};
</script>

<style></style>
