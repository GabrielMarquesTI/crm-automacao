import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Clientes from './pages/Clientes';
import Vendas from './pages/Vendas';
import AutomacaoWhats from './pages/AutomacaoWhats';
import Configuracoes from './pages/Configuracoes';

function App() {
  return (
    <Layout>
      <Routes>
        {/* O Route associa um caminho da URL a um componente (Página) */}
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/clientes" element={<Clientes />} />
        <Route path="/vendas" element={<Vendas />} />
        <Route path="/whats" element={<AutomacaoWhats />} />
        <Route path="/config" element={<Configuracoes />} />
      </Routes>
    </Layout>
  );
}

export default App;