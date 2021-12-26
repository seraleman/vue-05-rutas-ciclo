import { createRouter, createWebHashHistory } from 'vue-router'

import NoPageFound from '../modules/shared/pages/NoPageFound'

const routes = [
	{
		path: '/pokemon',
		name: 'pokemon',
		component: () =>
			import(
				/* webpackChunkName= "PokemonLayout" */ '@/modules/pokemon/layouts/PokemonLayout.vue'
			),
		children: [
			{
				path: 'home',
				name: 'pokemon-home',
				component: () =>
					import(
						/* webpackChunkName: "PokemonListPage" */ '@/modules/pokemon/pages/ListPage'
					),
			},
			{
				path: 'about',
				name: 'pokemon-about',
				component: () =>
					import(
						/* webpackChunkName: "PokemonAboutPage" */ '@/modules/pokemon/pages/AboutPage'
					),
			},
			{
				path: 'id/:pokemonId',
				name: 'pokemon-id',
				component: () =>
					import(
						/* webpackChunkName: "PokemonId" */ '@/modules/pokemon/pages/PokemonPage'
					),
				props: (route) => {
					const pokemonId = Number(route.params.pokemonId)
					return isNaN(pokemonId) ? { pokemonId: 1 } : { pokemonId }
				},
			},
			{
				// Redirección para dar soporte a una url que por algún motivo no se quiera eliminar
				path: '',
				redirect: { name: 'pokemon-about' },
			},
		],
	},
	{
		path: '/dbz',
		name: 'dbz',
		component: () =>
			import(
				/* webpackChunkName= "DBZLayout" */ '@/modules/dbz/layouts/DBZLayout.vue'
			),
		children: [
			{
				path: 'characters',
				name: 'dbz-characters',
				component: () =>
					import(
						/* webpackChunkName= "DBZCharacters" */ '@/modules/dbz/pages/Characters.vue'
					),
			},
			{
				path: 'about',
				name: 'dbz-about',
				component: () =>
					import(
						/* webpackChunkName= "DBZAbout" */ '@/modules/dbz/pages/About.vue'
					),
			},
			{
				path: '',
				redirect: { name: 'dbz-characters' },
			},
		],
	},
	{
		path: '/:pathMatch(.*)*',
		name: 'no-page-found',
		component: () =>
			import(
				/* webpackChunkName: "NoPageFound" */ '@/modules/shared/pages/NoPageFound.vue'
			),
	},
]

const router = createRouter({
	history: createWebHashHistory(),
	routes,
})

// Guard Global - Sincronco

export default router
