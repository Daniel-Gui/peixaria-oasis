<script lang="ts">
	import ProductCard from '../ProductCard/ProductCard.svelte';
	import { ChevronLeft, ChevronRight } from 'lucide-svelte';

	// Definindo a interface para os produtos
	interface Product {
	  id: number;
	  Nome: string;
	  Ativo: boolean;
	  Preço: string;
	  'Preço Promocional'?: string; // Campo opcional para preço promocional
	  Descrição: string;
	  'Unidade de Medida': string;
	  Tags: Array<{ id: number; value: string; color: string }>;
	  Imagem: Array<{
	    url: string;
	    thumbnails: {
	      tiny: { url: string; width: number; height: number };
	      small: { url: string; width: number; height: number };
	    };
	    name: string;
	    size: number;
	    mime_type: string;
	    is_image: boolean;
	    image_width: number;
	    image_height: number;
	    uploaded_at: string;
	  }>;
	}

	type CollectionProps = {
		swiperId: string;
		customClass?: string;
		title: string;
		products: Product[];
	};
	
	// Usando $props para receber as propriedades do componente
	let { swiperId = 'collection', customClass = 'bg-gray-100', title = 'Produtos', products = [] }: CollectionProps = $props();

	// Usando $state para variáveis de estado
	let swiper = $state<any>(null);
	
	// Usando $derived para valores derivados
	const hasProducts = $derived(products && products.length > 0);
	
	// Usando $effect para inicializar o swiper após a montagem do componente
	$effect(() => {
		// Este código será executado após a renderização inicial
		// Similar ao onMount, mas com capacidades reativas
		const swiperEl = document.querySelector(`#${swiperId}`) as HTMLElement & { initialize?: () => void };

		// swiper parameters
		const swiperParams = {
			grabCursor: true,
			pagination: {
				enabled: true,
				clickable: true,
				bulletClass: 'swiper-pagination-bullet',
				bulletActiveClass: 'swiper-pagination-bullet-active'
			},
			slidesPerView: 1.2,
			spaceBetween: 10,
			breakpoints: {
				768: {
					slidesPerView: 2.5,
					spaceBetween: 15
				},
				1024: {
					slidesPerView: 3,
					spaceBetween: 15,
					centeredSlides: false
				},
				1440: {
					slidesPerView: 4,
					spaceBetween: 15,
					centeredSlides: false
				}
			},
			on: {
				init() {
					swiper = this;
				}
			}
		};

		if (swiperEl) {
			Object.assign(swiperEl, swiperParams);
			// Verificar se o método initialize existe antes de chamá-lo
			if (typeof swiperEl.initialize === 'function') {
				swiperEl.initialize();
			}
		}
		
		// Registrar quando a coleção é inicializada
		console.log(`Coleção ${title} inicializada com ${products.length} produtos`);
	});

	// Funções para navegar entre os slides
	function slideNext() {
		if (swiper) {
			swiper.slideNext();
		}
	}

	function slidePrev() {
		if (swiper) {
			swiper.slidePrev();
		}
	}
</script>

<section class="{customClass} space-y-4 lg:space-y-6 py-10">
	<div class="container flex items-center justify-between">
		<h2 class="text-xl md:text-2xl lg:text-3xl font-semibold">{title}</h2>
		<div class="space-x-2">
			<button onclick={slidePrev} class="btn btn-circle rounded-full">
				<ChevronLeft class="h-5 w-5" />
			</button>
			<button onclick={slideNext} class="btn btn-circle rounded-full">
				<ChevronRight class="h-5 w-5" />
			</button>
		</div>
	</div>
	<div class="pl-6 md:pl-12 lg:container">
		<swiper-container id={swiperId} init="false">
			{#if hasProducts}
				{#each products as product (product.id)}
					<swiper-slide class="pb-10">
						<ProductCard 
							id={product.id}
							title={product.Nome}
							description={product.Descrição}
							price={product.Preço}
							promotionalPrice={product['Preço Promocional']}
							unit={product['Unidade de Medida']}
							tags={product.Tags || []}
							imageUrl={product.Imagem && product.Imagem.length > 0 ? product.Imagem[0].url : undefined}
						/>
					</swiper-slide>
				{/each}
			{:else}
				<swiper-slide class="pb-10">
					<div class="card bg-base-100 w-auto shadow-sm p-4 flex items-center justify-center">
						<p>Nenhum produto encontrado nesta coleção.</p>
					</div>
				</swiper-slide>
			{/if}
		</swiper-container>
	</div>
</section>
