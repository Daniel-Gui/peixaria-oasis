<script lang="ts">
	import Dock from "$lib/Components/Navigation/Dock.svelte";
	import Navbar from "$lib/Components/Navigation/Navbar.svelte";
	import ProductInfo from "$lib/Components/ProductInfo/ProductInfo.svelte";
	import type { PageData } from './$types';
	
	// Usando $props para receber os dados da página
	let { data } = $props();
	
	// Usando $derived para extrair o produto dos dados
	const product = $derived(data.product);
	
	// Usando $effect para registrar quando o produto é visualizado
	$effect(() => {
		console.log(`Visualizando produto: ${product.Nome} (ID: ${product.id})`);
	});
</script>

<Navbar />
<!--<Dock />-->
<ProductInfo 
	title={product.Nome}
	description={product.Descrição}
	price={product.Preço}
	promotionalPrice={product['Preço Promocional']}
	unit={product['Unidade de Medida']}
	tags={product.Tags || []}
	imageUrl={product.Imagem && product.Imagem.length > 0 ? product.Imagem[0].url : undefined}
/>
