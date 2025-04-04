<script lang="ts">
	type BadgesProps = {
		tags?: Array<{ id: number; value: string; color: string }>;
	};

	let { tags = [] }: BadgesProps = $props();

	// Mapeamento de cores do Baserow para classes do DaisyUI
	const colorMap: Record<string, string> = {
		'light-blue': 'primary',
		'blue': 'primary',
		'light-green': 'success',
		'green': 'success',
		'light-orange': 'warning',
		'orange': 'warning',
		'light-red': 'error',
		'red': 'error',
		'light-gray': 'neutral',
		'gray': 'neutral',
		'default': 'secondary'
	};

	function getColorClass(color: string): string {
		return colorMap[color] || 'secondary';
	}
</script>

<div class="flex flex-wrap gap-2">
	{#if tags && tags.length > 0}
		{#each tags as tag (tag.id)}
			<div class="badge badge-soft badge-{getColorClass(tag.color)} badge-xs md:badge-sm">
				{tag.value}
			</div>
		{/each}
	{/if}
</div>
