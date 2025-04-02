import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

// Definindo a interface para os produtos
interface Product {
  id: number;
  Nome: string;
  Ativo: boolean;
  Preço: string;
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

export const load: PageLoad = async ({ fetch }) => {
  try {
    // ID da tabela "Peixes de água doce"
    const tableId = 492181;
    
    // Token da API do Baserow
    const token = import.meta.env.VITE_BASEROW_API_TOKEN;
    
    if (!token) {
      throw new Error('Token da API do Baserow não encontrado');
    }
    
    // Fazendo a requisição para a API do Baserow
    const response = await fetch(
      `https://api.baserow.io/api/database/rows/table/${tableId}/?user_field_names=true`,
      {
        headers: {
          Authorization: `Token ${token}`
        }
      }
    );
    
    if (!response.ok) {
      throw new Error(`Erro ao buscar dados: ${response.status}`);
    }
    
    const data: ApiResponse = await response.json();
    
    // Filtrando apenas produtos ativos
    const activeProducts = data.results.filter(product => product.Ativo);
    
    return {
      products: activeProducts
    };
  } catch (err) {
    console.error('Erro ao carregar produtos:', err);
    throw error(500, {
      message: 'Erro ao carregar produtos do Baserow'
    });
  }
};
