<template>
	<main class="admin-registered">
		<h1>Regisztrált: </h1>
		<table>
			<thead>
				<tr>
					<th>#</th>
					<th>Név</th>
					<th>E-mail</th>
					<th>Szervezet</th>
					<th>Referálva</th>
					<th>Törlés</th>
				</tr>
			</thead>
			<tbody id="attendee-list">
					<tr v-for="(attendee, i) in attendees" :key="i+'-attendee'">
						<td>{{ i }}</td>
						<td>{{ attendee.name }}</td>
						<td>{{ attendee.email }}</td>
						<td>{{ attendee.organization }}</td>
						<td :title="attendee.comment">{{ attendee.comment }}</td>
						<td class="td-button" :title="attendee.name">
							<button class="unregister" @click="deleteAttendee(attendee)">⨉</button>
						</td>
					</tr>
			</tbody>
		</table>
		<button @click="purge">Purge</button>
	</main>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import IAttendee from '@/models/IAttendee'

@Component
export default class AdminRegistered extends Vue{
	attendees: Array<IAttendee> = []
	created() {
		this.$store.dispatch('fetchService', {
			url: '/api/admin/attendees',
			exStatus: 200,
			onSuccess: (attendees: Array<IAttendee>) => {
				this.attendees = attendees
			}
		})
	}
	deleteAttendee(attendee: IAttendee) {
		if(confirm(`Biztosan törlöd a(z) ${attendee.name} nevű delikvenst a listáról?`)) {
			this.$store.dispatch('fetchService', {
				url: '/api/admin/attendee',
				method: 'DELETE',
				data: {
					_id: attendee._id
				},
				exStatus: 200,
				onSuccess: () => {
					this.attendees.splice(
						this.attendees.indexOf(attendee),
						1
					)
				}
			})
		}
	}

	purge() {
		if(confirm("Biztosan törlöd az EGÉSZ listát?") && confirm("De tényleg?")) {
			this.$store.dispatch('fetchService', {
				url: '/api/admin/attendees',
				method: 'DELETE',
				exStatus: 200,
				onSuccess: () => this.attendees = []
			})
		}
	}
}
</script>

<style lang="scss">
@import "../scss/vars";
button.unregister {
	padding: 0 10px;
}
</style>
