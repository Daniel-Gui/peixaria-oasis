<script lang="ts">
	import { ShoppingBasket } from 'lucide-svelte';
	import Price from './Price.svelte';
	import Badges from './Badges.svelte';
	import Image from './Image.svelte';
	import { cart } from '$lib/stores/cartStore';
	import { toast } from '$lib/utils/toast';

	type ProductCardProps = {
		id: number; // Adicionado ID do produto
		title: string;
		description: string;
		price: string | number;
		promotionalPrice?: string | number;
		unit: string;
		tags?: Array<{ id: number; value: string; color: string }>;
		imageUrl?: string;
	};

	let { 
		id = 0, // Valor padrão para o ID
		title = 'Produto', 
		description = '', 
		price = '0.00', 
		promotionalPrice = '0.00', 
		unit = 'Kg',
		tags = [],
		imageUrl = '/images/collections/peixes/produto-placeholder.webp'
	}: ProductCardProps = $props();
	
	// Função para adicionar o produto ao carrinho
	function addToCart(event: Event) {
		event.preventDefault();
		
		// Verificar se o produto já está no carrinho
		if (cart.hasItem(id)) {
			// Notificar o usuário que o produto já está no carrinho
			toast.info(`${title} já está no seu carrinho!`);
			return;
		}
		
		// Adicionar o produto ao carrinho
		const added = cart.addItem({
			id,
			name: title,
			price,
			promotionalPrice,
			unit,
			imageUrl
		});
		
		// Notificar o usuário
		if (added) {
			toast.success(`${title} adicionado ao carrinho!`);
		}
	}
</script>

<a href="/produto/{id}">
	<div class="card bg-base-100 w-auto shadow-sm">
		<Image src={imageUrl} alt={title} />
		<div class="card-body">
			<h2 class="card-title">{title}</h2>
			<Price {promotionalPrice} {price} {unit} />
			<Badges {tags} />
			<p class="line-clamp-3 text-xs opacity-70">
				{description}
			</p>
			<div class="card-actions">
				<button class="btn btn-primary w-full" onclick={(e) => { e.preventDefault(); addToCart(e); }}>
					<span>Adicionar</span>
					<ShoppingBasket class="h-4 w-4" />
				</button>
			</div>
		</div>
	</div>
</a>

