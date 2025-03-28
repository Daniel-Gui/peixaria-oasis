<script>
	import Collection from '$lib/Components/Collection/Collection.svelte';

	import { register } from 'swiper/element/bundle';
	register();
</script>

<Collection swiperId="collection-1" customClass="bg-gray-100" />
<Collection swiperId="collection-2" customClass="bg-gray-50" />
