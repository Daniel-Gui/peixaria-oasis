<script lang="ts">
	import Dock from "$lib/Components/Navigation/Dock.svelte";
	import Navbar from "$lib/Components/Navigation/Navbar.svelte";
	import ProductInfo from "$lib/Components/ProductInfo/ProductInfo.svelte";
	import type { PageData } from './$types';
	
	export let data: PageData;
	const { product } = data;
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
