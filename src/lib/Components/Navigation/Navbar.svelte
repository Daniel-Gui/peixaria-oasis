<script>
    import { ShoppingBasket } from 'lucide-svelte';
    import { cart } from '$lib/stores/cartStore';
	import Drawer from './Drawer.svelte';

    const menuItems = [
        { id: 4, label: 'Mais Vendidos', href: '/mais-vendidos' },
        { id: 1, label: 'Inicio', href: '/' },
        { id: 2, label: 'Peixes de Água Doce', href: '/peixes-agua-doce' },
        { id: 3, label: 'Salmão', href: '/salmao' },
     
    ];
</script>

<div class="navbar bg-base-100 shadow-sm">
    <div class="navbar-start">

    </div>
    <div class="navbar-center gap-4">
    {#each menuItems as {id, label, href} }
    <a href={href} class="text-sm opacity-70 hover:opacity-100">{label}</a>
    {/each}
   
    </div>
    <div class="navbar-end">
        <label for="cart" class="relative">
            <ShoppingBasket class="h-5 w-5" />
            {#if $cart.length > 0}
                <span class="badge badge-sm badge-primary absolute -top-2 -right-2">{$cart.length}</span>
            {/if}
        </label>
    </div>
  </div>

  <Drawer id="cart" type="cart" />
