<script lang="ts">
	import Collection from '$lib/Components/Collection/Collection.svelte';
	import Dock from '$lib/Components/Navigation/Dock.svelte';
	import { register } from 'swiper/element/bundle';
	import type { PageData } from './$types';
	register();

	// Recebendo os dados da API através da função load
	export let data: PageData;
	const { peixesAguaDoce, maisVendidos, salmao } = data;
	//console.log({ peixesAguaDoce, maisVendidos, salmao });
</script>

<Dock />

<!-- Mais Vendidos -->
{#if maisVendidos && maisVendidos.length > 0}
	<Collection
		swiperId="mais-vendidos"
		customClass="bg-white"
		title="Mais Vendidos"
		products={maisVendidos}
	/>
{:else}
	<div class="py-10 text-center">
		<p>Desculpe, não há produtos disponíveis na categoria Mais Vendidos no momento.</p>
	</div>
{/if}

<!-- Peixes de Água Doce -->
{#if peixesAguaDoce && peixesAguaDoce.length > 0}
	<Collection
		swiperId="peixes-agua-doce"
		customClass="bg-gray-100"
		title="Peixes de Água Doce"
		products={peixesAguaDoce}
	/>
{:else}
	<div class="py-10 text-center">
		<p>Desculpe, não há produtos disponíveis na categoria Peixes de Água Doce no momento.</p>
	</div>
{/if}

<!-- Salmão -->
{#if salmao && salmao.length > 0}
	<Collection swiperId="salmao" customClass="bg-gray-100" title="Salmão" products={salmao} />
{:else}
	<div class="py-10 text-center">
		<p>Desculpe, não há produtos disponíveis na categoria Salmão no momento.</p>
	</div>
{/if}
