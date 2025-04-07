import { writable, derived, get } from 'svelte/store';
import { browser } from '$app/environment';

// Interface para os produtos no carrinho
export interface CartItem {
  id: number;
  name: string;
  price: string | number;
  promotionalPrice?: string | number;
  unit: string;
  imageUrl?: string;
  quantity: number;
}

// Função para carregar o carrinho do localStorage
function loadCartFromStorage(): CartItem[] {
  if (browser) {
    const storedCart = localStorage.getItem('cart');
    return storedCart ? JSON.parse(storedCart) : [];
  }
  return [];
}

// Função para salvar o carrinho no localStorage
function saveCartToStorage(items: CartItem[]) {
  if (browser) {
    localStorage.setItem('cart', JSON.stringify(items));
  }
}

// Criando a store do carrinho
const createCartStore = () => {
  const initialCart = loadCartFromStorage();
  const { subscribe, set, update } = writable<CartItem[]>(initialCart);

  // Store derivada para o número de itens no carrinho
  const itemCount = derived({ subscribe }, ($items) => $items.length);

  // Store derivada para o valor total do carrinho
  const total = derived({ subscribe }, ($items) => {
    return $items.reduce((total: number, item: CartItem) => {
      const price = item.promotionalPrice && parseFloat(String(item.promotionalPrice)) > 0 
        ? parseFloat(String(item.promotionalPrice)) 
        : parseFloat(String(item.price));
      return total + (price * item.quantity);
    }, 0);
  });
  
  // Store derivada para o número total de itens (considerando quantidade)
  const totalItems = derived({ subscribe }, ($items) => {
    return $items.reduce((count: number, item: CartItem) => {
      return count + item.quantity;
    }, 0);
  });

  return {
    subscribe,
    itemCount,
    total,
    totalItems,
    
    // Adicionar um item ao carrinho
    addItem: (item: CartItem): boolean => {
      // Garantir que o item tem uma quantidade
      if (!item.quantity) {
        item.quantity = 1;
      }
      
      let itemAdded = false;
      
      update(items => {
        // Verificar se o item já existe no carrinho
        const existingItemIndex = items.findIndex((i: CartItem) => i.id === item.id);
        
        if (existingItemIndex === -1) {
          // Se o item não existe, adicionar ao carrinho
          itemAdded = true;
          const newItems = [...items, item];
          saveCartToStorage(newItems);
          return newItems;
        } else {
          // Se o item já existe, aumentar a quantidade
          itemAdded = true;
          const newItems = [...items];
          newItems[existingItemIndex].quantity += 1;
          saveCartToStorage(newItems);
          return newItems;
        }
      });
      
      return itemAdded;
    },
    
    // Remover um item do carrinho
    removeItem: (id: number) => {
      update(items => {
        const newItems = items.filter((item: CartItem) => item.id !== id);
        saveCartToStorage(newItems);
        return newItems;
      });
    },
    
    // Atualizar a quantidade de um item
    updateQuantity: (id: number, quantity: number) => {
      if (quantity < 1) return;
      
      update(items => {
        const itemIndex = items.findIndex((item: CartItem) => item.id === id);
        
        if (itemIndex !== -1) {
          const newItems = [...items];
          newItems[itemIndex].quantity = quantity;
          saveCartToStorage(newItems);
          return newItems;
        }
        
        return items;
      });
    },
    
    // Diminuir a quantidade de um item
    decreaseQuantity: (id: number) => {
      update(items => {
        const itemIndex = items.findIndex((item: CartItem) => item.id === id);
        
        if (itemIndex !== -1) {
          const newItems = [...items];
          
          // Se a quantidade for 1, remover o item
          if (newItems[itemIndex].quantity === 1) {
            return newItems.filter((item: CartItem) => item.id !== id);
          }
          
          // Caso contrário, diminuir a quantidade
          newItems[itemIndex].quantity -= 1;
          saveCartToStorage(newItems);
          return newItems;
        }
        
        return items;
      });
    },
    
    // Limpar o carrinho
    clearCart: () => {
      set([]);
      saveCartToStorage([]);
    },
    
    // Verificar se um item está no carrinho
    hasItem: (id: number): boolean => {
      const items = get({ subscribe });
      return items.some((item: CartItem) => item.id === id);
    },
    
    // Obter a quantidade de um item no carrinho
    getItemQuantity: (id: number): number => {
      const items = get({ subscribe });
      const item = items.find((item: CartItem) => item.id === id);
      return item ? item.quantity : 0;
    }
  };
};

export const cart = createCartStore();
