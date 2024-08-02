<template>
	<div class="recipe-container">
		<p class="warning-paragraph" v-if="mode === 'delete'">Are you sure you want to delete this recipe?</p>
		<button class="delete-button" v-if="mode === 'delete'" @click="deleteRecipe">Delete</button>

		<h1 class="recipe-title">{{ mode === 'view' || mode === 'delete' ? recipe.name : mode === 'edit' ? 'Edit Recipe' : 'Add Recipe' }}</h1>
		<div v-if="mode === 'view' || mode === 'delete'">
			<img class="recipe-image" :src="recipe.img_url" alt="Recipe Image" />
			<p class="recipe-summary">{{ recipe.summary }}</p>
			<h2 class="section-title">Ingredients</h2>
			<ul class="ingredients-list">
				<li v-for="ingredient in recipe.ingredients" :key="ingredient">{{ ingredient }}</li>
			</ul>
			<h2 class="section-title">Preparation</h2>
			<ol v-if="formattedRecipeDescription" class="preparation-description">
				<li v-for="step in formattedRecipeDescription" :key="step">{{ step }}</li>
			</ol>
			<p v-else class="preparation-description">{{ recipe.preparation_description }}</p>
		</div>

		<div v-else>
			<form @submit.prevent="handleSubmit">
				<label for="name">Name:</label>
				<input id="name" v-model="recipe.name" required />
				<img v-if="mode === 'edit'" class="recipe-image" :src="recipe.img_url" alt="Recipe Image" />
				<label for="img_url">Image URL:</label>
				<input id="img_url" v-model="recipe.img_url" required />

				<label for="summary">Summary:</label>
				<textarea id="summary" v-model="recipe.summary" required></textarea>

				<label for="ingredients">Ingredients:</label>
				<textarea id="ingredients" v-model="ingredientsInput" required></textarea>

				<label for="preparation_description">Preparation:</label>
				<textarea id="preparation_description" v-model="recipe.preparation_description" required></textarea>

				<button type="submit">{{ mode === 'edit' ? 'Save Changes' : 'Add Recipe' }}</button>
			</form>
		</div>
	</div>
</template>

<script>
import { ref, onMounted, watch, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';

export default {
	name: 'RecipeDetails',
	setup() {
		const route = useRoute();
		const router = useRouter();
		const mode = ref(route.params.action); // Use ref to make mode reactive
		const recipeId = ref(route.params.id);
		const recipe = ref({
			name: '',
			img_url: '',
			summary: '',
			ingredients: [],
			preparation_description: '',
		});
		const ingredientsInput = ref('');

		const fetchRecipeDetails = async () => {
			if (mode.value === 'view' || mode.value === 'edit' || mode.value === 'delete') {
				try {
					const response = await fetch(`http://localhost:3000/recipes/${route.params.id}`);
					if (response.ok) {
						const data = await response.json();
						recipe.value = data;
						ingredientsInput.value = data.ingredients.join(', ');

						console.log(formattedRecipeDescription.value);
					} else {
						throw Error('Recipe not found');
					}
				} catch (error) {
					console.error('Error fetching recipe details:', error.message);
				}
			}
		};

		const deleteRecipe = async () => {
			try {
				await fetch(`http://localhost:3000/recipes/${recipe.value.id}`, {
					method: 'DELETE',
				});
				router.push('/recipes');
			} catch (error) {
				console.error('Error deleting recipe:', error);
			}
		};

		const formattedRecipeDescription = computed(() => {
			return recipe.value.preparation_description.split('.').filter((step) => {
				if (step && step.length > 0) return step;
			});
		});

		const handleSubmit = () => {
			recipe.value.ingredients = ingredientsInput.value.split(',').map((item) => item.trim());

			if (mode.value === 'edit') {
				// Update existing recipe
				fetch(`http://localhost:3000/recipes/${recipeId.value}`, {
					method: 'PUT',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(recipe.value),
				})
					.then((response) => response.json())
					.then((data) => {
						console.log(data);
						router.push(`/recipe/${data.id}`);
					});
			} else {
				// Add new recipe
				fetch('http://localhost:3000/recipes', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(recipe.value),
				})
					.then((response) => response.json())
					.then((data) => {
						router.push(`/recipe/${data.id}`);
					});
			}
		};

		const resetState = () => {
			recipe.value = {
				name: '',
				img_url: '',
				summary: '',
				ingredients: [],
				preparation_description: '',
			};
			ingredientsInput.value = '';
			if (mode.value !== 'add' && route.params.id) fetchRecipeDetails();
		};

		onMounted(() => {
			resetState();
		});

		watch(route, (newRoute) => {
			mode.value = newRoute.params.action;
			resetState();
		});

		return { recipe, ingredientsInput, handleSubmit, mode, formattedRecipeDescription, deleteRecipe };
	},
};
</script>

<style scoped>
.recipe-container {
	max-width: 800px;
	margin: 0 auto;
	padding: 20px;
	background-color: #f9f9f9;
	border-radius: 8px;
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.recipe-title {
	font-size: 2.5em;
	margin-bottom: 20px;
	color: #333;
}

.recipe-image {
	width: 60%;
	height: auto;
	margin: 0 auto;
	border-radius: 8px;
	margin-bottom: 20px;
}

.recipe-summary {
	font-size: 1.2em;
	margin-bottom: 20px;
	color: #666;
}

.section-title {
	font-size: 1.8em;
	margin-top: 30px;
	margin-bottom: 10px;
	color: #333;
}

.ingredients-list {
	list-style-type: disc;
	padding-left: 20px;
	margin-bottom: 20px;
}

.ingredients-list li {
	font-size: 1.1em;
	margin-bottom: 5px;
	color: #555;
}

.preparation-description {
	font-size: 1.2em;
	color: #666;
}

form {
	display: flex;
	flex-direction: column;
}

label {
	margin-top: 10px;
	font-weight: bold;
}

input,
textarea {
	margin-top: 5px;
	padding: 10px;
	font-size: 1em;
	border: 1px solid #ccc;
	border-radius: 4px;
	font-family: 'Poppins', sans-serif;
}

button {
	margin-top: 1em;
	padding: 1em 2em;
	border: none;
	border-radius: 10px;
	background: #42b983;
	color: rgb(255, 255, 255);
	cursor: pointer;
	font-size: 15px;
	text-decoration: none;
}

button:hover {
	opacity: 0.9;
}

ol li {
	padding: 5px 10px;
	text-align: left;
}
input#name {
	margin-bottom: 1em;
}
.delete-button {
	background: #d64b4b;
	width: 60%;
}
.warning-paragraph {
	color: #d64b4b;
	font-weight: bold;
}
</style>
