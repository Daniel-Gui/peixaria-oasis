<script lang="ts">
    import { MenuIcon, ShoppingBasket } from 'lucide-svelte';
    import Drawer from './Drawer.svelte';
    import { cart } from '$lib/stores/cartStore';
    
    let isScrolled = $state(false);
    let navbar = $state<HTMLElement | null>(null);
    
    $effect(() => {
        const handleScroll = () => {
            isScrolled = window.scrollY > 50; // Aumentado para 50px para não ativar muito cedo
        };
        
        window.addEventListener('scroll', handleScroll);
        
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    });
</script>

<div>
<nav 
    bind:this={navbar}
    class="transition-all duration-100 z-10 w-full {isScrolled ? 'fixed top-0 bg-white shadow-lg translate-y-0' : 'shadow-sm relative'}">
    <div class="container flex items-center justify-between py-5 transition-all duration-300">
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

{#if isScrolled}
    <!-- Espaçador para evitar salto de conteúdo quando a navbar fica fixa -->
    <div class="h-[73px] transition-all duration-300"></div>
{/if}

<Drawer id="sidebar" type="sidebar" />
<Drawer id="cart" type="cart" />
</div>