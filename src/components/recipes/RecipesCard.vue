<template>
	<div>
		<div class="recipe-card">
			<div @click="openModal" class="delete-button">&times;</div>
			<div class="image-container">
				<img class="hero-image" :src="recipe.img_url" :alt="recipe.name" />
			</div>
			<div class="content-container">
				<h2>{{ recipe.name }}</h2>
				<p>{{ recipe.summary }}</p>
				<router-link class="view-recipe" :to="`/recipes/view/${recipe.id}`">View recipe</router-link>
			</div>
		</div>
		<Modal :isVisible="isModalVisible" @close="closeModal">
			<p>{{ `Are you sure you want to delete recipe?` }}</p>
			<p class="modal-heading">{{ recipe.name }}</p>
			<img class="modal-image" :src="recipe.img_url" :alt="recipe.name" />
			<div class="modal-action-buttons">
				<button class="cancel-button" @click="isModalVisible = false">Cancel</button>
				<button class="delete-button" @click="deleteRecipe(recipe.id)">Delete</button>
			</div>
		</Modal>
	</div>
</template>

<script>
import Modal from '../reusable/Modal.vue';
import { ref, onMounted, watch, computed } from 'vue';
export default {
	name: 'RecipesCard',
	components: { Modal },
	props: {
		recipe: {
			type: Object,
			required: true,
		},
	},
	setup(props, { emit }) {
		const isModalVisible = ref(false);
		const modalContent = ref('');

		const openModal = (content) => {
			// modalContent.value = content;
			isModalVisible.value = true;
			emit('open-modal', isModalVisible);
		};

		const closeModal = () => {
			isModalVisible.value = false;
		};

		const deleteRecipe = (id) => {
			emit('delete-recipe', id);
		};
		return {
			openModal,
			closeModal,
			isModalVisible,
			deleteRecipe,
		};
	},
};
</script>

<style scoped>
.recipe-card {
	position: relative;
	overflow: hidden;
	height: 220px;
	width: 300px;
	background-color: #fff;
	border: 1px solid #ddd;
	border-radius: 8px;
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	padding: 16px;
	box-sizing: border-box;
	margin: 1em;
}
.image-container {
	position: absolute;
	left: 0;
	top: 0;
	height: 100%;
	width: 100%;
	overflow: hidden;
}
.image-container img {
	position: absolute;
	left: 0;
	top: 0;
	height: 100%;
	width: 100%;
	opacity: 0.5;
}

.content-container {
	position: absolute;
	background: rgba(0, 0, 0, 0.588); /* Optional: Add a semi-transparent background */
	width: 90%;
	height: 100%;
	top: 0;
	left: 0;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	padding: 0 5%;
	color: #fff; /* Ensure text is visible */
	z-index: 1; /* Ensure this is on top of the image-container */
	text-align: center;
}

.content-container h2 {
	margin-top: 0;
	height: 20px;
	line-height: 1;
	font-size: 22px;
}
.content-container p {
	height: 60px;
	line-height: 1.2;
}
.content-container h2,
.content-container p {
	text-shadow: 1px 1px 1px #030405;
}

.content-container .view-recipe {
	padding: 0.5em 2em;
	border: none;
	border-radius: 10px;
	background: #42b983;
	color: rgb(255, 255, 255);
	cursor: pointer;
	font-size: 15px;
	text-decoration: none;
}
.content-container .view-recipe:hover {
	text-decoration: underline;
	text-underline-offset: 2px;
}

.recipe-card:hover {
	opacity: 0.95;
	transform: scale(1.01);
	transition: 0.1s;
}

.recipe-card ul {
	padding-left: 20px;
}

.recipe-card ul li {
	list-style-type: disc;
}
.recipe-card .delete-button {
	position: absolute;
	background: rgb(242, 242, 242);
	z-index: 100000;
	width: 20px;
	height: 20px;
	right: 3%;
	top: 3%;
	border-radius: 50%;
	font-weight: bold;
	font-size: 20px;
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;
	z-index: 2222;
}

.modal-heading {
	font-size: 18px;
	text-align: center;
	font-weight: bold;
}
.modal-action-buttons {
	text-align: center;
	display: flex;
	justify-content: center;
	align-content: space-around;
	margin-top: 1em;
}
.modal-action-buttons button {
	padding: 8px 14px;
	border: none;
	background: #42b983;
	border-radius: 10px;
	color: white;
	cursor: pointer;
}
.modal-action-buttons button:hover {
	opacity: 0.9;
}
.modal-action-buttons button:active {
	opacity: 1;
}
.modal-action-buttons button.delete-button {
	margin-left: 10px;
	background: #d64b4b;
}
.modal-image {
	text-align: center;
	margin: 0 auto;
	width: 230px;
	height: auto;
	justify-content: center;
	align-content: center;
	display: block;
}
</style>
