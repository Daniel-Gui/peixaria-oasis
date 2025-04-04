import { browser } from '$app/environment';

// Interface para as opções do toast
interface ToastOptions {
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
  duration?: number;
}

// Função para criar um elemento toast
function createToastElement(options: ToastOptions): HTMLElement {
  const toast = document.createElement('div');
  toast.className = `toast toast-${options.type} fixed bottom-4 right-4 z-50 p-4 rounded-lg shadow-lg`;
  
  // Definir a cor de fundo com base no tipo
  switch (options.type) {
    case 'success':
      toast.classList.add('bg-success', 'text-success-content');
      break;
    case 'error':
      toast.classList.add('bg-error', 'text-error-content');
      break;
    case 'warning':
      toast.classList.add('bg-warning', 'text-warning-content');
      break;
    case 'info':
      toast.classList.add('bg-info', 'text-info-content');
      break;
  }
  
  toast.textContent = options.message;
  
  return toast;
}

// Função para mostrar um toast
function showToast(options: ToastOptions): void {
  if (!browser) return;
  
  const toast = createToastElement(options);
  document.body.appendChild(toast);
  
  // Adicionar animação de entrada
  setTimeout(() => {
    toast.style.opacity = '1';
    toast.style.transform = 'translateY(0)';
  }, 10);
  
  // Remover o toast após o tempo definido
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(20px)';
    
    // Remover o elemento após a animação de saída
    setTimeout(() => {
      document.body.removeChild(toast);
    }, 300);
  }, options.duration || 3000);
}

// API pública do toast
export const toast = {
  success: (message: string, duration?: number) => 
    showToast({ message, type: 'success', duration }),
  
  error: (message: string, duration?: number) => 
    showToast({ message, type: 'error', duration }),
  
  warning: (message: string, duration?: number) => 
    showToast({ message, type: 'warning', duration }),
  
  info: (message: string, duration?: number) => 
    showToast({ message, type: 'info', duration })
};
