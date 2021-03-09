<template>
	<main class="admin-page">
		<form @submit.prevent="save">
			<h1 id="event">Esemény és Oldal beállítások</h1>
			<div class="col-group col2-label-text">
				<label for="title">Cím</label>
				<input
					type="text"
					id="title"
					placeholder="Cím"
					v-model="localConfig.title"
					@blur="commit"
				/>
			</div>
			<div class="col-group col2-label-text">
				<label for="shortdesc">Rövid leírás</label>
				<input
					type="text"
					id="shortdesc"
					placeholder="Rövid leírás"
					v-model="localConfig.shortdesc"
					@blur="commit"
				/>
			</div>
			<div class="col-group col2-label-text">
				<label for="date">Dátum</label>
				<input
					type="datetime-local"
					id="date"
					v-model="localConfig.date"
					@blur="commit"
				/>
			</div>
			<div class="col-group col2-label-text">
				<label for="banner-url">Banner URL</label>
				<input
					type="url"
					id="banner-url"
					placeholder="Banner URL"
					v-model="localConfig.bannerURL"
					@blur="commit"
				/>
			</div>
			<div class="col-group col2-label-checkbox">
				<label for="reg-active">Regisztráció</label>
				<input
					type="checkbox"
					id="reg-active"
					v-model="localConfig.regActive"
					@blur="commit"
				/>
			</div>
			<div class="col-group">
				<label for="longdesc">Hosszú leírás</label>
				<textarea
					id="longdesc"
					placeholder="Hosszú leírás"
					rows="5"
					v-model="localConfig.longdesc"
					@blur="commit"
				></textarea>
			</div>
			<hr />

			<h2 id="presenters">Előadók</h2>
			<template v-for="(presenter, i) in localConfig.presenters">
				<fieldset :key="i + 'presenter'">
					<div class="col-group col2-label-text">
						<label :for="'presenter-name-' + i">Előadó neve</label>
						<input
							type="text"
							:id="'presenter-name-' + i"
							placeholder="Előadó neve"
							v-model="presenter.name"
							@blur="commit"
						/>
					</div>
					<div class="col-group col2-label-text">
						<label :for="'presenter-picture-' + i">Előadó képe</label>
						<input
							type="url"
							:id="'presenter-picture-' + i"
							placeholder="Előadó képe"
							v-model="presenter.picture"
							@blur="commit"
						/>
					</div>
					<div class="col-group">
						<label :for="'presenter-description-' + i">Előadó leírása</label>
						<textarea
							:id="'presenter-description-' + i"
							placeholder="Előadó leírása"
							v-model="presenter.description"
							@blur="commit"
						></textarea>
					</div>
				</fieldset>
				<hr :key="i + 'presenter-hr'" />
			</template>
			<div class="col-group col2-eq-width">
				<button type="button" @click="addPresenter">Hozzáad</button>
				<button type="button" @click="deletePresenter">Töröl</button>
			</div>
			<hr />

			<h2 id="contacts">Elérhetőségek</h2>
			<template v-for="(contact, i) in localConfig.contacts">
				<fieldset :key="i + 'contact'">
					<div class="col-group col2-label-text">
						<label :for="'contact-name-' + i">Kontakt neve</label>
						<input
							type="text"
							:id="'contact-name-' + i"
							placeholder="Kontakt neve"
							v-model="contact.name"
							@blur="commit"
						/>
					</div>
					<div class="col-group col2-label-text">
						<label :for="'contact-picture-' + i">Kontakt képe</label>
						<input
							type="url"
							:id="'contact-picture-' + i"
							placeholder="Kontakt képe"
							v-model="contact.picture"
							@blur="commit"
						/>
					</div>
					<div class="col-group col2-label-text">
						<label :for="'contact-tel-' + i">Kontakt tel</label>
						<input
							type="tel"
							:id="'contact-tel-' + i"
							placeholder="Kontakt telefonszáma"
							v-model="contact.tel"
							@blur="commit"
						/>
					</div>
					<div class="col-group col2-label-text">
						<label :for="'contact-email-' + i">Kontakt email</label>
						<input
							type="email"
							:id="'contact-email-' + i"
							placeholder="Kontakt email címe"
							v-model="contact.email"
							@blur="commit"
						/>
					</div>
				</fieldset>
				<hr :key="i + 'contact-hr'" />
			</template>
			<div class="col-group col2-eq-width">
				<button type="button" @click="addContact">Hozzáad</button>
				<button type="button" @click="deleteContact">Töröl</button>
			</div>
			<hr />

			<h2 id="partners">Partnerek</h2>
			<template v-for="(partner, i) in localConfig.partners">
				<fieldset :key="i + 'partner'">
					<div class="col-group col2-label-text">
						<label :for="'partner-name-' + i">Partner neve</label>
						<input
							type="text"
							:id="'partner-name-' + i"
							placeholder="Partner neve"
							v-model="partner.name"
							@blur="commit"
						/>
					</div>
					<div class="col-group col2-label-text">
						<label :for="'partner-logo-' + i">Partner logo</label>
						<input
							type="url"
							:id="'partner-logo-' + i"
							placeholder="Partner logo"
							v-model="partner.logo"
							@blur="commit"
						/>
					</div>
					<div class="col-group col2-label-text">
						<label :for="'partner-web-' + i">Partner web</label>
						<input
							type="url"
							:id="'partner-web-' + i"
							placeholder="Partner web"
							v-model="partner.website"
							@blur="commit"
						/>
					</div>
				</fieldset>
				<hr :key="i + 'partner-hr'" />
			</template>
			<div class="col-group col2-eq-width">
				<button type="button" @click="addPartner">Hozzáad</button>
				<button type="button" @click="deletePartner">Töröl</button>
			</div>
			<hr />

			<h2 id="theme">Téma</h2>
			<div class="theme-colors">
				<div
					v-for="themeName in Object.keys(localConfig.theme)"
					:key="themeName + 'theme'"
					class="col-group col2-label-text"
				>
					<label :for="`theme-${themeName}`">{{ themeName }}</label>
					<input
						:id="`theme-${themeName}`"
						type="color"
						v-model="localConfig.theme[themeName]"
						@input="commit"
					/>
				</div>
			</div>
			<div class="col-group col2-eq-width">
				<input type="submit" value="Mentés" />
				<button type="button" @click="reset">Reset</button>
			</div>
		</form>
	</main>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import IEventConfig, { EventConfig } from "@/models/IEventConfig";

import Presenter from "@/models/Presenter";
import Contact from "@/models/Contact";
import Partner from "@/models/Partner";

@Component
export default class AdminPage extends Vue {
	localConfig: IEventConfig = new EventConfig();
	@Prop() eventConfig!: IEventConfig;

	created() {
		this.localConfig = JSON.parse(JSON.stringify(this.eventConfig));
		this.localConfig.date = (this.eventConfig.date as Date).toISOString().slice(0, 16);
	}
	commit() {
		this.$store.commit(
			"SET_EVENT",
			JSON.parse(JSON.stringify(this.localConfig))
		);
		this.$forceUpdate();
	}
	save() {
		this.$store.dispatch("fetchService", {
			url: "/api/admin/event",
			method: "PATCH",
			data: this.localConfig,
		});
	}
	reset() {
		this.$store.dispatch("fetchService", {
			url: "/api/admin/event",
			method: "DELETE",
		});
	}

	addPresenter() {
		this.localConfig.presenters.push(new Presenter());
		this.commit();
	}
	deletePresenter() {
		if (confirm("Biztos törlöd?")) {
			this.localConfig.presenters.pop();
			this.commit();
		}
	}
	addContact() {
		this.localConfig.contacts.push(new Contact());
		this.commit();
	}
	deleteContact() {
		if (confirm("Biztos törlöd?")) {
			this.localConfig.contacts.pop();
			this.commit();
		}
	}
	addPartner() {
		this.localConfig.partners.push(new Partner());
		this.commit();
	}
	deletePartner() {
		if (confirm("Biztos törlöd?")) {
			this.localConfig.partners.pop();
			this.commit();
		}
	}
}
</script>

<style lang="scss">
.admin-page {
	max-width: 1100px;
	margin: 0 auto;
	.theme-colors {
		margin: 0 auto;
	}
}
</style>
