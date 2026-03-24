import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Clientes from './pages/Clientes';

function App() {
  return (
    <Layout>
      <Routes>
        {/* O Route associa um caminho da URL a um componente (Página) */}
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/clientes" element={<Clientes />} />
      </Routes>
    </Layout>
  );
}

export default App;