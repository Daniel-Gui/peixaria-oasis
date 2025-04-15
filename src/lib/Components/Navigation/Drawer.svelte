<script lang="ts">
	import { X } from 'lucide-svelte';
	import ProductList from '../ShoppingCart/ProductList.svelte';
	import Categories from './Categories.svelte';
	import { page } from '$app/stores';
	import { onMount, onDestroy } from 'svelte';

	type DrawerProps = {
		id: string;
		type?: string;
	};

	let { id = 'my-drawer', type = 'sidebar' }: DrawerProps = $props();
	let drawerCheckbox: HTMLInputElement;
	let currentPath: string;
	
	// Função para fechar a sidebar
	function closeDrawer() {
		if (drawerCheckbox && drawerCheckbox.checked) {
			drawerCheckbox.checked = false;
		}
	}
	
	// Monitorar mudanças de rota para fechar a sidebar
	$effect(() => {
		if (type === 'sidebar' && $page.url.pathname !== currentPath) {
			currentPath = $page.url.pathname;
			closeDrawer();
		}
	})
	
	// Inicializar o caminho atual
	onMount(() => {
		currentPath = $page.url.pathname;
	});
</script>

<div class="drawer z-10" class:drawer-end={type === 'cart'}>
	<input {id} type="checkbox" class="drawer-toggle" bind:this={drawerCheckbox} />

	<div class="drawer-side">
		<label for={id} aria-label="close sidebar" class="drawer-overlay"></label>
		<div class="bg-base-300 text-base-content min-h-full {type === 'cart' ? 'w-80 lg:w-[500px]' : 'w-80'} space-y-4 p-4">
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
				{#if type === 'sidebar'}
					<Categories />
				{/if}
			</div>
		</div>
	</div>
</div>
