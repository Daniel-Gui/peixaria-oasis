<script>
	import { Trash } from 'lucide-svelte';
	let {
		productImage = '/images/collections/peixes/produto-placeholder.webp',
		productName = 'Salmão fresco (com pele)',
		productPrice = '148/Kg'
	} = $props();
</script>

<div class="space-y-4">
	<div>
		<ul class="bg-base-100 rounded-box list">
			<li class="list-row grid grid-cols-7 items-center gap-2">
				<div class="col-span-2">
					<img class="rounded-box size-16" src={productImage} alt="Peixe" />
				</div>
				<div class="col-span-4">
					<h3 class="line-clamp-2 text-xs">{productName}</h3>
					<p class="text-sm">R$ {productPrice}</p>
				</div>
				<div class="col-span-1">
					<button>
						<Trash class="h-5 w-5" />
					</button>
				</div>
			</li>
		</ul>
	</div>
	<div class="space-y-2">
		<button class="btn btn-success w-full">Comprar</button>
		<p class="text-center text-xs tracking-wide opacity-60">
			Você será redirecionado para o whatsapp
		</p>
	</div>
</div>
