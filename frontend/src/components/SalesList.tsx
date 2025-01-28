import React, { useEffect, useState } from "react";
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

const SalesList: React.FC = () => {
  const [sales, setSales] = useState<Sale[]>([]);

  useEffect(() => {
    const fetchSales = async () => {
      try {
        const response = await api.get("/venda");
        setSales(response.data);
      } catch (error) {
        console.error("Erro ao buscar vendas:", error);
      }
    };
    fetchSales();
  }, []);

  const handlePurchase = async (saleId: number, productId: number) => {
    try {
      await api.post("/compra", {
        saleId,
        productIds: [productId],
      });

      setSales((prevSales) =>
        prevSales.map((sale) => {
          if (sale.id === saleId) {
            const product = sale.produtos.find((p) => p.id === productId);
            const updatedTotal =
              parseFloat(sale.precoTotal) - (product ? parseFloat(product.preco) : 0);
            const newStatus = updatedTotal <= 0 ? "COMPLETED" : sale.status;

            return {
              ...sale,
              precoTotal: updatedTotal.toFixed(2),
              status: newStatus,
              produtos: sale.produtos.filter((p) => p.id !== productId),
            };
          }
          return sale;
        })
      );

      alert("Produto comprado com sucesso!");
    } catch (error) {
      console.error("Erro ao realizar compra do produto:", error);
    }
  };

  const handlePurchaseAll = async (saleId: number) => {
    try {
      await api.post(`/compra/todos/${saleId}`);

      setSales((prevSales) =>
        prevSales.map((sale) => {
          if (sale.id === saleId) {
            return {
              ...sale,
              precoTotal: "0.00",
              status: "COMPLETED",
              produtos: [],
            };
          }
          return sale;
        })
      );

      alert("Compra de todos os produtos realizada com sucesso!");
    } catch (error) {
      console.error("Erro ao realizar compra de todos os produtos:", error);
    }
  };

  const formatPrice = (price: string) => {
    return `R$ ${parseFloat(price).toFixed(2)}`;
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-8">Gestão de Vendas</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sales
          .filter((sale) => sale.status === "PENDING")
          .map((sale) => (
            <div
              key={sale.id}
              className="border rounded-xl shadow-md bg-white hover:shadow-lg transition-shadow"
            >
              <div className="p-5 border-b bg-gray-50 rounded-t-xl">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="text-lg font-semibold text-gray-700">Venda #{sale.id}</h4>
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                    {sale.status}
                  </span>
                </div>
                <p className="text-sm text-gray-600">
                  Total:{" "}
                  <span className="font-semibold text-lg text-blue-600">
                    {formatPrice(sale.precoTotal)}
                  </span>
                </p>
              </div>

              <div className="p-5">
                {sale.produtos && sale.produtos.length > 0 ? (
                  <div className="space-y-4">
                    {sale.produtos.map((product) => (
                      <div
                        key={product.id}
                        className="flex justify-between items-center p-3 bg-gray-100 rounded-lg"
                      >
                        <div>
                          <p className="font-medium text-gray-800">{product.nome}</p>
                          <p className="text-sm text-gray-600">{formatPrice(product.preco)}</p>
                        </div>
                        <button
                          onClick={() => handlePurchase(sale.id, product.id)}
                          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm transition-colors"
                        >
                          Comprar
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-sm">Todos os produtos foram comprados</p>
                )}

                <div className="mt-6">
                  <button
                    onClick={() => handlePurchaseAll(sale.id)}
                    className="w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium text-sm"
                  >
                    Comprar Todos
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default SalesList;
