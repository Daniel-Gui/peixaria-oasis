<script>
	import { HomeIcon, MenuIcon, ShoppingBasket } from 'lucide-svelte';
	import Drawer from './Drawer.svelte';
	const sidebarId = 'sidebar';
</script>

<Drawer id={sidebarId}>
	<div class="dock z-10 bg-gray-100 text-gray-500">
		<label for={sidebarId}>
			<MenuIcon class="h-5 w-5" />
			<span class="dock-label">Menu</span>
		</label>

		<button class="dock-active">
			<HomeIcon class="h-5 w-5" />
			<span class="dock-label">Inicio</span>
		</button>

		<button>
			<ShoppingBasket class="h-5 w-5" />
			<span class="dock-label">Minha cesta</span>
		</button>
	</div>
</Drawer>
