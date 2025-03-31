<script lang="ts">
	import { X } from 'lucide-svelte';
	import { draw } from 'svelte/transition';

	type DrawerProps = {
		id: string;
		direction?: string;
	};

	let { id = 'my-drawer', direction = 'start' }: DrawerProps = $props();
</script>

<div class="drawer z-10" class:drawer-end={direction === 'end'}>
	<input {id} type="checkbox" class="drawer-toggle" />

	<div class="drawer-side">
		<label for={id} aria-label="close sidebar" class="drawer-overlay"></label>
		<div class="bg-base-300 text-base-content min-h-full w-80 p-4">
			<div
				class="flex"
				class:justify-end={direction === 'start'}
				class:justify-start={direction === 'end'}
			>
				<label for={id} class="btn btn-circle">
					<X class="h-5 w-5" />
				</label>
			</div>
		</div>
	</div>
</div>
