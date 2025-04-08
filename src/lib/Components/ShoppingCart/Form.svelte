<script lang="ts">
    import { CreditCard, Banknote, Truck, Store, MapPin, Home, Building, User } from 'lucide-svelte';
    import IconPix from '../CustomIcons/IconPix.svelte';

    // Usando $state para gerenciar o estado do formulário
    let formData = $state({
        customerName: '',
        paymentMethod: 'PIX',
        deliveryType: 'pickup',
        address: {
            street: '',
            number: '',
            neighborhood: '',
            complement: ''
        }
    });

    // Opções de pagamento com ícones
    const paymentOptions = [
        { value: 'PIX', label: 'PIX', icon: 'pix' },
        { value: 'credit_card_link', label: 'Cartão de crédito via link', icon: 'credit_card' },
        { value: 'credit_card_machine', label: 'Cartão de crédito via maquininha', icon: 'credit_card' },
        { value: 'debit_card_machine', label: 'Cartão de débito via maquininha', icon: 'credit_card' },
        { value: 'cash', label: 'Dinheiro', icon: 'cash' }
    ];

    // Função para atualizar a mensagem do WhatsApp com as informações do formulário
    function getFormData() {
        // Validar que o nome do cliente foi preenchido
        if (!formData.customerName || formData.customerName.trim() === '') {
            throw new Error('Por favor, informe seu nome completo');
        }
        
        // Se for entrega, validar campos de endereço
        if (formData.deliveryType === 'delivery') {
            if (!formData.address.street || !formData.address.number || !formData.address.neighborhood) {
                throw new Error('Por favor, preencha todos os campos de endereço obrigatórios');
            }
        }
        
        return formData;
    }

    // Exportando a função para ser acessada pelo componente pai
    export { getFormData };
</script>

<div class="space-y-6 p-4 bg-base-100 rounded-box">
    <h3 class="font-semibold text-base">Informações adicionais</h3>
    
    <!-- Nome do cliente com floating label -->
    <div class="form-control w-full space-y-2">
        <label class="floating-label">
            <span class="flex items-center gap-2"> <User class="size-4" /> Nome completo</span>
            <input id="customerName" type="text" placeholder="Seu nome completo" class="input input-md w-full" bind:value={formData.customerName} required />
        </label>
    </div>
    
    <!-- Método de pagamento - Melhorado com ícones -->
    <div class="form-control w-full space-y-2">
        <label for="payment-method" class="label pb-0">
            <span class="label-text font-medium">Método de pagamento</span>
        </label>
        <div class="relative">
            <select 
                id="payment-method"
                class="select select-bordered w-full pl-10" 
                bind:value={formData.paymentMethod}
            >
                {#each paymentOptions as option}
                    <option value={option.value}>{option.label}</option>
                {/each}
            </select>
            <div class="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none text-base-content/70">
                {#if formData.paymentMethod === 'PIX'}
                    <IconPix customClass="size-4" />
                {:else if formData.paymentMethod.includes('credit') || formData.paymentMethod.includes('debit')}
                    <CreditCard class="size-4" />
                {:else if formData.paymentMethod === 'cash'}
                    <Banknote class="size-4" />
                {/if}
            </div>
        </div>
    </div>
    
    <!-- Tipo de entrega - Radios melhorados com ícones -->
    <div class="form-control w-full">
        <label for="delivery-type" class="label pb-0">
            <span class="label-text font-medium">Forma de recebimento</span>
        </label>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-3 mt-2">
            <label class="flex items-center p-3 gap-3 cursor-pointer border rounded-lg hover:bg-base-200 transition-colors {formData.deliveryType === 'pickup' ? 'bg-primary/10' : ''}">
                <input 
                    id="pickup"
                    type="radio" 
                    name="deliveryType" 
                    class="radio radio-primary" 
                    value="pickup" 
                    bind:group={formData.deliveryType}
                    aria-labelledby="delivery-type"
                />
                <Store class="size-5" />
                <span>Retirar na loja</span>
            </label>
            <label class="flex items-center p-3 gap-3 cursor-pointer border rounded-lg hover:bg-base-200 transition-colors {formData.deliveryType === 'delivery' ? 'bg-primary/10' : ''}">
                <input 
                    id="delivery"
                    type="radio" 
                    name="deliveryType" 
                    class="radio radio-primary" 
                    value="delivery" 
                    bind:group={formData.deliveryType}
                    aria-labelledby="delivery-type"
                />
                <Truck class="size-5" />
                <span>Entrega</span>
            </label>
        </div>
    </div>
    
    <!-- Endereço da loja (se for retirada) -->
    {#if formData.deliveryType === 'pickup'}
        <div class="bg-base-200 p-4 rounded-box text-sm space-y-2">
            <div class="flex items-start gap-2">
                <MapPin class="size-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                    <p class="font-semibold">Endereço para retirada:</p>
                    <p>Rua Bahia nº 1491, entre as ruas Eduardo Santos Pereira e Pernambuco. Lado esquerdo da rua.</p>
                    <p>Monte Castelo.</p>
                    <p class="italic">Campo Grande - MS</p>
                    <p class="font-semibold text-success">*Temos estacionamento*</p>
                </div>
            </div>
            <a 
                href="https://maps.app.goo.gl/FrG3fcqxkYrgSR5v9" 
                target="_blank" 
                rel="noopener noreferrer"
                class="btn btn-sm btn-outline mt-2 w-full"
            >
                <MapPin class="size-4 mr-1" />
                Ver no Google Maps
            </a>
        </div>
    {/if}
    
    <!-- Campos de endereço com floating labels (se for entrega) -->
    {#if formData.deliveryType === 'delivery'}
        <div class="space-y-4">
            <!-- Rua com floating label e ícone -->

            <label class="floating-label">
                <span class="flex items-center gap-2"> <MapPin class="size-4" /> Nome da rua</span>
                <input id="street" type="text" placeholder="Nome da rua" class="input input-md w-full" bind:value={formData.address.street} required />
            </label>

            
            <!-- Número com floating label e ícone -->
            <label class="floating-label">
                <span class="flex items-center gap-2"> <Home class="size-4" /> Número</span>
                <input id="number" type="text" placeholder="Número" class="input input-md w-full" bind:value={formData.address.number} required />
            </label>
            
            <!-- Bairro com floating label e ícone -->
            <label class="floating-label">
                <span class="flex items-center gap-2"> <MapPin class="size-4" /> Bairro</span>
                <input id="neighborhood" type="text" placeholder="Bairro" class="input input-md w-full" bind:value={formData.address.neighborhood} required />
            </label>
            
            <!-- Complemento com floating label e ícone -->
            <label class="floating-label">
                <span class="flex items-center gap-2"> <Building class="size-4" /> Complemento (opcional)</span>
                <input id="complement" type="text" placeholder="Apartamento, bloco, referência..." class="input input-md w-full" bind:value={formData.address.complement} />
            </label>
        </div>
    {/if}
</div>