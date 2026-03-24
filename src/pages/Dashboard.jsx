import { useState } from 'react'; // Passo 1: Importar o useState
import { Grid, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Chip, Button, Modal, Box, TextField, Stack } from "@mui/material";
import StatCard from "../components/StatCard";
import { dashboardStats } from "../data/mockData";
import AddIcon from '@mui/icons-material/Add';

const rows = [
  { id: 1, nome: "Transportadora Silva", email: "contato@silva.com", status: "Ativo", valor: "R$ 1.200,00" },
  { id: 2, nome: "Logística Express", email: "adm@express.log", status: "Pendente", valor: "R$ 850,00" },
  { id: 3, nome: "Auto Peças Hulk", email: "vendas@hulk.com.br", status: "Inativo", valor: "R$ 3.400,00" },
];

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: 3,
};

function Dashboard() {
  // Passo 2: Criar o estado para o Modal
  const [open, setOpen] = useState(false);

  // Funções para manipular o estado
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      {/* HEADER DO DASHBOARD COM O BOTÃO NOVO */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 700 }}>
          Dashboard Inicial 🚀
        </Typography>
        
        
      </Box>

      <Grid container spacing={3}>
        {dashboardStats.map((stat) => (
          <Grid item xs={12} sm={6} md={4} key={stat.id}>
            <StatCard
              title={stat.title}
              value={stat.value}
              iconName={stat.icon === "people" ? "People" : stat.icon === "paid" ? "Paid" : "TrendingUp"}
              color={stat.color}
            />
          </Grid>
        ))}
      </Grid>

      <Typography variant="h6" sx={{ mt: 5, mb: 2, fontWeight: 600 }}>
        Clientes Recentes
      </Typography>

      <TableContainer component={Paper} sx={{ borderRadius: 3, elevation: 0, border: "1px solid #e0e0e0" }}>
        <Table>
          <TableHead sx={{ bgcolor: "#f8f9fa" }}>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>Cliente</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>E-mail</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Status</TableCell>
              <TableCell sx={{ fontWeight: "bold" }} align="right">Valor</TableCell>
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
                      backgroundColor: row.status === "Ativo" ? "#2e7d32" : row.status === "Pendente" ? "#ed6c02" : "#d32f2f",
                      color: "#fff",
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