<script lang="ts">
	import { ShoppingBasket } from 'lucide-svelte';
	import Price from '../ProductCard/Price.svelte';
	import Badges from '../ProductCard/Badges.svelte';
	import { cart } from '$lib/stores/cartStore';
	import { toast } from '$lib/utils/toast';
	import { page } from '$app/stores';

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
	
	// Obter o ID do produto da URL
	const productId = parseInt($page.params.id);
	
	// Função para adicionar o produto ao carrinho
	function addToCart() {
		// Verificar se o produto já está no carrinho
		if (cart.hasItem(productId)) {
			// Notificar o usuário que o produto já está no carrinho
			toast.info(`${title} já está no seu carrinho!`);
			return;
		}
		
		// Adicionar o produto ao carrinho
		const added = cart.addItem({
			id: productId,
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
	
	// Função para gerar mensagem de WhatsApp
	function generateWhatsAppMessage() {
		const phoneNumber = '5511999999999'; // Substitua pelo número correto
		let message = `Olá! Gostaria de comprar o produto: ${title}\n`;
		message += `Preço: R$ ${promotionalPrice && parseFloat(String(promotionalPrice)) > 0 ? promotionalPrice : price}/${unit}\n`;
		
		return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
	}
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
			<div class="grid grid-cols-2 gap-2">
				<button class="btn btn-primary gap-2" onclick={addToCart}>
					<span>Adicionar ao Carrinho</span>
					<ShoppingBasket class="h-5 w-5" />
				</button>
				<a href={generateWhatsAppMessage()} target="_blank" class="btn btn-success gap-2">
					<span>Comprar</span>
					<ShoppingBasket class="h-5 w-5" />
				</a>
			</div>
			<p class="text-center text-sm text-gray-500">Você será redirecionado para o WhatsApp</p>
		</div>
	</div>
</section>
