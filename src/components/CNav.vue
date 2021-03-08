<template>
	<nav>
		<div :class="{ 'is-active': active }" @click="toggle" class="hamburger">
			<div class="hamburger-box">
				<div class="hamburger-inner"></div>
			</div>
		</div>
		<div :class="{ 'is-active': active }" class="nav--options-container">
			<slot></slot>
		</div>
	</nav>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
@Component
export default class CNav extends Vue {
	active: boolean = false;
	toggle() {
		this.active = !this.active;
	}
}
</script>

<style lang="scss">
@import "../scss/vars";
$nav-dot-size: 16px;
nav {
	position: fixed;
	z-index: $z-nav;
	right: 0;
	height: 100vh;
	display: grid;
	align-content: center;
	pointer-events: none;
	.hamburger {
		pointer-events: all;
		position: absolute;
		top: 0;
		right: 0;
		padding: 10px;
		cursor: pointer;
		.hamburger-box {
			position: relative;
			display: inline-block;
			width: 36px;
			height: 36px;
			.hamburger-inner {
				transition-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);
				transition-duration: 0.22s;
				top: 50%;
				display: block;
				margin-top: -2px;
				&::before,
				&::after {
					content: "";
					display: block;
				}
				&::before {
					top: -10px;
					transition: top 0.1s ease-in 0.25s, opacity 0.1s ease-in;
				}
				&::after {
					bottom: -10px;
					transition: bottom 0.1s ease-in 0.25s,
						transform 0.22s cubic-bezier(0.55, 0.055, 0.675, 0.19);
				}
			}
			.hamburger-inner,
			.hamburger-inner::before,
			.hamburger-inner::after {
				background-color: $theme-text1;
				position: absolute;
				width: 36px;
				height: 4px;
				border-radius: 4px;
			}
		}
		&.is-active {
			.hamburger-box {
				.hamburger-inner {
					transition-delay: 0.12s;
					transition-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
					transform: rotate(225deg);
					&::before {
						top: 0;
						transition: top 0.1s ease-out, opacity 0.1s ease-out 0.12s;
						opacity: 0;
					}
					&::after {
						bottom: 0;
						transition: bottom 0.1s ease-out,
							transform 0.22s cubic-bezier(0.215, 0.61, 0.355, 1) 0.12s;
						transform: rotate(-90deg);
					}
				}
			}
		}
	}

	.nav--options-container {
		transform: translateX(300px);
		transition: transform 0.2s ease-out;
		pointer-events: all;
		&.is-active {
			transform: translateX(0);
		}
	}
	a {
		padding: $default-padding/2 $default-padding;
		display: block;
		div.nav--dot {
			position: relative;
			width: $nav-dot-size;
			height: $nav-dot-size;
			border-radius: 50%;
			background-color: transparent;
			border: 2px solid currentColor;
			color: $theme-text1;
			box-shadow: $default-box-shadow inset;
			transition: all 0.2s ease-in;
			span.nav--desc {
				$small-padding: 5px;
				border-radius: $default-s-radius;
				position: absolute;
				right: $default-padding + $nav-dot-size;
				top: -$small-padding;
				padding: $small-padding;
				background-color: $theme-link;
				color: $theme-text1;
				white-space: nowrap;
				transition: all 0.2s ease-in;
			}
		}
		&:hover,
		&.active {
			div.nav--dot {
				transform: scale(1.3);
				color: $theme-link;
				border-width: 0;
				background-color: currentColor;
			}
		}
	}
}

@media screen and (min-width: 1400px) {
	nav {
		.hamburger {
			display: none;
		}
		.nav--options-container {
			transform: translateX(0);
		}
	}
}
</style>
