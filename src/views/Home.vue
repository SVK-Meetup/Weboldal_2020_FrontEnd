<template>
	<div class="home">
		<CNav>
			<div>
				<a href="#banner">
					<div class="nav--dot">
						<span class="nav--desc">Lap teteje</span>
					</div>
				</a>
				<a href="#information">
					<div class="nav--dot">
						<span class="nav--desc">Információk</span>
					</div>
				</a>
				<a href="#presenters">
					<div class="nav--dot">
						<span class="nav--desc">Előadók</span>
					</div>
				</a>
				<a href="#registration">
					<div class="nav--dot">
						<span class="nav--desc">Regisztráció</span>
					</div>
				</a>
				<a href="#contacts">
					<div class="nav--dot">
						<span class="nav--desc">Elérhetőség</span>
					</div>
				</a>
				<a href="#partners">
					<div class="nav--dot">
						<span class="nav--desc">Partnereink</span>
					</div>
				</a>
				<a href="#gallery">
					<div class="nav--dot">
						<span class="nav--desc">Galéria</span>
					</div>
				</a>
			</div>
		</CNav>
		<main>
			<section
				id="banner"
				:style="`background-image: url(${eventConfig.bannerURL})`"
			>
				<div class="banner--wrapper">
					<h1>{{ eventConfig.title }}</h1>
					<br />
					<p class="banner--brief" v-html="eventConfig.shortdesc"></p>
					<br />
					<p class="banner--date">{{ eventConfig.humanDate }}</p>
					<br />
					<a href="#registration" class="action-link">Regisztráció</a>
				</div>
			</section>
			<section id="information">
				<Countdown :event-date="eventConfig.date" />
				<h2>{{ eventConfig.title }}</h2>
				<p class="information--description" v-html="eventConfig.longdesc"></p>
			</section>
			<hr />
			<section id="presenters" class="card-section with-heading">
				<h2>Előadók</h2>
				<div class="flex-wrapper">
					<div
						class="card filter-bg"
						v-for="(presenter, i) in eventConfig.presenters"
						:key="i"
					>
						<img :src="presenter.picture" alt="az előadó képe'" />
						<h3 class="presenter--name" v-html="presenter.name"></h3>
						<p
							class="presenter--description"
							v-html="presenter.description"
						></p>
					</div>
				</div>
			</section>
			<section v-if="!regSuccess" id="registration" class="with-heading">
				<h2>Regisztráció</h2>
				<div class="grid-wrapper">
					<form v-if="this.eventConfig.regActive" @submit.prevent="register">
						<input
							type="text"
							minlength="3"
							maxlength="60"
							required
							placeholder="Teljes név"
							aria-label="Teljes név"
							v-model.trim="attendee.name"
						/>
						<input
							type="email"
							maxlength="60"
							required
							placeholder="E-mail cím"
							aria-label="E-mail cím"
							v-model.trim="attendee.email"
						/>
						<input
							type="text"
							minlength="2"
							maxlength="60"
							required
							placeholder="Melyik szervezettől jöttél?"
							aria-label="Melyik szervezettől jöttél?"
							v-model.trim="attendee.organization"
						/>
						<input
							type="text"
							maxlength="100"
							required
							placeholder="Honnan értesültél a rendezvényről?"
							aria-label="Honnan értesültél a rendezvényről?"
							v-model.trim="attendee.comment"
						/>
						<div>
							<input
								:disabled="waitForResponse"
								type="submit"
								value="Regisztráció"
							/>
						</div>
						<p>
							Az e-mail cím kizárólag az eseménnyel kapcsolatos információk
							közlésére használható fel. Az esemény után 3 nappal törlésre
							kerül, harmadik féllel nem kerül megosztásra.
						</p>
					</form>
					<p v-else>Jelenleg nincs regisztráció.</p>
				</div>
			</section>
			<hr />
			<section id="contacts" class="card-section with-heading">
				<h2>Elérhetőség</h2>
				<div class="flex-wrapper">
					<div
						v-for="(contact, i) in eventConfig.contacts"
						:key="i"
						class="card filter-bg"
					>
						<img :src="contact.picture" alt="szervező képe" />
						<h3 v-html="contact.name"></h3>
						<a :href="'mailto:' + contact.email">{{ contact.email }}</a
						><br /><br />
						<a class="contact--phone" :href="'tel:' + contact.tel">{{
							contact.tel
						}}</a>
					</div>
				</div>
			</section>
			<section id="partners" class="card-section with-heading">
				<h2>Partnereink</h2>
				<div class="flex-wrapper">
					<div
						class="card filter-bg"
						v-for="(partner, i) in eventConfig.partners"
						:key="i"
						:title="partner.name"
					>
						<img :src="partner.logo" :alt="partner.name + ' logo'" />
						<h3>
							<a :href="partner.website" target="_blank">{{ partner.name }}</a>
						</h3>
					</div>
				</div>
			</section>
			<section id="gallery" class="with-heading">
				<h2>Galéria</h2>
				<!-- Gallery modal -->
				<Modal>
					<div slot="trigger" class="gallery--slides">
						<!-- First 6 folder indexes for gallery trigger -->
						<div
							class="gallery--slide"
							v-for="(dir, i) in eventConfig.gallery.slice(0, 3)"
							:key="i + '-splash'"
							:style="`background-image: url('${dir.index}')`"
						></div>
					</div>
					<div slot="content" class="gallery-modal--slides modal--grid">
						<!-- Folder indexes modal -->
						<Modal
							v-for="(dir, i) in eventConfig.gallery"
							:key="i + '-modal-splash'"
						>
							<div
								slot="trigger"
								class="gallery-modal--slide gallery-modal--folder"
								:style="`background-image: url('${dir.index}')`"
							>
								<span>{{ dir.name }}</span>
								<span>{{ dir.date }}</span>
							</div>
							<div slot="content" class="gallery-modal--slides modal--grid">
								<!-- Images in the folder modal -->
								<Modal v-for="(image, j) in dir.images" :key="j + '-image'">
									<div
										slot="trigger"
										class="gallery-modal--slide"
										:style="`background-image: url('${image}')`"
									></div>
									<div slot="content" class="gallery-modal--image-container">
										<div
											class="gallery-modal--image"
											:style="`background-image: url('${image}')`"
										></div>
									</div>
								</Modal>
							</div>
						</Modal>
					</div>
				</Modal>
			</section>
		</main>
	</div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import IEventConfig from "@/models/IEventConfig";
import IAttendee from "@/models/IAttendee";
import CNav from "@/components/CNav.vue";
import Modal from "@/components/Modal.vue";
import Countdown from "@/components/Countdown.vue";

@Component({
	components: {
		CNav,
		Modal,
		Countdown,
	},
})
export default class Home extends Vue {
	@Prop() eventConfig!: IEventConfig;
	regSuccess: boolean = false;
	waitForResponse: boolean = false;
	attendee: IAttendee = {
		name: "",
		email: "",
		organization: "",
		comment: "",
	};

	register() {
		this.waitForResponse = true;
		this.$store
			.dispatch("fetchService", {
				url: "/api/register",
				method: "POST",
				data: this.attendee,
				exStatus: 200,
				onSuccess: () => {
					this.regSuccess = true;
				},
			})
			.then(() => (this.waitForResponse = false));
	}
}
</script>

<style lang="scss">
@use "../scss/vars" as *;
@use "sass:math";

section#banner {
	position: relative;
	place-items: center;
	max-width: unset;
	background-size: cover;
	background-position: center;
	background-attachment: fixed;
	box-shadow: 0 0 20vmax #000 inset;
	div.banner--wrapper {
		text-align: center;
		display: inline-block;
		h1 {
			display: inline-block;
			border-radius: $default-s-radius;
			padding: 10px;
			background-image: $theme-gradient-1;
		}
		p {
			display: inline-block;
			margin: 10px 0;
			border-radius: $default-s-radius;
			padding: 10px;
			background-image: $theme-gradient-1;
		}
		a.action-link {
			margin: 50px 0 0;
		}
	}
}
section#information {
	.information--description {
		width: min($info-max-width, 100%);
		margin: 0 auto;
	}
}
section#registration {
	div.grid-wrapper {
		place-items: center;
		form {
			width: min(100%, 300px);
		}
	}
}
section#gallery {
	.gallery--slides {
		display: flex;
		height: 200px;
		border-radius: $default-m-radius;
		overflow: hidden;
		cursor: pointer;
		.gallery--slide {
			height: 200px;
			background-size: cover;
			background-position: center;
			background-repeat: no-repeat;
			flex-grow: 1;
			transition: flex-grow 0.3s ease-in-out;
			&:hover {
				transition: flex-grow 1s ease-out;
				flex-grow: 3;
			}
		}
	}
	.gallery-modal--slides {
		padding-right: math.div($default-padding, 4);
		//overflow: visible;
	}
	.gallery-modal--slide {
		width: 100%;
		height: 300px;
		border-radius: $default-s-radius;
		background-size: cover;
		background-position: center;
		background-repeat: no-repeat;
		cursor: pointer;
		transition: all 0.2s ease-out;
		filter: brightness(1);
		border: 1px solid $theme-lines;
		&:hover {
			filter: brightness(1.2);
		}
	}
	.gallery-modal--folder {
		display: grid;
		place-items: center;
		span {
			padding: 5px $default-padding;
			background-color: $theme-background;
			border-radius: $default-s-radius;
		}
	}
	.gallery-modal--image-container {
		height: 100%;
	}
	.gallery-modal--image {
		height: 100%;
		background-size: contain;
		background-repeat: no-repeat;
		background-position: center;
	}
}
</style>
