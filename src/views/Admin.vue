<template>
	<div class="admin">
		<CNav>
			<div>
				<RouterLink :to="{name: 'Admin.Registered'}">
					<div class="nav--dot">
						<span class="nav--desc">Regiszrált</span>
					</div>
				</RouterLink>
				<RouterLink :to="{name: 'Admin.Page', hash: '#event'}">
					<div class="nav--dot">
						<span class="nav--desc">Esemény</span>
					</div>
				</RouterLink>
				<RouterLink :to="{name: 'Admin.Page', hash: '#presenters'}">
					<div class="nav--dot">
						<span class="nav--desc">Előadók</span>
					</div>
				</RouterLink>
				<RouterLink :to="{name: 'Admin.Page', hash: '#contacts'}">
					<div class="nav--dot">
						<span class="nav--desc">Elérhetőségek</span>
					</div>
				</RouterLink>
				<RouterLink :to="{name: 'Admin.Page', hash: '#partners'}">
					<div class="nav--dot">
						<span class="nav--desc">Partnerek</span>
					</div>
				</RouterLink>
				<RouterLink :to="{name: 'Admin.Page', hash: '#theme'}">
					<div class="nav--dot">
						<span class="nav--desc">Oldal Téma</span>
					</div>
				</RouterLink>
				<RouterLink :to="{name: 'Home'}">
					<div class="nav--dot">
						<span class="nav--desc">Főoldal</span>
					</div>
				</RouterLink>
				<a @click.prevent="logout">
					<div class="nav--dot">
						<span class="nav--desc">Kijelentkezés</span>
					</div>
				</a>
			</div>
		</CNav>
		<RouterView class="admin-view" :event-config="eventConfig"/>
	</div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import CNav from '@/components/CNav.vue'
import IEventConfig from '@/models/IEventConfig'

@Component({
	components: {
		CNav
	}
})
export default class Admin extends Vue {
	@Prop() eventConfig!: IEventConfig

	logout() {
		this.$store.dispatch("fetchService", {
			url: "/auth/logout",
			exStatus: 200,
			onSuccess: () => this.$router.push({ name: "Home" })
		})
	}
}
</script>

<style lang="scss">
@import "../scss/vars";
.admin-view {
	padding: $default-padding;
	hr {
		margin: $default-padding auto;
	}
}
</style>
