<template>
	<div v-if="pokemon">
		<h1>Pokemon: #{{ pokemonId }}</h1>
		<img :src="pokemon.sprites.front_default" :alt="pokemon.name" />
	</div>
</template>

<script>
	export default {
		data() {
			return {
				pokemon: null,
			}
		},
		props: {
			pokemonId: {
				type: Number,
				required: true,
			},
		},
		created() {
			this.getPokemon()
		},
		methods: {
			async getPokemon() {
				try {
					const pokemon = await fetch(
						`https://pokeapi.co/api/v2/pokemon/${this.pokemonId}`
					).then((resp) => resp.json())
					this.pokemon = pokemon
				} catch (error) {
					this.$router.push('/')
					console.log('No hay nada que hacer aquí')
				}
			},
		},
		watch: {
			pokemonId() {
				this.getPokemon()
			},
		},
	}
</script>
