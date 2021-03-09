import Vue from "vue"
import Vuex from "vuex"
import IEventConfig, { EventConfig } from "@/models/IEventConfig"
import IToast from "@/models/IToast"
import IFetchOptions from "@/models/IFetchOptions"

import $router from "../router"

Vue.use(Vuex)

var toastID = 0;

export default new Vuex.Store({
	state: {
		toasts: new Array<IToast>(0),
		event: new EventConfig() as IEventConfig
	},
	mutations: {
		ADD_TOAST(state, toast: IToast) {
			toast.id = toastID++
			state.toasts.push(toast)
		},
		REMOVE_TOAST(state, id) {
			const idx = state.toasts.findIndex(el => el.id === id)
			state.toasts.splice(idx, 1)
		},
		SET_EVENT(state, event: IEventConfig) {
			event.date = new Date(event.date)
			state.event = event
			const root = document.documentElement;
			document.querySelector('meta[name="theme-color"]')?.setAttribute('content', event.theme['background'])
			for(const propName of Object.keys(event.theme)) {
				root.style.setProperty(`--svk-theme-${propName}`, event.theme[propName]);
			}
			root.style.setProperty('--svk-background-image', `url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 800 800'><g stroke-width='1' fill='none' stroke='${event.theme['lines'].replace(/\#/, '%23')}'><path d='M769 229L1037 260.9M927 880L731 737 520 660 309 538 40 599 295 764 126.5 879.5 40 599-197 493 102 382-31 229 126.5 79.5-69-63'></path><path d='M-31 229L237 261 390 382 603 493 308.5 537.5 101.5 381.5M370 905L295 764'></path><path d='M520 660L578 842 731 737 840 599 603 493 520 660 295 764 309 538 390 382 539 269 769 229 577.5 41.5 370 105 295 -36 126.5 79.5 237 261 102 382 40 599 -69 737 127 880'></path><path d='M520-140L578.5 42.5 731-63M603 493L539 269 237 261 370 105M902 382L539 269M390 382L102 382'></path><path d='M-222 42L126.5 79.5 370 105 539 269 577.5 41.5 927 80 769 229 902 382 603 493 731 737M295-36L577.5 41.5M578 842L295 764M40-201L127 80M102 382L-261 269'></path></g></svg>")`)
		}
	},
	actions: {
		async fetchService(
			{ commit },
			{ url, method = "GET", data, exStatus, onSuccess, onError }: IFetchOptions
		): Promise<void> {
			const headers: HeadersInit = new Headers()
			headers.set("Content-Type", "application/json")
			const options: RequestInit = {
				method,													//* GET, POST, PUT, DELETE, PATCH, etc.
				mode: "same-origin",						//* no-cors, *cors, same-origin
				cache: "no-cache",							//* default, no-cache, reload, force-cache, only-if-cached
				credentials: "same-origin",			//* include, *same-origin, omit
				headers,
				redirect: "follow",							//* manual, *follow, error
				referrerPolicy: "no-referrer",	//* no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
			}
			if(data) options.body = JSON.stringify(data)

			const response: void | Response = await fetch(url, options).catch(console.error)

			if(!response) {
				return commit("ADD_TOAST", {
					message: "Nincs kapcsolat a szerverrel.",
					status: 400
				})
			}

			try {
				let resData: any;
				const contentType = response.headers.get("content-type");
				if (contentType?.indexOf("application/json") != -1) {
					resData = await response?.json()
					if(resData?.message) {
						commit("ADD_TOAST", {
							message: resData.message,
							status: response.status
						})
					}
				}

				if (response.status == 403) {
					$router.push({ name: "SignIn" })
					return
				}

				if(!exStatus) return
				if(response.status == exStatus && onSuccess)
					return onSuccess(resData)
				else if(onError)
					return onError(response.status)
			} catch(err) {
				console.error(err)
				if(onError)
					return onError(response.status)
			}
		}
	}
})
