<script lang="ts">
	import { X } from 'lucide-svelte';
	import ProductList from '../ShoppingCart/ProductList.svelte';

	type DrawerProps = {
		id: string;
		type?: string;
	};

	let { id = 'my-drawer', type = 'sidebar' }: DrawerProps = $props();
</script>

<div class="drawer z-10" class:drawer-end={type === 'cart'}>
	<input {id} type="checkbox" class="drawer-toggle" />

	<div class="drawer-side">
		<label for={id} aria-label="close sidebar" class="drawer-overlay"></label>
		<div class="bg-base-300 text-base-content min-h-full w-80 space-y-4 p-4">
			<div
				class="flex"
				class:justify-end={type === 'sidebar'}
				class:justify-start={type === 'cart'}
			>
				<label for={id} class="btn btn-circle">
					<X class="h-5 w-5" />
				</label>
			</div>
			<div>
				{#if type === 'cart'}
					<ProductList />
				{/if}
			</div>
		</div>
	</div>
</div>
