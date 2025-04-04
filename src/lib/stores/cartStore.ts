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
      return total + price;
    }, 0);
  });

  return {
    subscribe,
    itemCount,
    total,
    
    // Adicionar um item ao carrinho
    addItem: (item: CartItem): boolean => {
      let itemAdded = false;
      
      update(items => {
        // Verificar se o item já existe no carrinho
        const existingItem = items.find((i: CartItem) => i.id === item.id);
        
        if (!existingItem) {
          // Se o item não existe, adicionar ao carrinho
          itemAdded = true;
          const newItems = [...items, item];
          saveCartToStorage(newItems);
          return newItems;
        }
        
        // Se o item já existe, não fazer nada
        return items;
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
    
    // Limpar o carrinho
    clearCart: () => {
      set([]);
      saveCartToStorage([]);
    },
    
    // Verificar se um item está no carrinho
    hasItem: (id: number): boolean => {
      const items = get({ subscribe });
      return items.some((item: CartItem) => item.id === id);
    }
  };
};

export const cart = createCartStore();
