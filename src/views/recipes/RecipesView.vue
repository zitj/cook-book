<template>
	<div class="home">
		<h1>Recipes</h1>
		<RecipesList :recipes="recipes" @update-list="updateList" />
	</div>
</template>

<script>
// @ is an alias to /src
import { ref, onMounted } from 'vue';
import RecipesList from '../../components/recipes/RecipesList.vue';

export default {
	name: 'RecipesView',
	components: { RecipesList },
	setup() {
		const recipes = ref([]);
		const fetchRecipes = async () => {
			try {
				const response = await fetch('http://localhost:3000/recipes');
				if (response.ok) {
					const data = await response.json();
					recipes.value = data;
				} else {
					throw Error('Oops, looks like there are no recipes!');
				}
			} catch (error) {
				console.error('Error fetching recipes:', error.message);
			}
		};

		onMounted(() => {
			fetchRecipes();
		});

		const updateList = (isItemRemovedFromList) => {
			if (isItemRemovedFromList) fetchRecipes();
		};

		return { recipes, updateList };
	},
};
</script>
