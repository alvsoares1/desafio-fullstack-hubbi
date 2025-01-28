import { useEffect, useState } from 'react';
import api from '../api/api';

interface Product {
  id: number;
  nome: string; 
  preco: number; 
}

const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get('/produto');
        console.log('Dados da API:', response.data);

        const updatedProducts = response.data.map((product: any) => ({
          ...product,
          preco: parseFloat(product.preco), 
        }));
        setProducts(updatedProducts);
      } catch (error) {
        console.error('Erro ao buscar produtos:', error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6">Lista de Produtos</h2>
      <ul className="space-y-4">
        {products.map(product => (
          <li key={product.id} className="p-4 border border-gray-300 rounded-md shadow-sm hover:shadow-lg transition">
            <div className="flex justify-between">
              <span className="text-lg font-semibold">{product.nome}</span>
              <span className="text-lg">
                {product.preco ? `R$${product.preco.toFixed(2)}` : 'Preço indisponível'}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
