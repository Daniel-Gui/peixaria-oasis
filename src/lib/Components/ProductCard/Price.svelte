<script lang="ts">
	// Regras deste componente
	// 1 - Se o preço promocional for maior que 0, exibir o preço promocional, preço normal e badge de desconto
	// 2 - Se o preço promocional for 0, exibir apenas o preço normal e não exibir a badge de desconto
	// 3 - Caso o preço promocional for maior que o preço normal (o que não deveria acontecer), não exibir a badge de desconto

	type PriceProps = {
		promotionalPrice?: number;
		price: number;
		unit: string;
	};

	let { promotionalPrice = 0, price = 0, unit = 'Kg' }: PriceProps = $props();
</script>

<div class="flex items-center gap-2">
	{#if promotionalPrice > 0}
		<h3>R${promotionalPrice}/{unit}</h3>
		<h3 class="text-gray-400 line-through">R${price}/{unit}</h3>
		{#if promotionalPrice > 0 && promotionalPrice < price}
			<div class="badge badge-accent badge-xs md:badge-sm">
				-{Math.round(((price - promotionalPrice) / price) * 100)}%
			</div>
		{/if}
	{:else}
		<h3>R${price}/{unit}</h3>
	{/if}
</div>
