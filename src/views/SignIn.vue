<template>
	<main class="sign-in--wrapper">
		<section class="oauth-button-container">
			<a href="/auth/authsch" class="action-link">AuthSCH</a>
		</section>
	</main>
</template>

<style lang="scss">
@import "../scss/vars";

.sign-in--wrapper {
	margin-bottom: -40px;
	.oauth-button-container {
		height: calc(100vh - 57px);
		padding: $default-padding;
		place-items: center;
	}
}
</style>
