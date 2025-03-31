<script>
	import Collection from '$lib/Components/Collection/Collection.svelte';
	import Dock from '$lib/Components/Navigation/Dock.svelte';
	import Drawer from '$lib/Components/Navigation/Drawer.svelte';
	import { register } from 'swiper/element/bundle';
	register();
</script>

<Dock />
<Collection swiperId="collection-1" customClass="bg-gray-100" />
<Collection swiperId="collection-2" customClass="bg-gray-50" />
