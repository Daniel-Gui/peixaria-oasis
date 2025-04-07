import { browser } from '$app/environment';

// Interface para as opções do toast
interface ToastOptions {
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
  duration?: number;
  position?: 'top' | 'bottom' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
}

// Função para criar um elemento toast usando DaisyUI
function createToastElement(options: ToastOptions): HTMLElement {
  // Criar o container do toast
  const toastContainer = document.createElement('div');
  toastContainer.className = 'toast toast-end z-50';
  
  // Definir a posição do toast
  if (options.position) {
    toastContainer.className = `toast toast-${options.position} z-50`;
  }
  
  // Criar o elemento de alerta do toast
  const alert = document.createElement('div');
  alert.className = `alert alert-${options.type}`;
  
  // Criar o conteúdo do toast
  const content = document.createElement('span');
  content.textContent = options.message;
  
  // Montar a estrutura do toast
  alert.appendChild(content);
  toastContainer.appendChild(alert);
  
  return toastContainer;
}

// Função para mostrar um toast
function showToast(options: ToastOptions): void {
  if (!browser) return;
  
  // Verificar se já existe um container de toast
  let toastContainer = document.querySelector('.toast');
  
  // Se não existir, criar um novo
  if (!toastContainer) {
    const toast = createToastElement(options);
    document.body.appendChild(toast);
    toastContainer = toast;
  } else {
    // Se existir, apenas adicionar o novo alerta
    const alert = document.createElement('div');
    alert.className = `alert alert-${options.type}`;
    
    const content = document.createElement('span');
    content.textContent = options.message;
    
    alert.appendChild(content);
    toastContainer.appendChild(alert);
  }
  
  // Remover o alerta após o tempo definido
  const alerts = toastContainer.querySelectorAll('.alert');
  const currentAlert = alerts[alerts.length - 1];
  
  setTimeout(() => {
    currentAlert.classList.add('opacity-0');
    
    // Remover o elemento após a animação de saída
    setTimeout(() => {
      if (currentAlert && currentAlert.parentNode) {
        currentAlert.parentNode.removeChild(currentAlert);
      }
      
      // Se não houver mais alertas, remover o container
      if (toastContainer && toastContainer.querySelectorAll('.alert').length === 0) {
        toastContainer.parentNode?.removeChild(toastContainer);
      }
    }, 300);
  }, options.duration || 3000);
}

// API pública do toast
export const toast = {
  success: (message: string, duration?: number, position?: 'top' | 'bottom' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right') => 
    showToast({ message, type: 'success', duration, position: position || 'bottom-right' }),
  
  error: (message: string, duration?: number, position?: 'top' | 'bottom' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right') => 
    showToast({ message, type: 'error', duration, position: position || 'bottom-right' }),
  
  warning: (message: string, duration?: number, position?: 'top' | 'bottom' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right') => 
    showToast({ message, type: 'warning', duration, position: position || 'bottom-right' }),
  
  info: (message: string, duration?: number, position?: 'top' | 'bottom' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right') => 
    showToast({ message, type: 'info', duration, position: position || 'bottom-right' })
};
