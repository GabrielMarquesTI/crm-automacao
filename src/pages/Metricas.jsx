import { useState, useEffect } from "react";
import { Box, Typography, Grid, Paper, Divider, Stack } from "@mui/material";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";

function Metricas() {
  const [dadosGrafico, setDadosGrafico] = useState([]);
  const [stats, setStats] = useState({
    totalLeads: 0,
    faturamentoTotal: 0,
    taxaConversao: 0,
  });

  useEffect(() => {
    const clientes = JSON.parse(localStorage.getItem("crm_clientes") || "[]");
    const vendas = JSON.parse(localStorage.getItem("crm_vendas") || "[]");

    const contagemOrigens = clientes.reduce((acc, curr) => {
      const origem = curr.origem || "Não Informado";
      acc[origem] = (acc[origem] || 0) + 1;
      return acc;
    }, {});

    const formatado = Object.keys(contagemOrigens).map((key) => ({
      name: key,
      value: contagemOrigens[key],
    }));

    const fechadas = vendas.filter((v) => v.status === "Fechado");
    const faturamento = fechadas.reduce((acc, v) => acc + Number(v.valor), 0);
    const conversao =
      clientes.length > 0
        ? ((fechadas.length / clientes.length) * 100).toFixed(1)
        : 0;

    setDadosGrafico(formatado);
    setStats({
      totalLeads: clientes.length,
      faturamentoTotal: faturamento,
      taxaConversao: conversao,
    });
  }, []);

  const COLORS = ["#6366f1", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"];

  return (
    <Box sx={{ p: 1 }}>
      <Typography
        variant="h5"
        sx={{ mb: 3, fontWeight: 800, color: "#1e293b" }}
      >
        Análise de Desempenho 📈
      </Typography>

      {/* SEÇÃO DE MINI CARDS */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {[
          {
            label: "Total de Leads",
            val: stats.totalLeads,
            icon: <PeopleAltIcon />,
            color: "#6366f1",
          },
          {
            label: "Faturamento",
            val: `R$ ${stats.faturamentoTotal.toLocaleString("pt-BR")}`,
            icon: <AccountBalanceWalletIcon />,
            color: "#10b981",
          },
          {
            label: "Conversão",
            val: `${stats.taxaConversao}%`,
            icon: <TrendingUpIcon />,
            color: "#f59e0b",
          },
        ].map((item, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Paper
              elevation={0}
              sx={{
                p: 3,
                borderRadius: 4,
                border: "1px solid #e2e8f0",
                display: "flex",
                alignItems: "center",
                gap: 2,
              }}
            >
              <Box
                sx={{
                  bgcolor: `${item.color}15`,
                  p: 1.5,
                  borderRadius: 3,
                  display: "flex",
                  color: item.color,
                }}
              >
                {item.icon}
              </Box>
              <Box>
                <Typography
                  variant="caption"
                  sx={{
                    color: "#64748b",
                    fontWeight: 600,
                    textTransform: "uppercase",
                    letterSpacing: 0.5,
                  }}
                >
                  {item.label}
                </Typography>
                <Typography
                  variant="h5"
                  sx={{ fontWeight: 800, color: "#1e293b" }}
                >
                  {item.val}
                </Typography>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3}>
        {/* GRÁFICO DE PIZZA (DONUT) */}
        {/* Mudamos para md={12} (ocupa a tela toda em notes) e lg={6} (metade em desktops) */}
        <Grid item xs={12} md={12} lg={6}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 4,
              border: "1px solid #e2e8f0",
              height: 450,
              display: "flex",
              flexDirection: "column",
              // SOLUÇÃO DO CORTE: Garante um espaço mínimo para o círculo não esmagar
              minWidth: { xs: "100%", sm: "350px" },
              overflow: "hidden", // Previne qualquer vazamento visual
            }}
          >
            <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1 }}>
              Fontes de Aquisição
            </Typography>

            {/* Container wrapper para o gráfico */}
            <Box
              sx={{
                flexGrow: 1,
                width: "100%",
                height: "100%",
                position: "relative",
              }}
            >
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={dadosGrafico}
                    cx="50%" // Centraliza estritamente no meio X
                    cy="50%" // Centraliza estritamente no meio Y
                    innerRadius={70}
                    // Reduzi um pouco mais o raio externo para garantir respiro lateral
                    outerRadius={90}
                    paddingAngle={8}
                    dataKey="value"
                  >
                    {dadosGrafico.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                        stroke="none"
                      />
                    ))}
                  </Pie>
                  <Tooltip cornerRadius={8} />
                  {/* Legenda na parte inferior para não brigar com as laterais */}
                  <Legend
                    iconType="circle"
                    verticalAlign="bottom"
                    wrapperStyle={{ paddingTop: "20px" }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </Box>
          </Paper>
        </Grid>

        {/* GRÁFICO DE BARRAS */}
        {/* Acompanha a mesma lógica de quebra de layout */}
        <Grid item xs={12} md={12} lg={6}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 4,
              border: "1px solid #e2e8f0",
              height: 450,
              // Também garantimos um minWidth para os nomes do eixo X não encavalarem
              minWidth: { xs: "100%", sm: "350px" },
            }}
          >
            <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 3 }}>
              Volume por Canal
            </Typography>
            <ResponsiveContainer width="100%" height="85%">
              {/* Aumentei a margem direita para a última barra não encostar */}
              <BarChart
                data={dadosGrafico}
                margin={{ top: 10, right: 30, left: -20, bottom: 0 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#f1f5f9"
                />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#64748b", fontSize: 12 }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#64748b", fontSize: 12 }}
                />
                <Tooltip cursor={{ fill: "#f8fafc" }} />
                <Bar
                  dataKey="value"
                  fill="#6366f1"
                  radius={[6, 6, 0, 0]}
                  barSize={40}
                />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Metricas;
