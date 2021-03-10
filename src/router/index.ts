import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import "cookie-store";

Vue.use(VueRouter);

const routeConfig: Array<RouteConfig> = [
	{ path: "/", name: "Home" },
	{ path: "/signin", name: "SignIn" },
	{
		path: "/admin",
		name: "Admin",
		beforeEnter: (to, from, next) => {
			window.cookieStore.get("SVK-STATUS").then((s) => {
				if (s) return next();
				return next({ name: "SignIn" });
			});
		},
		children: [
			{ path: "page", name: "Admin.Page", alias: "" },
			{ path: "registered", name: "Admin.Registered" },
		],
	},
	{ path: "*", redirect: { name: "Home" } },
];

const mapRouteComponents = (route: RouteConfig): RouteConfig => {
	if (route.redirect) return route;
	if (route.children) route.children = route.children.map(mapRouteComponents);
	return {
		...route,
		component: () =>
			import(/* webpackChunkName: "[request]" */ `@/views/${route.name}.vue`),
	};
};

const router = new VueRouter({
	mode: "history",
	base: process.env.BASE_URL,
	routes: routeConfig.map(mapRouteComponents),
	scrollBehavior(to, from, savedPosition) {
		if (to.hash) return { selector: to.hash };
		if (savedPosition) return savedPosition;
		return { x: 0, y: 0 };
	},
});

export default router;
