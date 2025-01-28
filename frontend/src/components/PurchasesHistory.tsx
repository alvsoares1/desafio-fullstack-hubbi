import { useEffect, useState } from 'react';
import api from '../api/api';

interface Product {
  id: number;
  nome: string;
  preco: number;
}

interface Sale {
  id: number;
  precoTotal: number;
  status: string;
}

interface Purchase {
  id: number;
  precoTotal: number;
  createdAt: string;
  vendas: Sale;
  produtos: Product[];
}

const PurchasesHistory = () => {
  const [purchases, setPurchases] = useState<Purchase[]>([]);

  useEffect(() => {
    const fetchPurchases = async () => {
      try {
        const response = await api.get('/compra');
        console.log('Dados da API:', response.data);

        const updatedPurchases = response.data.map((purchase: any) => ({
          ...purchase,
          precoTotal: parseFloat(purchase.precoTotal),
          produtos: purchase.produtos.map((product: any) => ({
            ...product,
            preco: parseFloat(product.preco),
          })),
          vendas: {
            ...purchase.vendas,
            precoTotal: parseFloat(purchase.vendas.precoTotal),
          }
        }));
        setPurchases(updatedPurchases);
      } catch (error) {
        console.error('Erro ao buscar compras:', error);
      }
    };
    fetchPurchases();
  }, []);

  const formatPrice = (price: number) => {
    return `R$ ${price.toFixed(2)}`;
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-8">Histórico de Compras</h2>

      <div className="space-y-6">
        {purchases.map((purchase) => (
          <div key={purchase.id} className="border rounded-lg shadow-sm bg-white p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Compra #{purchase.id}</h3>
                <p className="text-sm text-gray-600">
                  Valor Total: {formatPrice(purchase.precoTotal)}
                </p>
                <p className="text-sm text-gray-600">
                  Data da Compra: {new Date(purchase.createdAt).toLocaleString()}
                </p>
              </div>
            </div>

            <div className="border-t pt-4">
              <h4 className="text-md font-medium text-gray-700 mb-2">Produtos Comprados:</h4>
              {purchase.produtos && purchase.produtos.length > 0 ? (
                <div className="space-y-2">
                  {purchase.produtos.map((product) => (
                    <div key={product.id} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                      <div>
                        <p className="font-medium text-gray-700">{product.nome}</p>
                        <p className="text-sm text-gray-500">{formatPrice(product.preco)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-sm">Nenhum produto registrado</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PurchasesHistory;
