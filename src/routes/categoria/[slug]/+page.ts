import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

// Definindo a interface para os produtos
interface Product {
  id: number;
  Nome: string;
  Ativo: boolean;
  Preço: string;
  'Preço Promocional'?: string; // Campo opcional para preço promocional
  Descrição: string;
  'Unidade de Medida': string;
  Tags: Array<{ id: number; value: string; color: string }>;
  Imagem: Array<{
    url: string;
    thumbnails: {
      tiny: { url: string; width: number; height: number };
      small: { url: string; width: number; height: number };
    };
    name: string;
    size: number;
    mime_type: string;
    is_image: boolean;
    image_width: number;
    image_height: number;
    uploaded_at: string;
  }>;
}

// Definindo a interface para a resposta da API
interface ApiResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Product[];
}

// Mapeamento de slugs para IDs de tabela e títulos
const categoryMap: Record<string, { id: number; title: string }> = {
  'salmao': { 
    id: 493225, 
    title: 'Salmão' 
  },
  'peixes-agua-doce': { 
    id: 492181, 
    title: 'Peixes de Água Doce' 
  },
  'mais-vendidos': { 
    id: 493232, 
    title: 'Mais Vendidos' 
  }
};

export const load: PageLoad = async ({ params, fetch, depends }) => {
  // Marca esta função para ser invalidada quando a rota mudar
  depends(`app:category:${params.slug}`);
  
  try {
    const { slug } = params;
    
    // Verificar se a categoria existe
    if (!categoryMap[slug]) {
      throw error(404, {
        message: 'Categoria não encontrada'
      });
    }
    
    const { id: tableId, title } = categoryMap[slug];
    
    // Token da API do Baserow
    const token = import.meta.env.VITE_BASEROW_API_TOKEN;
    
    if (!token) {
      throw new Error('Token da API do Baserow não encontrado');
    }
    
    // Buscar produtos da tabela correspondente
    const response = await fetch(
      `https://api.baserow.io/api/database/rows/table/${tableId}/?user_field_names=true`,
      {
        headers: {
          Authorization: `Token ${token}`
        }
      }
    );
    
    if (!response.ok) {
      throw new Error(`Erro ao buscar dados da tabela ${tableId}: ${response.status}`);
    }
    
    const data: ApiResponse = await response.json();
    const products = data.results.filter(product => product.Ativo);
    
    return {
      title,
      products
    };
  } catch (err) {
    console.error('Erro ao carregar produtos:', err);
    if (err instanceof Error) {
      throw error(500, {
        message: err.message || 'Erro ao carregar produtos do Baserow'
      });
    }
    throw err;
  }
};
