<script>
	import { ShoppingBasket } from 'lucide-svelte';
	import Price from './Price.svelte';
	import Badges from './Badges.svelte';
	import Image from './Image.svelte';
</script>

<div class="card bg-base-100 w-auto shadow-sm">
	<Image />
	<div class="card-body">
		<h2 class="card-title">Titulo do Produto</h2>
		<Price promotionalPrice={100} price={148} unit="Kg" />
		<Badges />
		<p class="line-clamp-3 text-xs opacity-70">
			A card component has a figure, a body part, and inside body there are title and actions parts
		</p>
		<div class="card-actions">
			<button class="btn btn-primary w-full">
				<span>Adicionar</span>
				<ShoppingBasket class="h-4 w-4" />
			</button>
		</div>
	</div>
</div>
