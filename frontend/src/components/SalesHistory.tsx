import React, { useEffect, useState } from 'react';
import api from "../api/api";

interface Product {
  id: number;
  nome: string;
  preco: string;
}

interface Sale {
  id: number;
  precoTotal: string;
  status: string;
  produtos: Product[];
}

const SalesHistory: React.FC = () => {
  const [sales, setSales] = useState<Sale[]>([]);

  useEffect(() => {
    const fetchSales = async () => {
      try {
        const response = await api.get('/venda');
        setSales(response.data);
      } catch (error) {
        console.error('Erro ao buscar histórico de vendas:', error);
      }
    };
    fetchSales();
  }, []);

  const formatPrice = (price: string) => {
    return `R$ ${parseFloat(price).toFixed(2)}`;
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-8">Histórico de Vendas</h2>

      <div className="space-y-6">
        {sales
          .filter((sale) => sale.status === 'COMPLETED')
          .map((sale) => (
            <div key={sale.id} className="border rounded-lg shadow-sm bg-white p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">Venda #{sale.id}</h3>
                  <p className="text-sm text-gray-600">
                    Valor Total: {formatPrice(sale.precoTotal)}
                  </p>
                </div>
                <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                  CONCLUÍDA
                </span>
              </div>

              <div className="border-t pt-4">
                <h4 className="text-md font-medium text-gray-700 mb-2">Produtos Comprados:</h4>
                {sale.produtos && sale.produtos.length > 0 ? (
                  <div className="space-y-2">
                    {sale.produtos.map((product) => (
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

export default SalesHistory;
