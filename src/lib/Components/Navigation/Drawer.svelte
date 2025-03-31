<script>
	import { X } from 'lucide-svelte';

	let { children, id = 'my-drawer' } = $props();
</script>

<div class="drawer z-10">
	<input {id} type="checkbox" class="drawer-toggle" />
	<div class="drawer-content">
		<!-- Page content here -->
		{@render children()}
	</div>
	<div class="drawer-side">
		<label for={id} aria-label="close sidebar" class="drawer-overlay"></label>
		<div class="bg-base-300 text-base-content min-h-full w-80 p-4">
			<div class="flex justify-end">
				<label for={id} class="btn btn-circle">
					<X class="h-5 w-5" />
				</label>
			</div>
		</div>
	</div>
</div>
