<script lang="ts">
	import IconWhatsapp from '../CustomIcons/IconWhatsapp.svelte';
	import IconFacebook from '../CustomIcons/IconFacebook.svelte';
	import IconInstagram from '../CustomIcons/IconInstagram.svelte';
	import IconEmail from '../CustomIcons/IconEmail.svelte';
	import IconMap from '../CustomIcons/IconMap.svelte';
	import { page } from '$app/stores';

	// URLs para contato
	const googleMapsUrl: string = 'https://maps.app.goo.gl/FrG3fcqxkYrgSR5v9';
	const emailUrl: string = 'mailto:peixariaoasis@gmail.com';
	const whatsappUrl: string = 'https://wa.me/5567999915087';
	
	// Categorias de produtos
	const categories = [
		{
			name: 'Mais vendidos',
			slug: 'mais-vendidos'
		},
		{
			name: 'Peixes de água doce',
			slug: 'peixes-agua-doce'
		},
		{
			name: 'Salmão',
			slug: 'salmao'
		}
	];
	
	// Verifica qual categoria está atualmente selecionada usando $derived
	const currentSlug = $derived($page.params.slug);
	
	// Redes sociais
	const socials = [
		{
			name: 'Instagram',
			url: '/',
			icon: IconInstagram
		},
		{
			name: 'Facebook',
			url: '/',
			icon: IconFacebook
		},
	];
</script>

<ul class="menu w-full">
	<!-- Categorias -->
	<li><h2 class="menu-title">Categorias</h2></li>
	{#each categories as category}
		<li>
			<a 
				href="/categoria/{category.slug}" 
				class="{currentSlug === category.slug ? 'active font-semibold bg-primary/10 text-primary' : ''}"
			>
				{category.name}
			</a>
		</li>
	{/each}

	<!-- Redes Sociais -->
	<li><h2 class="menu-title">Redes sociais</h2></li>
	{#each socials as social}
	<li>
		<a href={social.url} target="_blank">  
			{#if social.icon === IconInstagram}
			<IconInstagram customClass="size-4" />
			{:else if social.icon === IconFacebook}
			<IconFacebook customClass="size-4" />
			{/if}
			<span>{social.name}</span>
		</a>
	</li>
	{/each}

	<!-- Suporte -->
	<li><h2 class="menu-title">Suporte</h2></li>
	<li>
		<a href={whatsappUrl} target="_blank"> <IconWhatsapp customClass="size-4" /> <span>WhatsApp</span></a>
	</li>
	<li><a href={emailUrl} target="_blank" rel="noopener noreferrer"> <IconEmail customClass="size-4" /> <span>Email</span></a></li>
	<li>
		<a href={googleMapsUrl} target="_blank">
			<IconMap customClass="size-4" /> <span>Localização</span></a
		>
	</li>
</ul>
