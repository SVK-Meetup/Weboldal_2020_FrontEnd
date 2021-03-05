import Contact from "./Contact";
import Partner from "./Partner";
import Presenter from "./Presenter";

export default interface EventConfig {
	title: string
	bannerURL: string
	shortdesc: string
	longdesc: string
	date: Date | string
	humanDate: string
	regActive: boolean
	presenters: Array<Presenter>
	contacts: Array<Contact>
	partners: Array<Partner>
	gallery: Array<{
		name: string
		date: string
		index: string
		images: Array<string>
	}>
	theme: Record<string, string>
}