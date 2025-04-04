<script lang="ts">
	// Regras deste componente
	// 1 - Se o preço promocional for maior que 0, exibir o preço promocional, preço normal e badge de desconto
	// 2 - Se o preço promocional for 0, exibir apenas o preço normal e não exibir a badge de desconto
	// 3 - Caso o preço promocional for maior que o preço normal (o que não deveria acontecer), não exibir a badge de desconto

	type PriceProps = {
		promotionalPrice?: string | number;
		price: string | number;
		unit: string;
	};

	let { promotionalPrice = '0.00', price = '0.00', unit = 'Kg' }: PriceProps = $props();

	// Converter para número para comparações
	const priceNum = typeof price === 'string' ? parseFloat(price) : price;
	const promoNum = typeof promotionalPrice === 'string' ? parseFloat(promotionalPrice) : promotionalPrice;
	
	// Função simples para trocar o ponto pela vírgula
	function formatPrice(value: string | number): string {
		if (typeof value === 'string') {
			return value.replace('.', ',');
		}
		return value.toFixed(2).replace('.', ',');
	}
</script>

<div class="flex items-center gap-2">
	{#if promoNum > 0}
		<h3>R$ {formatPrice(promotionalPrice)}/{unit}</h3>
		<h3 class="text-gray-400 line-through">R$ {formatPrice(price)}/{unit}</h3>
		{#if promoNum > 0 && promoNum < priceNum}
			<div class="badge badge-accent badge-xs md:badge-sm">
				-{Math.round(((priceNum - promoNum) / priceNum) * 100)}%
			</div>
		{/if}
	{:else}
		<h3>R$ {formatPrice(price)}/{unit}</h3>
	{/if}
</div>
