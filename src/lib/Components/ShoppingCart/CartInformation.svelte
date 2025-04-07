<script>
    const faqs = [
        {
            title: 'Como funciona a pesagem dos produtos?',
            content: 'Nossos produtos são vendidos por quilo e pesados frescos no momento da separação. O valor total exato será confirmado via WhatsApp após a pesagem do produto fresco. O valor mostrado no carrinho é apenas uma estimativa baseada na quantidade selecionada.'
        },
        {
            title: 'Quais são as formas de pagamento disponíveis?',
            content: 'Você pode escolher entre: PIX (enviaremos um link de pagamento), cartão de crédito, cartão de débito ou dinheiro (somente para retirada na loja). A forma de pagamento será confirmada durante nossa conversa no WhatsApp.'
        },
        {
            title: 'Como funciona a entrega?',
            content: 'Após finalizar seu pedido, confirmaremos seu endereço de entrega via WhatsApp. O valor do frete será calculado com base na sua localização e informado durante a conversa. Você também pode optar por retirar seu pedido diretamente em nossa loja.'
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