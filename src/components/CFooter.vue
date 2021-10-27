<template>
	<footer class="footer filter-bg">
		<span
			>Minden jog fenntartva &copy; 2021 Schönherz Vállalati
			Kapcsolatok<RouterLink :to="{ name: 'Admin.Page' }">.</RouterLink></span
		>
	</footer>
</template>

<style lang="scss">
@use "../scss/vars" as *;

.footer {
	margin-top: 2 * $default-padding;
	padding: $default-padding;
	border-top: 1px solid $theme-lines;
}
</style>
