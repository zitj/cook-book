<template>
	<div class="recipes-container">
		<RecipesCard v-for="recipe in recipes" :key="recipe.id" :recipe="recipe" @open-modal="handleOpenModal" @delete-recipe="deleteRecipe" />
	</div>
</template>

<script>
import RecipesCard from './RecipesCard.vue';
import { ref } from 'vue';
export default {
	name: 'RecipesList',
	components: {
		RecipesCard,
	},
	props: {
		recipes: {
			type: Array,
			required: true,
		},
	},
	setup(props, { emit }) {
		const isModalVisible = ref(false);
		const handleOpenModal = (e) => {
			console.log(e);
			isModalVisible.value = e;
		};

		const deleteRecipe = async (id) => {
			try {
				const response = await fetch(`http://localhost:3000/recipes/${id}`, {
					method: 'DELETE',
				});

				if (!response.ok) {
					throw new Error('Failed to delete the recipe');
				}
				console.log(response);
				console.log('Recipe deleted successfully:', id);
				emit('update-list', true);
			} catch (error) {
				console.error('Error deleting recipe:', error);
			}
		};

		return {
			handleOpenModal,
			isModalVisible,
			deleteRecipe,
		};
	},
};
</script>

<style scoped>
.recipes-container {
	width: 60%;
	margin: 0 auto;
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	align-content: center;
	gap: 16px;
}
</style>
