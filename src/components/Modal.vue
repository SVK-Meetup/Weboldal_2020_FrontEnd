<template>
	<div class="modal-wrapper">
		<div @click.prevent="toggle" class="trigger-wrapper">
			<slot name="trigger"></slot>
		</div>
		<div class="modal" v-if="visible">
			<button class="close" @click="toggle">⨉</button>
			<div class="modal--inner">
				<!-- A slot lehetőleg div legyen a css miatt -->
				<slot name="content"></slot>
			</div>
		</div>
	</div>
</template>

<style lang="scss">
@use "../scss/vars" as *;

.modal {
	background: $theme-background;
	position: fixed;
	overflow: visible;
	width: calc(100% - #{$default-padding * 2});
	height: calc(100% - #{$default-padding * 2});
	z-index: $z-modal;
	top: $default-padding;
	left: $default-padding;
	border-radius: $default-m-radius;
	padding: $default-padding;
	box-shadow: $black-box-shadow;
	border: 1px solid $theme-lines;
	button.close {
		$size: 40px;
		position: absolute;
		top: -($default-padding - 5px);
		right: -($default-padding - 5px);
		width: $size;
		height: $size;
		font-size: 30px;
		padding: 0 8px;
	}
	.modal--inner {
		height: 100%;
		& > div {
			max-height: 100%;
			border-radius: $default-s-radius;
			overflow-y: auto;
		}
	}
	.modal--text {
		background-color: white;
		color: black;
		padding: $default-padding;
		height: 100%;
	}
	.modal--grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: $default-padding;
		.trigger-wrapper {
			width: 100%;
		}
	}
}

@media screen and (min-width: $query-tablet) {
	.modal .modal--grid {
		grid-template-columns: 1fr 1fr;
	}
}
@media screen and (min-width: $query-desktop) {
	.modal .modal--grid {
		grid-template-columns: 1fr 1fr 1fr;
	}
}
@media screen and (min-width: $query-large-desktop) {
	.modal .modal--grid {
		grid-template-columns: 1fr 1fr 1fr 1fr;
	}
}
</style>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component
export default class Modal extends Vue {
	visible: boolean = false;

	toggle() {
		this.visible = !this.visible;
	}
}
</script>
