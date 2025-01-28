import { useState, useEffect } from 'react';
import api from '../api/api';

interface Product {
  id: number;
  nome: string;
  price: number;
}

const CreateSale = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<number[]>([]); 
  const [sale, setSale] = useState<any>(null); 

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get('/produto');
        console.log('API Response:', response.data);
        const productsWithPrice = response.data.map((product: any) => ({
          ...product,
          price: parseFloat(product.preco), // Convertendo o preço para número
        }));
        setProducts(productsWithPrice);
      } catch (error) {
        console.error('Erro ao buscar produtos:', error);
      }
    };
    fetchProducts();
  }, []);

  const handleProductSelect = (productId: number) => {
    setSelectedProducts(prevSelected =>
      prevSelected.includes(productId)
        ? prevSelected.filter(id => id !== productId) 
        : [...prevSelected, productId] 
    );
  };

  const handleCreateSale = async () => {
    try {
      if (selectedProducts.length === 0) {
        alert('Por favor, selecione pelo menos um produto.');
        return;
      }
      const response = await api.post('/venda', { productIds: selectedProducts });
      setSale(response.data); 
      console.log('Venda criada:', response.data);
    } catch (error) {
      console.error('Erro ao criar a venda:', error);
      alert('Erro ao criar a venda.');
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Criar Nova Venda</h2>
      <div className="mb-4">
        <h3 className="text-xl font-semibold mb-2">Selecione os produtos:</h3>
        <ul className="space-y-2">
          {products.map(product => (
            <li key={product.id} className="flex items-center space-x-2 p-2 border border-gray-300 rounded-md">
              <input
                type="checkbox"
                checked={selectedProducts.includes(product.id)}
                onChange={() => handleProductSelect(product.id)}
                className="h-5 w-5"
              />
              <span className="text-lg">{product.nome} - R${product.price.toFixed(2)}</span>
            </li>
          ))}
        </ul>
      </div>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none"
        onClick={handleCreateSale}
      >
        Criar Venda
      </button>

      {sale && (
        <div className="mt-6 p-4 border border-gray-300 rounded-lg">
          <h3 className="text-xl font-semibold">Venda Criada</h3>
          <p className="text-lg">ID da Venda: {sale.id}</p>
          <p className="text-lg">Status: {sale.status}</p>
          <p className="text-lg mb-4">Preço Total: R${sale.precoTotal.toFixed(2)}</p>
          <ul className="space-y-2">
            {sale.produtos && sale.produtos.length > 0 ? (
              sale.produtos.map((product: any) => (
                <li key={product.id} className="text-lg">
                  {product.nome} - R${parseFloat(product.preco).toFixed(2)} {/* Usando nome e preco corretamente */}
                </li>
              ))
            ) : (
              <li className="text-lg">Nenhum produto encontrado na venda.</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CreateSale;
