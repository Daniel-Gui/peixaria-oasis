<script lang="ts">
	import { ShoppingBasket } from 'lucide-svelte';
	import Price from '../ProductCard/Price.svelte';
	import Badges from '../ProductCard/Badges.svelte';

	type ProductInfoProps = {
		title: string;
		description: string;
		price: string | number;
		promotionalPrice?: string | number;
		unit: string;
		tags?: Array<{ id: number; value: string; color: string }>;
		imageUrl?: string;
	};

	let { 
		title = 'Produto', 
		description = '', 
		price = '0.00', 
		promotionalPrice = '0.00', 
		unit = 'Kg',
		tags = [],
		imageUrl = '/images/collections/peixes/produto-placeholder.webp'
	}: ProductInfoProps = $props();
</script>

<section>
	<div class="container grid grid-cols-1 gap-4 py-10 md:grid-cols-2">
		<div class="rounded-lg overflow-hidden">
			<img src={imageUrl} alt={title} class="w-full h-auto object-cover" />
		</div>
		<div class="space-y-4">
			<h1 class="text-3xl font-bold">{title}</h1>
			<Price {promotionalPrice} {price} {unit} />
			<Badges {tags} />
			<div class="py-4">
				<h2 class="text-xl font-semibold mb-2">Descrição</h2>
				<p class="text-gray-700">{description}</p>
			</div>
			<button class="btn btn-success w-full gap-2">
				<span>Comprar</span>
				<ShoppingBasket class="h-5 w-5" />
			</button>
			<p class="text-center text-sm text-gray-500">Você será redirecionado para o WhatsApp</p>
		</div>
	</div>
</section>
