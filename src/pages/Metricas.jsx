import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Modal,
  IconButton,
  Divider,
  Stack,
} from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  LabelList,
} from "recharts";
import CloseIcon from "@mui/icons-material/Close";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import QueryStatsIcon from "@mui/icons-material/QueryStats";

function Metricas() {
  const [dadosFunil, setDadosFunil] = useState([]);
  const [vendasFiltradas, setVendasFiltradas] = useState([]);
  const [statusSelecionado, setStatusSelecionado] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [stats, setStats] = useState({
    faturamentoReal: 0,
    faturamentoPrevisto: 0,
    taxaConversao: 0,
  });

  const COLORS = ["#9e9e9e", "#1976d2", "#0288d1", "#ed6c02", "#2e7d32", "#d32f2f"];

  useEffect(() => {
    const vendas = JSON.parse(localStorage.getItem("crm_vendas") || "[]");
    const ordemFunil = ["Lead", "Negociação", "Orçamento Enviado", "Aguardando Pagamento", "Finalizada", "Perdida"];

    const contagemStatus = vendas.reduce((acc, v) => {
      acc[v.status] = (acc[v.status] || 0) + 1;
      return acc;
    }, {});

    const formatadoFunil = ordemFunil.map((status) => ({
      name: status,
      quantidade: contagemStatus[status] || 0,
    }));

    const real = vendas.filter((v) => v.status === "Finalizada").reduce((acc, v) => acc + Number(v.valor), 0);
    const previsto = vendas.filter((v) => ["Negociação", "Orçamento Enviado", "Aguardando Pagamento"].includes(v.status)).reduce((acc, v) => acc + Number(v.valor), 0);
    const totalNegocios = vendas.filter((v) => v.status !== "Lead").length;
    const finalizadas = vendas.filter((v) => v.status === "Finalizada").length;
    const conversao = totalNegocios > 0 ? ((finalizadas / totalNegocios) * 100).toFixed(1) : 0;

    setDadosFunil(formatadoFunil);
    setStats({ faturamentoReal: real, faturamentoPrevisto: previsto, taxaConversao: conversao });
  }, []);

  const handleBarClick = (data) => {
    const statusNome = data.name || (data.payload && data.payload.name);
    if (!statusNome) return;

    const todasVendas = JSON.parse(localStorage.getItem("crm_vendas") || "[]");
    const filtradas = todasVendas.filter((v) => v.status === statusNome);

    setVendasFiltradas(filtradas);
    setStatusSelecionado(statusNome);
    setModalOpen(true);
  };

  return (
    <Box sx={{ p: 1 }}>
      {/* CSS HACK PARA REMOVER CONTORNOS EM TODO O GRÁFICO */}
      <style>
        {`
          .recharts-wrapper, .recharts-surface, .recharts-rectangle, .recharts-text {
            outline: none !important;
            box-shadow: none !important;
            -webkit-tap-highlight-color: transparent;
          }
          path:focus {
            outline: none !important;
          }
        `}
      </style>

      <Typography variant="h4" sx={{ mb: 4, fontWeight: 800, color: "#1e293b" }}>
        Business Intelligence 📊
      </Typography>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={4}>
          <Paper elevation={0} sx={{ p: 3, borderRadius: 4, border: "1px solid #e2e8f0", display: "flex", alignItems: "center", gap: 2 }}>
            <Box sx={{ bgcolor: "#2e7d3215", p: 1.5, borderRadius: 3, color: "#2e7d32" }}><AccountBalanceWalletIcon /></Box>
            <Box>
              <Typography variant="caption" sx={{ color: "#64748b", fontWeight: 700 }}>FATURAMENTO REAL</Typography>
              <Typography variant="h5" sx={{ fontWeight: 800 }}>R$ {stats.faturamentoReal.toLocaleString("pt-BR")}</Typography>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper elevation={0} sx={{ p: 3, borderRadius: 4, border: "1px solid #e2e8f0", display: "flex", alignItems: "center", gap: 2 }}>
            <Box sx={{ bgcolor: "#1976d215", p: 1.5, borderRadius: 3, color: "#1976d2" }}><QueryStatsIcon /></Box>
            <Box>
              <Typography variant="caption" sx={{ color: "#64748b", fontWeight: 700 }}>EM NEGOCIAÇÃO</Typography>
              <Typography variant="h5" sx={{ fontWeight: 800 }}>R$ {stats.faturamentoPrevisto.toLocaleString("pt-BR")}</Typography>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper elevation={0} sx={{ p: 3, borderRadius: 4, border: "1px solid #e2e8f0", display: "flex", alignItems: "center", gap: 2 }}>
            <Box sx={{ bgcolor: "#ed6c0215", p: 1.5, borderRadius: 3, color: "#ed6c02" }}><TrendingUpIcon /></Box>
            <Box>
              <Typography variant="caption" sx={{ color: "#64748b", fontWeight: 700 }}>TAXA DE CONVERSÃO</Typography>
              <Typography variant="h5" sx={{ fontWeight: 800 }}>{stats.taxaConversao}%</Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper elevation={0} sx={{ p: 4, borderRadius: 4, border: "1px solid #e2e8f0", height: 500 }}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>Saúde do Funil de Vendas</Typography>
            <Typography variant="body2" sx={{ color: "text.secondary", mb: 4 }}>Clique nas barras para detalhes.</Typography>

            <ResponsiveContainer width="100%" height="90%">
              <BarChart
                layout="vertical"
                data={dadosFunil}
                margin={{ top: 20, right: 60, left: 20, bottom: 20 }}
                style={{ outline: "none" }}
              >
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#f1f5f9" />
                <XAxis type="number" hide />
                <YAxis
                  dataKey="name"
                  type="category"
                  axisLine={false}
                  tickLine={false}
                  width={150}
                  tick={{ fill: "#334155", fontWeight: 700, fontSize: 14, textAnchor: "start" }}
                  dx={-140}
                />
                <Tooltip cursor={{ fill: "#f1f5f9", radius: 10 }} pointerEvents="none" />

                <Bar 
                  dataKey="quantidade" 
                  radius={[0, 12, 12, 0]} 
                  barSize={40}
                  activeBar={false}
                  isAnimationActive={false} // Desativa animação para evitar re-foco do navegador
                >
                  {dadosFunil.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                      onClick={() => handleBarClick(entry)}
                      style={{ outline: "none", cursor: "pointer", strokeWidth: 0 }}
                    />
                  ))}
                  <LabelList
                    dataKey="quantidade"
                    position="right"
                    style={{ fill: "#475569", fontWeight: 800, fontSize: 16, cursor: "pointer", outline: 'none' }}
                    offset={15}
                    onClick={(data) => handleBarClick(data)}
                  />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <Box sx={{
          position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)",
          width: { xs: "95%", md: 750 }, bgcolor: "white", borderRadius: 4, p: 4, boxShadow: 24,
          maxHeight: "80vh", overflowY: "auto",
        }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
            <Typography variant="h6" fontWeight={800}>Status: {statusSelecionado}</Typography>
            <IconButton onClick={() => setModalOpen(false)}><CloseIcon /></IconButton>
          </Box>
          <Divider sx={{ mb: 3 }} />
          <TableContainer component={Paper} elevation={0} sx={{ border: "1px solid #e2e8f0", borderRadius: 3 }}>
            <Table size="medium">
              <TableHead sx={{ bgcolor: "#f8fafc" }}>
                <TableRow>
                  <TableCell sx={{ fontWeight: 700 }}>Cliente</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Serviço</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 700 }}>Valor</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {vendasFiltradas.length > 0 ? (
                  vendasFiltradas.map((v) => (
                    <TableRow key={v.id} hover>
                      <TableCell sx={{ fontWeight: 500 }}>{v.cliente}</TableCell>
                      <TableCell>{v.servico}</TableCell>
                      <TableCell align="right" sx={{ fontWeight: 700, color: "#2e7d32" }}>
                        R$ {Number(v.valor).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow><TableCell colSpan={3} align="center" sx={{ py: 4, color: "text.secondary" }}>Vazio.</TableCell></TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <Box sx={{ mt: 3, textAlign: "right" }}>
            <Typography variant="caption" sx={{ color: "text.secondary" }}>
              Total: <strong>R$ {vendasFiltradas.reduce((acc, v) => acc + Number(v.valor), 0).toLocaleString("pt-BR")}</strong>
            </Typography>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}

export default Metricas;