<template>
	<div :class="type" class="toast">
		<span>{{ data.message }}</span>
		<button type="button" @click="$store.commit('REMOVE_TOAST', data.id)">
			⨉
		</button>
	</div>
</template>

<script lang="ts">
import IToast from "@/models/IToast";
import { Vue, Component, Prop } from "vue-property-decorator";

@Component
export default class Toast extends Vue {
	@Prop() data!: IToast;
	type: string = "ok";
	created() {
		if (this.data.status > 399) this.type = "err";
	}
}
</script>

<style lang="scss">
@import "../scss/vars";
div.toast {
	position: relative;
	width: 100%;
	max-width: 500px;
	margin: 5px auto;
	border-radius: $default-s-radius;
	border: 1px solid $theme-light;
	box-shadow: $black-box-shadow;
	min-height: 40px;
	display: grid;
	place-items: center;
	padding: 5px 25px;
	pointer-events: all;
	&.ok {
		background-color: $theme-background;
	}
	&.err {
		background-color: $theme-link;
	}
	button {
		position: absolute;
		top: 5px;
		right: 5px;
		width: 16px;
		height: 16px;
		border-radius: 50%;
		border: none;
		padding: 0;
		line-height: unset;
	}
	span {
		overflow-wrap: break-word;
	}
}
</style>
