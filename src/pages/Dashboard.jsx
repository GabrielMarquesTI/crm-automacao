import {
  Grid,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
} from "@mui/material";
import StatCard from "../components/StatCard";
import { dashboardStats } from "../data/mockData";

// Aqui vão os dados que estavam no App.jsx
const rows = [
  {
    id: 1,
    nome: "Transportadora Silva",
    email: "contato@silva.com",
    status: "Ativo",
    valor: "R$ 1.200,00",
  },
  {
    id: 2,
    nome: "Logística Express",
    email: "adm@express.log",
    status: "Pendente",
    valor: "R$ 850,00",
  },
  {
    id: 3,
    nome: "Auto Peças Hulk",
    email: "vendas@hulk.com.br",
    status: "Inativo",
    valor: "R$ 3.400,00",
  },
];

function Dashboard() {
  return (
    <>
      <Typography variant="h4" sx={{ mb: 4, fontWeight: 700 }}>
        Dashboard Inicial 🚀
      </Typography>

      <Grid container spacing={3}>
        {dashboardStats.map((stat) => (
          <Grid item xs={12} sm={6} md={4} key={stat.id}>
            <StatCard
              title={stat.title}
              value={stat.value}
              iconName={
                stat.icon === "people"
                  ? "People"
                  : stat.icon === "paid"
                    ? "Paid"
                    : "TrendingUp"
              }
              color={stat.color}
            />
          </Grid>
        ))}
      </Grid>

      <Typography variant="h6" sx={{ mt: 5, mb: 2, fontWeight: 600 }}>
        Clientes Recentes
      </Typography>

      <TableContainer
        component={Paper}
        sx={{ borderRadius: 3, elevation: 0, border: "1px solid #e0e0e0" }}
      >
        <Table>
          <TableHead sx={{ bgcolor: "#f8f9fa" }}>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>Cliente</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>E-mail</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Status</TableCell>
              <TableCell sx={{ fontWeight: "bold" }} align="right">
                Valor
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.nome}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>
                  <Chip
                    label={row.status}
                    size="small"
                    sx={{
                      fontWeight: "bold",
                      // Vamos usar lógica condicional para cores mais distintas:
                      backgroundColor:
                        row.status === "Ativo"
                          ? "#2e7d32" // Verde escuro
                          : row.status === "Pendente"
                            ? "#ed6c02" // Laranja
                            : "#d32f2f", // Vermelho para Inativo
                      color: "#fff", // Texto branco para contraste
                    }}
                  />
                </TableCell>
                <TableCell align="right">{row.valor}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default Dashboard;
