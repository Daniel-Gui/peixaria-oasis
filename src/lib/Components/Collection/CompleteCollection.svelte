<script lang="ts">
	import ProductCard from "../ProductCard/ProductCard.svelte";

	// Recebe props dinâmicas
	export let title = 'Coleção';
	export let products: Array<{
		id: number;
		title: string;
		description: string;
		price: number;
		unit: string;
		imageUrl?: string;
		promotionalPrice?: number;
	}> = [];
</script>
<section class="bg-base-200">
    <div class="container py-10 space-y-6">
        <div class="text-center">
            <h2 class="text-2xl font-bold mb-4">{title}</h2>
        </div>
        
        {#if products.length > 0}
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {#each products as product (product.id)}
                    <ProductCard 
                        id={product.id} 
                        title={product.title} 
                        description={product.description} 
                        price={product.price} 
                        unit={product.unit} 
                        imageUrl={product.imageUrl} 
                        promotionalPrice={product.promotionalPrice} 
                    />
                {/each}
            </div>
        {:else}
            <div class="py-10 text-center container">
                <p>Desculpe, não há produtos disponíveis nesta categoria no momento.</p>
                <a href="/" class="btn btn-primary mt-4">Voltar para a página inicial</a>
            </div>
        {/if}
    </div>
</section>