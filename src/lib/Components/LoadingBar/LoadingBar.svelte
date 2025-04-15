<script lang="ts">
    import { afterNavigate, beforeNavigate } from '$app/navigation';
    import { fade } from 'svelte/transition';
    
    // Controla a visibilidade da barra de progresso
    let progress = $state(0);
    let intervalId: number | null = null;
    let isNavigating = $state(false);
    
    // Detecta o início da navegação
    beforeNavigate(() => {
        isNavigating = true;
        startProgress();
    });
    
    // Detecta o fim da navegação
    afterNavigate(() => {
        isNavigating = false;
        completeProgress();
    });
    
    // Inicia a animação de progresso
    function startProgress() {
        // Limpa qualquer intervalo existente
        if (intervalId) clearInterval(intervalId);
        
        // Reinicia o progresso
        progress = 0;
        
        // Configura o intervalo para aumentar o progresso
        intervalId = setInterval(() => {
            if (progress < 90) {
                progress += progress < 60 ? 10 : 2;
            }
        }, 100) as unknown as number;
    }
    
    // Completa a animação de progresso
    function completeProgress() {
        if (progress > 0) {
            progress = 100;
            
            // Limpa o intervalo
            if (intervalId) clearInterval(intervalId);
            
            // Reseta o progresso após um breve delay para permitir a animação de conclusão
            setTimeout(() => {
                progress = 0;
            }, 300);
        }
    }
</script>

{#if progress > 0}
    <div class="loading-container" transition:fade={{ duration: 200 }}>
        <div class="loading-bar" style="width: {progress}%"></div>
    </div>
{/if}

<style>
    .loading-container {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 3px;
        z-index: 9999;
        pointer-events: none;
    }
    
    .loading-bar {
        height: 100%;
        background: linear-gradient(90deg, #3B82F6, #10B981);
        box-shadow: 0 0 10px rgba(59, 130, 246, 0.7);
        transition: width 0.2s ease-out;
    }
</style>