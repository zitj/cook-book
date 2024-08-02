<template>
	<Teleport to="#modal-root">
		<div v-if="isVisible" class="modal-overlay" @click.self="closeModal">
			<div class="modal-content">
				<button class="close-button" @click="closeModal">X</button>
				<slot></slot>
			</div>
		</div>
	</Teleport>
</template>

<script>
import { ref, watch } from 'vue';

export default {
	props: {
		isVisible: {
			type: Boolean,
			required: true,
		},
	},
	setup(props, { emit }) {
		console.log(props);
		const isVisible = ref(props.isVisible);

		const closeModal = () => {
			emit('close');
		};
		watch(
			() => props.isVisible,
			(newValue) => {
				console.log(newValue);
				isVisible.value = newValue;
			}
		);

		return {
			isVisible,
			closeModal,
		};
	},
};
</script>

<style>
.modal-overlay {
	font-family: 'Poppins', sans-serif;
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: rgba(0, 0, 0, 0.902);
	display: flex;
	justify-content: center;
	align-items: center;
	z-index: 9999;
}
.modal-content {
	background: white;
	padding: 20px;
	border-radius: 5px;
	position: relative;
}
.close-button {
	position: absolute;
	top: 10px;
	right: 10px;
	background: none;
	border: none;
	font-size: 20px;
	cursor: pointer;
}
</style>
