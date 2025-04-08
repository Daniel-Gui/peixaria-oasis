<script lang="ts">
    // Usando $state para gerenciar o estado do formulário
    let formData = $state({
        paymentMethod: 'PIX',
        deliveryType: 'pickup',
        address: {
            street: '',
            number: '',
            neighborhood: '',
            complement: ''
        }
    });

    // Opções de pagamento
    const paymentOptions = [
        { value: 'PIX', label: 'PIX' },
        { value: 'credit_card_link', label: 'Cartão de crédito via link' },
        { value: 'credit_card_machine', label: 'Cartão de crédito via maquininha' },
        { value: 'debit_card_machine', label: 'Cartão de débito via maquininha' },
        { value: 'cash', label: 'Dinheiro' }
    ];

    // Função para atualizar a mensagem do WhatsApp com as informações do formulário
    function getFormData() {
        return formData;
    }

    // Exportando a função para ser acessada pelo componente pai
    export { getFormData };
</script>

<div class="space-y-4 p-2 bg-base-100 rounded-box">
    <h3 class="font-semibold text-sm">Informações adicionais</h3>
    
    <!-- Método de pagamento -->
    <div class="form-control w-full">
        <label for="payment-method" class="label">
            <span class="label-text text-xs">Método de pagamento</span>
        </label>
        <select 
            id="payment-method"
            class="select select-bordered select-sm w-full" 
            bind:value={formData.paymentMethod}
        >
            {#each paymentOptions as option}
                <option value={option.value}>{option.label}</option>
            {/each}
        </select>
    </div>
    
    <!-- Tipo de entrega -->
    <div class="form-control w-full">
        <span class="label-text text-xs mb-2">Forma de recebimento</span>
        <div class="flex gap-2">
            <label for="pickup" class="label cursor-pointer justify-start gap-2">
                <input 
                    id="pickup"
                    type="radio" 
                    name="deliveryType" 
                    class="radio radio-sm radio-primary" 
                    value="pickup" 
                    bind:group={formData.deliveryType}
                />
                <span class="label-text">Retirar na loja</span>
            </label>
            <label for="delivery" class="label cursor-pointer justify-start gap-2">
                <input 
                    id="delivery"
                    type="radio" 
                    name="deliveryType" 
                    class="radio radio-sm radio-primary" 
                    value="delivery" 
                    bind:group={formData.deliveryType}
                />
                <span class="label-text">Entrega</span>
            </label>
        </div>
    </div>
    
    <!-- Endereço da loja (se for retirada) -->
    {#if formData.deliveryType === 'pickup'}
        <div class="bg-base-200 p-3 rounded-box text-xs space-y-1">
            <p class="font-semibold">Endereço para retirada:</p>
            <p>Rua Bahia nº 1491, entre as ruas Eduardo Santos Pereira e Pernambuco. Lado esquerdo da rua.</p>
            <p>Monte Castelo.</p>
            <p class="italic">Campo Grande - MS</p>
            <p class="font-semibold text-success">*Temos estacionamento*</p>
            <a 
                href="https://maps.app.goo.gl/FrG3fcqxkYrgSR5v9" 
                target="_blank" 
                rel="noopener noreferrer"
                class="btn btn-xs btn-outline mt-2 w-full"
            >
                Ver no Google Maps
            </a>
        </div>
    {/if}
    
    <!-- Campos de endereço (se for entrega) -->
    {#if formData.deliveryType === 'delivery'}
        <div class="space-y-2">
            <div class="form-control w-full">
                <label for="street" class="label">
                    <span class="label-text text-xs">Rua</span>
                </label>
                <input 
                    id="street"
                    type="text" 
                    placeholder="Nome da rua" 
                    class="input input-bordered input-sm w-full" 
                    bind:value={formData.address.street}
                />
            </div>
            
            <div class="form-control w-full">
                <label for="number" class="label">
                    <span class="label-text text-xs">Número</span>
                </label>
                <input 
                    id="number"
                    type="text" 
                    placeholder="Número" 
                    class="input input-bordered input-sm w-full" 
                    bind:value={formData.address.number}
                />
            </div>
            
            <div class="form-control w-full">
                <label for="neighborhood" class="label">
                    <span class="label-text text-xs">Bairro</span>
                </label>
                <input 
                    id="neighborhood"
                    type="text" 
                    placeholder="Bairro" 
                    class="input input-bordered input-sm w-full" 
                    bind:value={formData.address.neighborhood}
                />
            </div>
            
            <div class="form-control w-full">
                <label for="complement" class="label">
                    <span class="label-text text-xs">Complemento (opcional)</span>
                </label>
                <input 
                    id="complement"
                    type="text" 
                    placeholder="Apartamento, bloco, referência..." 
                    class="input input-bordered input-sm w-full" 
                    bind:value={formData.address.complement}
                />
            </div>
        </div>
    {/if}
</div>