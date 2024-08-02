<template>
	<Navigation></Navigation>
</template>

<script>
import Navigation from './components/shared/Navigation';

export default {
	components: { Navigation },
	setup() {},
};
</script>

<style>
#app {
	/* font-family: Avenir, Helvetica, Arial, sans-serif; */
	font-family: 'Poppins', sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
}

nav {
	padding: 30px;
}

nav a {
	font-weight: bold;
	color: #2c3e50;
}

nav a.router-link-exact-active {
	color: #42b983;
}
nav .delete-link a.router-link-exact-active {
	color: #d64b4b;
}
.link {
	display: inline-block;
}
</style>
