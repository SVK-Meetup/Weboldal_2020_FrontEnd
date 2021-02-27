<template>
	<main>
		<form @submit.prevent="save">
			<h1 id="event">Esemény és Oldal beállítások</h1>
			<div class="col-group col2-label-text">
				<label for="title">Cím</label>
				<input type="text" id="title" placeholder="Cím" v-model="localConfig.title">
			</div>
			<div class="col-group col2-label-text">
				<label for="shortdesc">Rövid leírás</label>
				<input type="text" id="shortdesc" placeholder="Rövid leírás" v-model="localConfig.shortdesc" @input="refresh">
			</div>
			<div class="col-group col2-label-text">
				<label for="date">Dátum</label>
				<input type="datetime-local" id="date" v-model="localConfig.date" @input="refresh">
			</div>
			<div class="col-group col2-label-text">
				<label for="banner-url">Banner URL</label>
				<input type="text" id="banner-url" placeholder="Banner URL" v-model="localConfig.bannerURL" @input="refresh">
			</div>
			<div class="col-group col2-label-checkbox">
				<label for="reg-active">Regisztráció</label>
				<input type="checkbox" id="reg-active" v-model="localConfig.regActive" @input="refresh">
			</div>
			<div class="col-group">
				<label for="longdesc">Hosszú leírás</label>
				<textarea id="longdesc" placeholder="Hosszú leírás" rows="5" v-model="localConfig.longdesc" @input="refresh"></textarea>
			</div>
			<hr>
			<h2 id="presenters">Előadók</h2>
			<template v-for="(presenter, i) in localConfig.presenters">
				<fieldset :key="i+'presenter'">
					<div class="col-group col2-label-text">
						<label :for="'presenter-name-'+i">Előadó neve</label>
						<input type="text" :id="'presenter-name-'+i" placeholder="Előadó neve" v-model="presenter.name" @input="refresh">
					</div>
					<div class="col-group col2-label-text">
						<label :for="'presenter-picture-'+i">Előadó képe</label>
						<input type="text" :id="'presenter-picture-'+i" placeholder="Előadó képe" v-model="presenter.picture" @input="refresh">
					</div>
					<div class="col-group">
						<label :for="'presenter-description-'+i">Előadó leírása</label>
						<textarea :id="'presenter-description-'+i" placeholder="Előadó leírása" v-model="presenter.description" @input="refresh"></textarea>
					</div>
				</fieldset>
				<hr :key="i+'presenter-hr'">
			</template>
			<h2 id="contacts">Elérhetőségek</h2>
			<template v-for="(contact, i) in localConfig.contacts">
				<fieldset :key="i+'contact'">
					<div class="col-group col2-label-text">
						<label :for="'contact-name-'+i">Kontakt neve</label>
						<input type="text" :id="'contact-name-'+i" placeholder="Kontakt neve" v-model="contact.name" @input="refresh">
					</div>
					<div class="col-group col2-label-text">
						<label :for="'contact-picture-'+i">Kontakt képe</label>
						<input type="text" :id="'contact-picture-'+i" placeholder="Kontakt képe" v-model="contact.picture" @input="refresh">
					</div>
					<div class="col-group col2-label-text">
						<label :for="'contact-tel-'+i">Kontakt tel</label>
						<input type="tel" :id="'contact-tel-'+i" placeholder="Kontakt telefonszáma" v-model="contact.tel" @input="refresh">
					</div>
					<div class="col-group col2-label-text">
						<label :for="'contact-email-'+i">Kontakt email</label>
						<input type="email" :id="'contact-email-'+i" placeholder="Kontakt email címe" v-model="contact.email" @input="refresh">
					</div>
				</fieldset>
				<hr :key="i+'contact-hr'">
			</template>
			<h2 id="partners">Partnerek</h2>
			<template v-for="(partner, i) in localConfig.partners">
				<fieldset :key="i+'partner'">
					<div class="col-group col2-label-text">
						<label :for="'partner-name-'+i">Partner neve</label>
						<input type="text" :id="'partner-name-'+i" placeholder="Partner neve" v-model="partner.name" @input="refresh">
					</div>
					<div class="col-group col2-label-text">
						<label :for="'partner-logo-'+i">Partner logo</label>
						<input type="text" :id="'partner-logo-'+i" placeholder="Partner logo" v-model="partner.logo" @input="refresh">
					</div>
					<div class="col-group col2-label-text">
						<label :for="'partner-web-'+i">Partner web</label>
						<input type="tel" :id="'partner-web-'+i" placeholder="Partner web" v-model="partner.website" @input="refresh">
					</div>
				</fieldset>
				<hr :key="i+'partner-hr'">
			</template>
			<h2 id="theme">Téma</h2>
			<div v-for="themeName in Object.keys(localConfig.theme)" :key="themeName+'theme'" class="col-group col2-label-text">
				<label :for="`theme-${themeName}`">{{ themeName }}</label>
				<input :id="`theme-${themeName}`" type="color" v-model="localConfig.theme[themeName]" @input="refresh">
			</div>
			<div><input type="submit" value="Mentés"/></div>
		</form>
	</main>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import IEventConfig from '@/models/IEventConfig'

@Component
export default class AdminPage extends Vue {
	@Prop() eventConfig!: IEventConfig
	// @ts-ignore
	localConfig: IEventConfig
	created() {
		this.cloneEventConfig()
	}
/* 	updated() {
		this.cloneEventConfig()
	} */
	cloneEventConfig() {
		this.localConfig = JSON.parse(JSON.stringify(this.eventConfig))
		// @ts-ignore
		this.localConfig.date = this.eventConfig.date.toISOString().slice(0,16)
	}
	refresh() {
		this.$store.commit('SET_EVENT', this.localConfig)
	}
	save() {
		this.$store.dispatch('fetchService', {
			url: '/api/admin/event',
			method: 'PATCH',
			data: this.localConfig
		})
	}
}
</script>
