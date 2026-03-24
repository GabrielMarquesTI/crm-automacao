import { useState } from 'react';
import { 
  Typography, Box, Paper, Button, Table, TableBody, 
  TableCell, TableContainer, TableHead, TableRow, Chip,
  Modal, TextField, Stack, FormControl, InputLabel, Select, MenuItem, IconButton 
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import VisibilityIcon from '@mui/icons-material/Visibility'; // Ícone para "ver detalhes"

const modalStyle = {
  position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
  width: 450, bgcolor: 'background.paper', borderRadius: 3, boxShadow: 24, p: 4,
};

function Vendas() {
  const [open, setOpen] = useState(false);
  
  // 1. LISTA DE VENDAS (O Histórico que você quer visualizar)
  const [vendas, setVendas] = useState([
    { id: 1, cliente: 'Transportadora Silva', servico: 'Sistema de Logística', valor: '1500', status: 'Fechado' },
    { id: 2, cliente: 'Auto Peças Hulk', servico: 'Consultoria Bot', valor: '2800', status: 'Em Negociação' }
  ]);

  // Estados para o formulário de nova venda
  const [cliente, setCliente] = useState('');
  const [servico, setServico] = useState('');
  const [valor, setValor] = useState('');

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // 2. FUNÇÃO PARA LANÇAR A VENDA NA LISTA VISUAL
  const handleSalvarVenda = () => {
    const novaVenda = {
      id: Date.now(),
      cliente,
      servico,
      valor,
      status: 'Proposta' // Toda venda nova começa como proposta por padrão
    };

    setVendas([novaVenda, ...vendas]); // Coloca a nova venda no topo da lista
    handleClose();
    // Limpa os campos
    setCliente(''); setServico(''); setValor('');
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4, alignItems: 'center' }}>
        <Typography variant="h4" sx={{ fontWeight: 700 }}>Gestão de Vendas 💰</Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={handleOpen}>Nova Venda</Button>
      </Box>

      {/* 3. VISUALIZAÇÃO DAS VENDAS LANÇADAS */}
      <TableContainer component={Paper} sx={{ borderRadius: 3, elevation: 0, border: '1px solid #e0e0e0' }}>
        <Table>
          <TableHead sx={{ bgcolor: '#f8f9fa' }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>Cliente</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Serviço / Produto</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Valor (R$)</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }} align="center">Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {vendas.map((venda) => (
              <TableRow key={venda.id} hover>
                <TableCell>{venda.cliente}</TableCell>
                <TableCell>{venda.servico}</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>R$ {venda.valor}</TableCell>
                <TableCell>
                  <Chip 
                    label={venda.status} 
                    color={venda.status === 'Fechado' ? 'success' : 'warning'} 
                    size="small" 
                  />
                </TableCell>
                <TableCell align="center">
                  <IconButton color="primary" title="Ver Detalhes">
                    <VisibilityIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* MODAL PARA LANÇAR NOVA VENDA */}
      <Modal open={open} onClose={handleClose}>
        <Box sx={modalStyle}>
          <Typography variant="h6" sx={{ mb: 3, fontWeight: 700 }}>Lançar Novo Negócio</Typography>
          <Stack spacing={3}>
            <TextField label="Nome do Cliente" fullWidth value={cliente} onChange={(e) => setCliente(e.target.value)} />
            <TextField label="Descrição do Serviço" fullWidth value={servico} onChange={(e) => setServico(e.target.value)} />
            <TextField label="Valor Estimado" fullWidth type="number" value={valor} onChange={(e) => setValor(e.target.value)} />
            
            <Box sx={{ display: 'flex', gap: 2, mt: 1 }}>
              <Button fullWidth onClick={handleClose} variant="outlined">Cancelar</Button>
              <Button fullWidth variant="contained" onClick={handleSalvarVenda}>Lançar Venda</Button>
            </Box>
          </Stack>
        </Box>
      </Modal>
    </Box>
  );
}

export default Vendas;