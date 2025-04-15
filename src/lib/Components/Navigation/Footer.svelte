<script lang="ts">
	import { googleMapsUrl, emailUrl, phoneUrl, instagramUrl, facebookUrl } from '$lib/utils/company';
	import { Mail, Phone } from 'lucide-svelte';
	import IconFacebook from '../CustomIcons/IconFacebook.svelte';
	import IconInstagram from '../CustomIcons/IconInstagram.svelte';
	import IconMap from '../CustomIcons/IconMap.svelte';
</script>

<footer>
	<div class="container grid grid-cols-1 gap-6 md:gap-4 py-16 md:grid-cols-4">
		<div class="space-y-2">
			<img class="h-auto w-26 lg:w-32" src="/images/brand/brandcompany.webp" alt="logo-marca" />
			<p>
				Rua Bahia Nº 1491
				<br />
				Monte Castelo
				<br />
				Campo Grande - MS
			</p>
		</div>
		<div class="space-y-2">
			<h3 class="text-lg font-bold">Contato</h3>
			<p class="flex items-center gap-2 hover:underline">
				<Mail class="h-4 w-4" />
				<a href={emailUrl}>peixariaoasis@gmail.com</a>
			</p>
			<p class="flex items-center gap-2 hover:underline">
				<Phone class="h-4 w-4" />
				<a href={phoneUrl}>(67) 9 9991-5087</a>
			</p>
		</div>
		<div class="space-y-2">
			<h3 class="text-lg font-bold">Redes Sociais</h3>
			<p class="flex items-center gap-2 hover:underline"><IconFacebook customClass="size-4" /> <a href={facebookUrl} target="_blank">Facebook</a></p>
			<p class="flex items-center gap-2 hover:underline"><IconInstagram customClass="size-4" /> <a href={instagramUrl} target="_blank">Instagram</a></p>
			<p class="flex items-center gap-2 hover:underline"><IconMap customClass="size-4" /> <a href={googleMapsUrl} target="_blank">Google Maps</a></p>
		</div>
		<div class="space-y-2">
            <img src="/images/security/selo-seguranca-google.webp" alt="selo-seguranca-cloudflare" class="w-auto h-12 rounded-box shadow-sm">
            <img src="/images/security/selo-seguranca-cloudflare.webp" alt="selo-seguranca-cloudflare" class="w-auto h-12 rounded-box shadow-sm">
		</div>
	</div>
	<div class="footer sm:footer-horizontal footer-center bg-base-300 text-base-content p-4">
		<aside>
			<p>Copyright © {new Date().getFullYear()} - Peixaria Oasis. CNPJ: 45223335/0001-07</p>
		</aside>
	</div>
</footer>
