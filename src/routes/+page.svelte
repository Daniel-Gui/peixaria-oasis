<script lang="ts">
	import Collection from '$lib/Components/Collection/Collection.svelte';
	import { register } from 'swiper/element/bundle';
	register();

	// Recebendo os dados da API através da função load usando $props
	let { data } = $props();
	
	// Usando $derived para extrair os dados de produtos
	const peixesAguaDoce = $derived(data.peixesAguaDoce);
	const maisVendidos = $derived(data.maisVendidos);
	const salmao = $derived(data.salmao);
	const camarao = $derived(data.camarao);
	
	// Usando $derived para verificar se as coleções têm produtos
	const temPeixesAguaDoce = $derived(peixesAguaDoce && peixesAguaDoce.length > 0);
	const temMaisVendidos = $derived(maisVendidos && maisVendidos.length > 0);
	const temSalmao = $derived(salmao && salmao.length > 0);
	const temCamarao = $derived(camarao && camarao.length > 0);
	
	// Usando $effect para registrar quando a página é carregada
	$effect(() => {
		console.log('Página inicial carregada');
		console.log(`Total de produtos carregados: ${(peixesAguaDoce?.length || 0) + (maisVendidos?.length || 0) + (salmao?.length || 0) + (camarao?.length || 0)}`);
	});
</script>



<!--<Dock />-->

<!-- Mais Vendidos -->
{#if temMaisVendidos}
	<Collection
		swiperId="mais-vendidos"
		customClass="bg-white"
		title="Mais Vendidos"
		products={maisVendidos}
	/>
{:else}
	<div class="py-10 text-center container">
		<p>Desculpe, não há produtos disponíveis na categoria Mais Vendidos no momento.</p>
	</div>
{/if}

<!-- Peixes de Água Doce -->
{#if temPeixesAguaDoce}
	<Collection
		swiperId="peixes-agua-doce"
		customClass="bg-gray-100"
		title="Peixes de Água Doce"
		products={peixesAguaDoce}
	/>
{:else}
	<div class="py-10 text-center container">
		<p>Desculpe, não há produtos disponíveis na categoria Peixes de Água Doce no momento.</p>
	</div>
{/if}

<!-- Salmão -->
{#if temSalmao}
	<Collection swiperId="salmao" customClass="bg-gray-100" title="Salmão" products={salmao} />
{:else}
	<div class="py-10 text-center container">
		<p>Desculpe, não há produtos disponíveis na categoria Salmão no momento.</p>
	</div>
{/if}

<!-- Camarão -->
{#if temCamarao}
	<Collection swiperId="camarao" customClass="bg-gray-100" title="Camarão" products={camarao} />
{:else}
	<div class="py-10 text-center container">
		<p>Desculpe, não há produtos disponíveis na categoria Camarão no momento.</p>
	</div>
{/if}


