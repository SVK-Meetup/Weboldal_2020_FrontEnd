<template>
	<footer class="footer">
		<span>Minden jog fenntartva &copy; 2021 Schönherz Vállalati Kapcsolatok<RouterLink :to="{name:'Admin.Page'}">.</RouterLink></span>
	</footer>
</template>

<style lang="scss">
@import "../scss/vars";
.footer {
	margin-top: 2 * $default-padding;
	backdrop-filter: $card-filter;
	padding: $default-padding;
	border-top: 1px solid $theme-lines;
}
</style>
