<template>
	<div class="countdown">
		<div>
			<span>{{ days }}</span>
			<span class="countdown-tag">nap</span>
		</div>
		<div>
			<span>{{ hours }}</span>
			<span class="countdown-tag">óra</span>
		</div>
		<div>
			<span>{{ minutes }}</span>
			<span class="countdown-tag">perc</span>
		</div>
		<div>
			<span>{{ seconds }}</span>
			<span class="countdown-tag">másodperc</span>
		</div>
	</div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component({})
export default class Countdown extends Vue {
	@Prop() eventDate!: Date;
	days: number = 0;
	hours: number = 0;
	minutes: number = 0;
	seconds: number = 0;

	private interval: number = 0;
	created() {
		const eventDate = this.eventDate.getTime();
		if (Date.now() < eventDate) {
			this.interval = setInterval(() => {
				let dT = eventDate - Date.now();
				if (dT <= 0) {
					dT = 0;
					clearInterval(this.interval);
				}
				this.days = ~~(dT / 86400000);
				this.hours = ~~((dT % 86400000) / 3600000);
				this.minutes = ~~((dT % 3600000) / 60000);
				this.seconds = ~~((dT % 60000) / 1000);
			}, 1000);
		}
	}

	destroyed() {
		clearInterval(this.interval);
	}
}
</script>

<style lang="scss">
@import "../scss/vars";
.countdown {
	display: flex;
	justify-content: space-evenly;
	gap: $default-padding;
	width: Min($info-max-width, 100%);
	font-size: 1.3rem;
	margin: $default-padding auto 2 * $default-padding;
	div {
		background-color: $theme-link;
		width: 3em;
		height: 3em;
		border-radius: 50%;
		position: relative;
		padding-top: 1em;
		box-shadow: $black-box-shadow;
		border: 1px solid $theme-highlight;
		.countdown-tag {
			display: block;
			position: absolute;
			bottom: -0.25em;
			left: 50%;
			transform: translateX(-50%);
			background-color: $theme-highlight;
			font-size: 1rem;
			padding: 2px 10px;
			border-radius: 100px;
			box-shadow: $black-box-shadow;
		}
	}
}
</style>
