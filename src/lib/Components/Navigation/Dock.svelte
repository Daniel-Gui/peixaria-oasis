<script>
	import { HomeIcon, MenuIcon, ShoppingBasket } from 'lucide-svelte';
	import Drawer from './Drawer.svelte';
	import { cart } from '$lib/stores/cartStore';
</script>

<div class="dock z-10 bg-gray-100 text-gray-500 lg:hidden">
	<label for="sidebar">
		<MenuIcon class="h-5 w-5" />
		<span class="dock-label">Menu</span>
	</label>

	<a class="dock-active" href="/">
		<HomeIcon class="h-5 w-5" />
		<span class="dock-label">Inicio</span>
	</a>

	<label for="cart" class="relative">
		<ShoppingBasket class="h-5 w-5" />
		{#if $cart.length > 0}
			<span class="badge badge-sm badge-primary absolute -top-2 -right-2">{$cart.length}</span>
		{/if}
		<span class="dock-label">Minha cesta</span>
	</label>
</div>

<Drawer id="sidebar" type="sidebar" />
<Drawer id="cart" type="cart" />
