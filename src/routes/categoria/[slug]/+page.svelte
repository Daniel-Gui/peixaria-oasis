<script lang="ts">
	import CompleteCollection from '$lib/Components/Collection/CompleteCollection.svelte';
	import Navbar from '$lib/Components/Navigation/Navbar.svelte';
	import type { PageData } from './$types';
	import { page } from '$app/state';
	
	// Recebendo os dados da API através da função load
	let { data } = $props();
	// Garantimos que data é do tipo PageData na interface TypeScript
	
	// Interface para os produtos mapeados
	interface MappedProduct {
		id: number;
		title: string;
		description: string;
		price: number;
		unit: string;
		imageUrl?: string;
		promotionalPrice?: number;
	}
	
	// Variáveis reativas usando os novos recursos do Svelte 5
	const slug = $derived(page.params.slug);
	const categoryTitle = $derived(data.title || '');
	const mappedProducts = $derived(mapProducts(data.products));
	
	// Efeito para reagir às mudanças de categoria
	$effect(() => {
		// Este código será executado sempre que o slug mudar
		console.log(`Categoria alterada para: ${slug}`);
		console.log(`Total de produtos: ${mappedProducts.length}`);
	});
	
	// Função para mapear os produtos
	function mapProducts(products: any[] = []): MappedProduct[] {
		if (!products || products.length === 0) return [];
		
		return products.map(product => ({
			id: product.id,
			title: product.Nome,
			description: product.Descrição,
			price: parseFloat(product.Preço.replace(',', '.')),
			unit: product['Unidade de Medida'],
			imageUrl: product.Imagem && product.Imagem.length > 0 ? product.Imagem[0].url : undefined,
			promotionalPrice: product['Preço Promocional'] ? parseFloat(product['Preço Promocional'].replace(',', '.')) : undefined
		}));
	}
</script>

<Navbar />

<CompleteCollection title={categoryTitle} products={mappedProducts} />
