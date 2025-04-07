<script lang="ts">
    import { MenuIcon, ShoppingBasket } from 'lucide-svelte';
    import Drawer from './Drawer.svelte';
    import { cart } from '$lib/stores/cartStore';
</script>

<nav class="shadow-sm">
    <div class="container flex items-center justify-between py-5">
        <div>
            <label for="sidebar" class="cursor-pointer">
                <MenuIcon class="h-7 w-7" />
            </label>
        </div>
        <div>
            <a href="/">
                <img class="w-26 lg:w-32 h-auto" src="/images/brand/brandcompany.webp" alt="logo-marca">
            </a>
        </div>
        <div>
            <label for="cart" class="indicator cursor-pointer">
                {#if $cart.length > 0}
                    <span class="indicator-item badge badge-sm badge-primary">{$cart.length}</span>
                {/if}
                <ShoppingBasket class="h-7 w-7" />
            </label>
        </div>
    </div>
</nav>

  
<Drawer id="sidebar" type="sidebar" />
<Drawer id="cart" type="cart" />