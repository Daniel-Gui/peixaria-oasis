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
	let isBeginning = $state(true);
	let isEnd = $state(false);
	
	// Usando $derived para valores derivados
	const hasProducts = $derived(products && products.length > 0);
	
	// Importando onMount para garantir que o código seja executado após a montagem do DOM
	import { onMount, onDestroy } from 'svelte';
	
	// Função para inicializar o Swiper
	function initializeSwiper() {
		// Aguarda um momento para garantir que o DOM está pronto
		setTimeout(() => {
			const swiperEl = document.querySelector(`#${swiperId}`) as HTMLElement & { initialize?: () => void, swiper?: any };
			
			if (!swiperEl) {
				console.warn(`Elemento Swiper #${swiperId} não encontrado`);
				return;
			}
			
			// Se já existe uma instância do Swiper e estamos reinicializando, destrua-a
			if (swiperEl.swiper) {
				console.log(`Reinicializando Swiper para coleção ${title}`);
				swiperEl.swiper.destroy(true, true);
			}

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
					init(swiperInstance: any) {
						swiper = swiperInstance;
						// Inicializa os estados dos botões
						isBeginning = swiper.isBeginning;
						isEnd = swiper.isEnd;
						console.log(`Coleção ${title} inicializada com ${products.length} produtos`);
					},
					slideChange(swiperInstance: any) {
						// Atualiza os estados dos botões quando os slides mudam
						isBeginning = swiperInstance.isBeginning;
						isEnd = swiperInstance.isEnd;
					}
				}
			};

			Object.assign(swiperEl, swiperParams);
			
			// Verificar se o método initialize existe antes de chamá-lo
			if (typeof swiperEl.initialize === 'function') {
				swiperEl.initialize();
			}
		}, 100); // Pequeno delay para garantir que o DOM está pronto
	}
	
	// Usando $effect para monitorar mudanças nos produtos
	$effect(() => {
		// Reinicializa o Swiper quando os produtos mudam
		if (products.length > 0) {
			initializeSwiper();
		}
	});
	
	// Inicializa o Swiper quando o componente é montado
	onMount(() => {
		// Inicializa o Swiper após um pequeno delay para garantir que o DOM está pronto
		const initTimer = setTimeout(initializeSwiper, 100);
		
		// Adiciona um evento para reinicializar o Swiper quando a página é revisitada
		window.addEventListener('focus', initializeSwiper);
		
		// Adiciona um evento para reinicializar o Swiper quando a janela é redimensionada
		window.addEventListener('resize', initializeSwiper);
		
		// Limpeza ao desmontar o componente
		return () => {
			clearTimeout(initTimer);
			window.removeEventListener('focus', initializeSwiper);
			window.removeEventListener('resize', initializeSwiper);
			
			// Tenta destruir a instância do Swiper ao desmontar o componente
			try {
				const swiperEl = document.querySelector(`#${swiperId}`) as HTMLElement & { swiper?: any };
				if (swiperEl && swiperEl.swiper) {
					swiperEl.swiper.destroy(true, true);
				}
			} catch (error) {
				console.warn('Erro ao destruir Swiper:', error);
			}
		};
	});

	// Funções para navegar entre os slides
	function slideNext() {
		if (swiper) {
			swiper.slideNext();
			// Atualiza os estados após a navegação
			isBeginning = swiper.isBeginning;
			isEnd = swiper.isEnd;
		}
	}

	function slidePrev() {
		if (swiper) {
			swiper.slidePrev();
			// Atualiza os estados após a navegação
			isBeginning = swiper.isBeginning;
			isEnd = swiper.isEnd;
		}
	}
</script>

<section class="{customClass} space-y-4 lg:space-y-6 py-10">
	<div class="container flex items-center justify-between">
		<h2 class="text-xl md:text-2xl lg:text-3xl font-semibold">{title}</h2>
		<div class="space-x-2">
			<button onclick={slidePrev} class="btn btn-circle rounded-full {isBeginning ? 'btn-disabled' : ''}">
				<ChevronLeft class="h-5 w-5" />
			</button>
			<button onclick={slideNext} class="btn btn-circle rounded-full {isEnd ? 'btn-disabled' : ''}">
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
