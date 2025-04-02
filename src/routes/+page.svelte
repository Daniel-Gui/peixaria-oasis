<script lang="ts">
	import Collection from '$lib/Components/Collection/Collection.svelte';
	import Dock from '$lib/Components/Navigation/Dock.svelte';
	import { register } from 'swiper/element/bundle';
	import type { PageData } from './$types';
	register();

	// Recebendo os dados da API através da função load
	export let data: PageData;
	const { products } = data;
	console.log(products);
</script>

<Dock />
{#if products && products.length > 0}
	<Collection 
		swiperId="collection-1" 
		customClass="bg-gray-100" 
		title="Peixes de Água Doce" 
		products={products} 
	/>
{:else}
	<div class="py-10 text-center">
		<p>Desculpe, não há produtos disponíveis para esta categoria no momento.</p>
	</div>
{/if}
