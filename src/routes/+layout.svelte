<script lang="ts">
	import Footer from '$lib/Components/Navigation/Footer.svelte';
	import Navbar from '$lib/Components/Navigation/Navbar.svelte';
	import '../app.css';

	let { children } = $props();
</script>

<Navbar />
{@render children()}
<Footer />
