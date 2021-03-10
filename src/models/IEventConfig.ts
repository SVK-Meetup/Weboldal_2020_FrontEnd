import Contact from "./Contact";
import Partner from "./Partner";
import Presenter from "./Presenter";

export default interface IEventConfig {
	title: string;
	bannerURL: string;
	shortdesc: string;
	longdesc: string;
	date: Date | string;
	humanDate: string;
	regActive: boolean;
	presenters: Array<Presenter>;
	contacts: Array<Contact>;
	partners: Array<Partner>;
	gallery: Array<{
		name: string;
		date: string;
		index: string;
		images: Array<string>;
	}>;
	theme: Record<string, string>;
}

export class EventConfig implements IEventConfig {
	title = "";
	bannerURL = "";
	shortdesc = "";
	longdesc = "";
	date = new Date();
	humanDate = "";
	regActive = false;
	presenters = [];
	contacts = [];
	partners = [];
	gallery = [];
	theme = {
		background: "#000000",
		lines: "#1111111",
		light: "#ffffff",
		accent: "#ffffff",
		text1: "#ffffff",
		text2: "#ffffff",
		link: "#ffffff",
		highlight: "#ffffff",
	};
}
