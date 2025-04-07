<script lang="ts">
	import { Trash, Plus, Minus } from 'lucide-svelte';
	import { cart } from '$lib/stores/cartStore';
	import CartInformation from './CartInformation.svelte';
	import IconWhatsapp from '../CustomIcons/IconWhatsapp.svelte';
	
	// Função para formatar o preço
	function formatPrice(value: string | number): string {
		if (typeof value === 'string') {
			return value.replace('.', ',');
		}
		return value.toFixed(2).replace('.', ',');
	}

	// Função para remover um item do carrinho
	function removeFromCart(id: number) {
		cart.removeItem(id);
	}

	// Função para calcular o preço total do carrinho
	function calculateTotal() {
		const total = $cart.reduce((sum, item) => {
			const price = item.promotionalPrice && parseFloat(String(item.promotionalPrice)) > 0 
				? parseFloat(String(item.promotionalPrice)) 
				: parseFloat(String(item.price));
			return sum + (price * item.quantity);
		}, 0);
		return formatPrice(total);
	}
	
	// Função para aumentar a quantidade de um item
	function increaseQuantity(id: number) {
		cart.addItem({ id } as any);
	}
	
	// Função para diminuir a quantidade de um item
	function decreaseQuantity(id: number) {
		cart.decreaseQuantity(id);
	}

	// Função para gerar mensagem de WhatsApp
	function generateWhatsAppMessage() {
		const phoneNumber = '5567999915087'; // Substitua pelo número correto
		let message = 'Olá! Gostaria de fazer o seguinte pedido:\n';
		
		$cart.forEach((item: any) => {
			const price = item.promotionalPrice && parseFloat(String(item.promotionalPrice)) > 0 
				? formatPrice(item.promotionalPrice) 
				: formatPrice(item.price);
			message += `- ${item.quantity}x ${item.name}: R$ ${price}/${item.unit}\n`;
		});
		
		message += `\nTotal estimado: R$ ${calculateTotal()}`;
		
		return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
	}
</script>

<div class="space-y-4">
	{#if $cart.length > 0}
		<div>
			<ul class="bg-base-100 rounded-box list space-y-2">
				{#each $cart as item (item.id)}
					<li class="list-row grid grid-cols-8 items-center gap-2 p-2">
						<div class="col-span-2">
							<img class="rounded-box size-16 object-cover" src={item.imageUrl || '/images/collections/peixes/produto-placeholder.webp'} alt={item.name} />
						</div>
						<div class="col-span-5">
							<h3 class="line-clamp-2 text-xs">{item.name}</h3>
							<p class="text-sm">
								{#if item.promotionalPrice && parseFloat(String(item.promotionalPrice)) > 0}
									R$ {formatPrice(item.promotionalPrice)}/{item.unit}
								{:else}
									R$ {formatPrice(item.price)}/{item.unit}
								{/if}
							</p>
							<div class="join">
								<button onclick={() => decreaseQuantity(item.id)} class="btn btn-xs join-item">
									<Minus class="h-3 w-3" />
								</button>
								<span class="join-item px-2 flex items-center justify-center bg-base-200 min-w-8">{item.quantity}</span>
								<button onclick={() => increaseQuantity(item.id)} class="btn btn-xs join-item">
									<Plus class="h-3 w-3" />
								</button>
							</div>
						</div>
						
						<div class="col-span-1">
							<button onclick={() => removeFromCart(item.id)} class="btn btn-ghost btn-sm p-1">
								<Trash class="h-5 w-5 text-red-500" />
							</button>
						</div>
					</li>
				{/each}
			</ul>
			<div class="mt-4 flex justify-between items-center px-2">
				<span class="font-semibold">Total Estimado:</span>
				<span class="font-bold">R$ {calculateTotal()}</span>
			</div>
		</div>
		<div>
			<CartInformation />
		</div>
		<div class="space-y-2">
			<a href={generateWhatsAppMessage()} target="_blank" rel="noopener noreferrer" class="btn btn-success w-full">
				<span class="text-sm">Comprar</span>
				<IconWhatsapp customClass="size-3" />
			</a>
			<p class="text-center text-xs tracking-wide opacity-60">
				Você será redirecionado para o WhatsApp
			</p>
		</div>
	{:else}
		<div class="py-10 text-center">
			<p>Seu carrinho está vazio</p>
			<a href="/" class="btn btn-primary mt-4">Continuar comprando</a>
		</div>
	{/if}
</div>
