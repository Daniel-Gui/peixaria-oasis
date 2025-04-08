<script>
    const faqs = [
        {
            title: 'Como funciona a pesagem dos produtos?',
            content: 'Os produtos vendidos por quilo são pesados no momento da separação do pedido e podem ter uma variação para mais ou para menos referente à quantidade solicitada. O valor total exato será confirmado via WhatsApp após a pesagem do(s) produto(s). O valor mostrado no carrinho é somente uma estimativa baseada na quantidade selecionada.'
        },
        {
            title: 'Como funciona a entrega?',
            content: 'Após finalizar seu pedido, O valor do frete será calculado com base na sua localização e informado durante a conversa. Você também pode optar por retirar seu pedido diretamente em nossa loja.'
        }
    ];
</script>

<div class="w-full">
    {#each faqs as faq, index}
    <div class="collapse collapse-arrow bg-base-100 border border-base-300 mb-1">
      <input type="radio" name="cart-accordion" checked={index === 0} />
      <div class="collapse-title text-sm font-semibold">{faq.title}</div>
      <div class="collapse-content text-xs">
        <p>{faq.content}</p>
      </div>
    </div>
    {/each}
</div>