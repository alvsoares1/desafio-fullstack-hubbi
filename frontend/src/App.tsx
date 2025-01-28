import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ProductList from './components/ProductList';
import CreateSale from './components/CreateSale';
import SalesList from './components/SalesList';
import PurchasesHistory from './components/PurchasesHistory'; 
import SalesHistory from './components/SalesHistory';
import 'tailwindcss/tailwind.css';

function App() {
  return (
    <Router>
      <div className="container mx-auto mt-4">
        <nav className="bg-gray-800 p-4 rounded-lg mb-4">
          <div className="flex justify-between items-center">
            <Link className="text-white text-lg font-semibold" to="/">Sistema de Vendas</Link>
            <div className="space-x-4">
              <ul className="flex space-x-4">
                <li>
                  <Link className="text-white hover:text-gray-400" to="/produtos">Produtos</Link>
                </li>
                <li>
                  <Link className="text-white hover:text-gray-400" to="/vendas">Vendas</Link>
                </li>
                <li>
                  <Link className="text-white hover:text-gray-400" to="/nova-venda">Nova Venda</Link>
                </li>
                <li>
                  <Link className="text-white hover:text-gray-400" to="/compras">Compras Realizadas</Link>
                </li>
                <li>
                  <Link className="text-white hover:text-gray-400" to="/vendas-historico">Historico de vendas</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <Routes>
          <Route path="/produtos" element={<ProductList />} />
          <Route path="/vendas" element={<SalesList />} />
          <Route path="/nova-venda" element={<CreateSale />} />
          <Route path="/compras" element={<PurchasesHistory />} /> 
          <Route path="/vendas-historico" element={<SalesHistory />} /> 
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

const Home = () => (
  <div className="text-center">
    <h1 className="text-3xl font-bold mb-4">Bem-vindo ao Sistema de Vendas</h1>
    <p className="text-lg">Selecione uma opção no menu acima para começar.</p>
  </div>
);

export default App;
