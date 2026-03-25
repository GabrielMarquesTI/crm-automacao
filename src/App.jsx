import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Clientes from './pages/Clientes';
import Vendas from './pages/Vendas';
import AutomacaoWhats from './pages/AutomacaoWhats';
import Configuracoes from './pages/Configuracoes';
import ClienteDetalhes from './pages/ClienteDetalhes';
import Metricas from './pages/Metricas';


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
        <Route path="/clientes/:id" element={<ClienteDetalhes />} />
        <Route path="/metricas" element={<Metricas />} />
      </Routes>
    </Layout>
  );
}

export default App;