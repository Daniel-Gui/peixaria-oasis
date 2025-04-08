<script lang="ts">
    import { CreditCard, Banknote, Truck, Store, MapPin, Home, Building } from 'lucide-svelte';
    import IconPix from '../CustomIcons/IconPix.svelte';

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
        return formData;
    }

    // Função para obter o ícone do método de pagamento selecionado
    function getPaymentIcon(iconType: string) {
        switch(iconType) {
            case 'pix':
                return `<svg class="size-4" viewBox="0 0 512 512" fill="currentColor">
                        <path d="M242.4 292.5C247.8 287.1 257.1 287.1 262.5 292.5L339.5 369.5C351.5 381.5 351.5 401.1 339.5 413.1C327.5 425.1 307.9 425.1 295.9 413.1L242.4 359.6C237.1 354.2 237.1 344.9 242.4 339.5L242.4 292.5zM416 165.8C435.3 165.8 451.8 182.2 451.8 201.6C451.8 221 435.3 237.4 416 237.4C396.6 237.4 380.2 221 380.2 201.6C380.2 182.2 396.6 165.8 416 165.8zM223.6 116.6L302.9 196C314.3 207.4 314.3 225.9 302.9 237.3C291.6 248.7 273.1 248.7 261.7 237.3L223.6 199.2C218.2 193.8 218.2 184.5 223.6 179.1L223.6 116.6zM301.7 98.34C312.1 106.8 312.8 123.2 303.1 132.9C294.2 142.6 277.9 142.1 269.5 131.7C261.1 121.3 261.4 104.9 271.1 96.53C280.7 88.13 297.1 88.52 305.5 97.89L301.7 98.34zM169.7 138.9C184.9 138.9 197.2 151.3 197.2 166.5C197.2 181.7 184.9 194.1 169.7 194.1C154.5 194.1 142.1 181.7 142.1 166.5C142.1 151.3 154.5 138.9 169.7 138.9zM256 0C397.4 0 512 114.6 512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256C0 114.6 114.6 0 256 0z"/>
                    </svg>`;
            case 'credit_card':
                return `<svg class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <rect width="20" height="14" x="2" y="5" rx="2" />
                        <line x1="2" x2="22" y1="10" y2="10" />
                    </svg>`;
            case 'cash':
                return `<svg class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <rect width="20" height="12" x="2" y="6" rx="2" />
                        <circle cx="12" cy="12" r="2" />
                        <path d="M6 12h.01M18 12h.01" />
                    </svg>`;
            default:
                return '';
        }
    }

    // Exportando a função para ser acessada pelo componente pai
    export { getFormData };
</script>

<div class="space-y-6 p-4 bg-base-100 rounded-box">
    <h3 class="font-semibold text-base">Informações adicionais</h3>
    
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
                <input id="street" type="text" placeholder="Nome da rua" class="input input-md w-full" bind:value={formData.address.street} />
            </label>

            
            <!-- Número com floating label e ícone -->
            <label class="floating-label">
                <span class="flex items-center gap-2"> <Home class="size-4" /> Número</span>
                <input id="number" type="text" placeholder="Número" class="input input-md w-full" bind:value={formData.address.number} />
            </label>
            
            <!-- Bairro com floating label e ícone -->
            <label class="floating-label">
                <span class="flex items-center gap-2"> <MapPin class="size-4" /> Bairro</span>
                <input id="neighborhood" type="text" placeholder="Bairro" class="input input-md w-full" bind:value={formData.address.neighborhood} />
            </label>
            
            <!-- Complemento com floating label e ícone -->
            <label class="floating-label">
                <span class="flex items-center gap-2"> <Building class="size-4" /> Complemento (opcional)</span>
                <input id="complement" type="text" placeholder="Apartamento, bloco, referência..." class="input input-md w-full" bind:value={formData.address.complement} />
            </label>
        </div>
    {/if}
</div>