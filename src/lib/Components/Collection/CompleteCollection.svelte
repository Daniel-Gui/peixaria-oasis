<script>

	import ProductCard from "../ProductCard/ProductCard.svelte";

	const id = 1;
	const title = 'Salmão';
	const description = 'Salmão';
	const price = 10.00;
	const unit = 'kg';
</script>
<section>
    <div class="container py-10 space-y-6">
        <div class="text-center">
            <h2 class="text-2xl font-bold mb-4">{title}</h2>
        </div>
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <ProductCard id={id} title={title} description={description} price={price} unit={unit} />
            <ProductCard id={id} title={title} description={description} price={price} unit={unit} />
            <ProductCard id={id} title={title} description={description} price={price} unit={unit} />
            <ProductCard id={id} title={title} description={description} price={price} unit={unit} />
        </div>
    </div>
</section>