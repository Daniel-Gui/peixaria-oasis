<script lang="ts">
	import { onMount } from 'svelte';
	import ProductCard from '../ProductCard/ProductCard.svelte';
	import { ChevronLeft, ChevronRight } from 'lucide-svelte';

	type CollectionProps = {
		swiperId: string;
		customClass?: string;
	};
	let { swiperId = 'collection', customClass = 'bg-gray-100' }: CollectionProps = $props();

	let swiper: any;
	onMount(() => {
		// swiper element
		const swiperEl = document.querySelector(`#${swiperId}`);

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
			swiperEl.initialize();
		}
	});

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

<section class="{customClass} space-y-4 py-10">
	<div class="container flex items-center justify-between">
		<h2 class="text-2xl font-semibold">Titulo da coleção</h2>
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
			<swiper-slide class="pb-10">
				<ProductCard />
			</swiper-slide>
			<swiper-slide class="pb-10">
				<ProductCard />
			</swiper-slide>
			<swiper-slide class="pb-10">
				<ProductCard />
			</swiper-slide>
			<swiper-slide class="pb-10">
				<ProductCard />
			</swiper-slide>
			<swiper-slide class="pb-10">
				<ProductCard />
			</swiper-slide>
		</swiper-container>
	</div>
</section>
