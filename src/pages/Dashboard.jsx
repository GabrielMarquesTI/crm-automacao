import { useState, useEffect } from 'react'; // 1. Adicionamos useEffect
import { 
  Grid, Typography, Box, Table, TableBody, 
  TableCell, TableContainer, TableHead, TableRow, Paper, Chip 
} from "@mui/material";
import StatCard from "../components/StatCard";
import PeopleIcon from "@mui/icons-material/People";
import PaidIcon from "@mui/icons-material/Paid";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";

function Dashboard() {
  // 2. ESTADO INICIAL: Busca os dados REAIS do LocalStorage
  const [listaClientes, setListaClientes] = useState([]);
  const [listaVendas, setListaVendas] = useState([]);

  useEffect(() => {
    // Busca clientes
    const clientesSalvos = localStorage.getItem('crm_clientes');
    if (clientesSalvos) setListaClientes(JSON.parse(clientesSalvos));

    // Busca vendas (já deixamos preparado para quando fizermos o LocalStorage de vendas)
    const vendasSalvas = localStorage.getItem('crm_vendas');
    if (vendasSalvas) setListaVendas(JSON.parse(vendasSalvas));
  }, []);

  // 3. CÁLCULOS (Agora baseados nos dados reais!)
  const totalClientes = listaClientes.length;
  
  const faturamentoTotal = listaVendas
    .filter((venda) => venda.status === "Fechado")
    .reduce((acc, venda) => acc + Number(venda.valor), 0);

  const vendasEmAberto = listaVendas.filter(
    (venda) => venda.status !== "Fechado"
  ).length;

  const cardsDinamicos = [
    { id: 1, title: "Total de Clientes", value: totalClientes, icon: <PeopleIcon />, color: "#1976d2" },
    { id: 2, title: "Faturamento (Fechado)", value: `R$ ${faturamentoTotal.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`, icon: <PaidIcon />, color: "#2e7d32" },
    { id: 3, title: "Negociações em Aberto", value: vendasEmAberto, icon: <TrendingUpIcon />, color: "#ed6c02" },
  ];

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 4, fontWeight: 700 }}>
        Dashboard Inicial 🚀
      </Typography>

      <Grid container spacing={3} sx={{ mb: 5 }}>
        {cardsDinamicos.map((card) => (
          <Grid item xs={12} sm={6} md={4} key={card.id}>
            <StatCard title={card.title} value={card.value} icon={card.icon} color={card.color} />
          </Grid>
        ))}
      </Grid>

      <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
        Últimas Movimentações
      </Typography>

      <TableContainer component={Paper} sx={{ borderRadius: 3, border: "1px solid #e0e0e0" }}>
        <Table>
          <TableHead sx={{ bgcolor: "#f8f9fa" }}>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>Cliente</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Status</TableCell>
              <TableCell sx={{ fontWeight: "bold" }} align="right">Valor</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* Exibindo os últimos 5 clientes cadastrados */}
            {listaClientes.slice(0, 5).map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.nome}</TableCell>
                <TableCell>
                  <Chip 
                    label="Ativo" // Por enquanto fixo, ou você pode adicionar 'status' no cadastro
                    size="small" 
                    sx={{ bgcolor: "#2e7d32", color: "#fff", fontWeight: 'bold' }} 
                  />
                </TableCell>
                <TableCell align="right">--</TableCell>
              </TableRow>
            ))}
            {listaClientes.length === 0 && (
              <TableRow>
                <TableCell colSpan={3} align="center">Nenhum dado encontrado</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default Dashboard;