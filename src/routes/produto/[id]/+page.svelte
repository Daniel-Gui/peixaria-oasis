<script lang="ts">
	import ProductInfo from "$lib/Components/ProductInfo/ProductInfo.svelte";
	import { fade } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';
	
	// Usando $props para receber os dados da página
	let { data } = $props();
	
	// Usando $derived para extrair o produto dos dados
	const product = $derived(data.product);
	
	// Usando $effect para registrar quando o produto é visualizado
	$effect(() => {
		console.log(`Visualizando produto: ${product.Nome} (ID: ${product.id})`);
	});
</script>

<svelte:head>
	<title>Peixaria Oasis - {product.Nome}</title>
	<meta name="description" content="{product.Descrição ? product.Descrição.slice(0, 160) : 'Produto da Peixaria Oasis'}" />
	<meta name="robots" content="index, follow" />
</svelte:head>

<div 
	in:fade={{ duration: 300, delay: 150, easing: cubicOut }}
	out:fade={{ duration: 150, easing: cubicOut }}
>
	<ProductInfo 
	title={product.Nome}
	description={product.Descrição}
	price={product.Preço}
	promotionalPrice={product['Preço Promocional']}
	unit={product['Unidade de Medida']}
	tags={product.Tags || []}
	imageUrl={product.Imagem && product.Imagem.length > 0 ? product.Imagem[0].url : undefined}
/>
</div>
