<script lang="ts">

	import ProductInfo from "$lib/Components/ProductInfo/ProductInfo.svelte";
	
	// Usando $props para receber os dados da página
	let { data } = $props();
	
	// Usando $derived para extrair o produto dos dados
	const product = $derived(data.product);
	
	// Usando $effect para registrar quando o produto é visualizado
	$effect(() => {
		console.log(`Visualizando produto: ${product.Nome} (ID: ${product.id})`);
	});
</script>



<ProductInfo 
	title={product.Nome}
	description={product.Descrição}
	price={product.Preço}
	promotionalPrice={product['Preço Promocional']}
	unit={product['Unidade de Medida']}
	tags={product.Tags || []}
	imageUrl={product.Imagem && product.Imagem.length > 0 ? product.Imagem[0].url : undefined}
/>
