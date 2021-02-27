export default interface EventConfig {
	title: string
	bannerURL: string
	shortdesc: string
	longdesc: string
	date: Date | string
	humanDate: string
	regActive: boolean
	presenters: Array<{
		name: string
		picture: string
		description: string
	}>
	contacts: Array<{
		name: string
		picture: string
		tel: string
		email: string
	}>
	partners: Array<{
		name: string
		logo: string
		website: string
	}>
	gallery: Array<{
		name: string
		date: string
		index: string
		images: Array<string>
	}>
	theme: Record<string, string>
}