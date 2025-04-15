<script lang="ts">
	import LoadingBar from '$lib/Components/LoadingBar/LoadingBar.svelte';
	import Footer from '$lib/Components/Navigation/Footer.svelte';
	import Navbar from '$lib/Components/Navigation/Navbar.svelte';
	import '../app.css';

	let { children } = $props();
</script>

<LoadingBar />
<Navbar />
{@render children()}
<Footer />
