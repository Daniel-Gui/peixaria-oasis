<script>
    let { collectionName = '' } = $props();
</script>

<section>
    <div class="container py-10 text-center space-y-2 flex flex-col items-center">
        <img src="/images/404/sem-produtos.webp" class="w-32 h-auto" alt="Sem produtos">
        <p class="text-lg text-gray-600   ">Desculpe, não há produtos disponíveis na categoria <span class="font-semibold">{collectionName}</span> no momento.</p>
        <p class="text-gray-600 opacity-70 text-sm">Continue navegando em nossa loja para encontrar mais produtos.</p>
    </div>
</section>