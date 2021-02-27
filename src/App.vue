<template>
	<div id="app">
		<div v-if="ready">
			<div class="messages">
				<Toast v-for="(toast, i) in $store.state.toasts" :data="toast" :key="i"/>
			</div>
			<RouterView :event-config="$store.state.event"/>
			<CFooter/>
		</div>
		<div v-else class="loader-wrapper">
			<div class="loader"></div>
		</div>
	</div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import IEventConfig from '@/models/IEventConfig'
import CFooter from '@/components/CFooter.vue'
import Toast from '@/components/Toast.vue'

@Component({
	components: {
		Toast,
		CFooter
	}
})
export default class App extends Vue {
	ready: boolean = false

	created() {
		this.$store.commit('SET_EVENT', this.$store.state.event)
		this.$store.dispatch('fetchService', {
			url: '/api/event',
			exStatus: 200,
			onSuccess: (event: IEventConfig) => {
				this.$store.commit('SET_EVENT', event)
				this.ready = true
			}
		})
	}
}
</script>


<style lang="scss">
@import "./scss/vars";
@import "./scss/elements";
@import "./scss/cards";

div.messages {
	position: fixed;
	z-index: $z-messages;
	width: 100%;
	padding: 5px;
	pointer-events: none;
}

// Lecseréli a H1-et a hátterére, a hátterét meg eltűnteti
/* @supports (-webkit-background-clip: text) or (background-clip: text) {
	section#banner {
		div.banner--wrapper {
			h1 {
				color: transparent;
				background-clip: text;
				-webkit-background-clip: text;
			}
		}
	}
} */

// LOADER
$size: 20vmin;
$dist: 3vmin;
$border: 1vmin;
@keyframes loader-1 {
	to {
		transform: rotateX(180deg);
	}
}

@keyframes loader-2 {
	0% {
		opacity: 0;
	}
	25% {
		opacity: 1;
	}
	50% {
		box-shadow: 0 0 5px, $dist 0 0, $dist 0 5px;
	}
	75% {
		box-shadow: 0 0 5px, $dist 0 0, $dist 0 5px, 2 * $dist 0 0, 2 * $dist 0 5px;
	}
}

.loader-wrapper {
	height: 100vh;
	display: grid;
	place-items: center;
	.loader {
		position: relative;
		display: inline-block;
		width: $size;
		height: $size;
		color: inherit;
		vertical-align: middle;
		&:before,
		&:after {
			content: '';
			position: absolute;
			top: 0;
			left: 0;
		}
		&:before {
			width: $size;
			height: $size;
			border: $border solid currentcolor;
			border-radius: 50%;
			animation: loader-1 1s infinite -0.3s ease-in-out;
			box-shadow: 0 0 10px, 0 0 10px inset;
		}
		&:after {
			right: 0;
			bottom: 0;
			margin: auto;
			width: 0;
			height: 0;
			border: 1vmin solid currentcolor;
			border-radius: 50%;
			transform: translate(-$dist);
			animation-name: loader-2;
			animation-duration: 4s;
			animation-timing-function: steps(1);
			animation-iteration-count: infinite;
			animation-delay: 0.5s;
			background: currentColor;
			box-shadow: 0 0 5px;
		}
	}
}
</style>