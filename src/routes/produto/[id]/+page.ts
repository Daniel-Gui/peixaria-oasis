import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

// Definindo a interface para os produtos
interface Product {
  id: number;
  Nome: string;
  Ativo: boolean;
  Preço: string;
  'Preço Promocional'?: string;
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

// Função para buscar um produto específico pelo ID
async function fetchProductById(id: string, fetchFn: typeof fetch): Promise<Product | null> {
  const token = import.meta.env.VITE_BASEROW_API_TOKEN;
  
  // Vamos buscar em todas as tabelas 
  const tableIds = [492181, 493232, 493225, 498934]; // IDs das tabelas: Peixes de água doce, Mais Vendidos, Salmão, Camarão
  
  for (const tableId of tableIds) {
    try {
      const response = await fetchFn(
        `https://api.baserow.io/api/database/rows/table/${tableId}/?user_field_names=true`,
        {
          headers: {
            Authorization: `Token ${token}`
          }
        }
      );

      if (!response.ok) {
        console.error(`Erro ao buscar produtos da tabela ${tableId}: ${response.statusText}`);
        continue;
      }

      const data = await response.json();
      
      // Filtra para encontrar o produto com o ID específico
      const product = data.results.find((p: Product) => p.id.toString() === id && p.Ativo);
      
      if (product) {
        return product;
      }
    } catch (err) {
      console.error(`Erro ao buscar produtos da tabela ${tableId}:`, err);
    }
  }
  
  return null;
}

export const load = (async ({ params, fetch }) => {
  const productId = params.id;
  
  if (!productId) {
    throw error(404, 'Produto não encontrado');
  }
  
  const product = await fetchProductById(productId, fetch);
  
  if (!product) {
    throw error(404, 'Produto não encontrado');
  }
  
  return {
    product
  };
}) satisfies PageLoad;
