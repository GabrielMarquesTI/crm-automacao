import { useState, useEffect } from 'react';
import { 
  Typography, Box, Paper, Button, Table, TableBody, 
  TableCell, TableContainer, TableHead, TableRow, Chip,
  Modal, TextField, Stack, FormControl, InputLabel, Select, MenuItem, IconButton 
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import VisibilityIcon from '@mui/icons-material/Visibility';

const modalStyle = {
  position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
  width: 450, bgcolor: 'background.paper', borderRadius: 3, boxShadow: 24, p: 4,
};

function Vendas() {
  const [open, setOpen] = useState(false);
  
  // 1. ESTADOS DE DADOS (Lendo do LocalStorage)
  const [vendas, setVendas] = useState(() => {
    const salvas = localStorage.getItem('crm_vendas');
    return salvas ? JSON.parse(salvas) : [];
  });

  const [clientesDisponiveis, setClientesDisponiveis] = useState([]);

  // 2. BUSCAR CLIENTES AO ABRIR A TELA (Para o Select funcionar)
  useEffect(() => {
    const clientesSalvos = localStorage.getItem('crm_clientes');
    if (clientesSalvos) setClientesDisponiveis(JSON.parse(clientesSalvos));
  }, []);

  // 3. SALVAR VENDAS SEMPRE QUE A LISTA MUDAR
  useEffect(() => {
    localStorage.setItem('crm_vendas', JSON.stringify(vendas));
  }, [vendas]);

  // Estados do formulário
  const [cliente, setCliente] = useState('');
  const [servico, setServico] = useState('');
  const [valor, setValor] = useState('');

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSalvarVenda = () => {
    const novaVenda = {
      id: Date.now(),
      cliente,
      servico,
      valor: Number(valor), // Garantimos que o valor seja um número para o cálculo do Dashboard
      status: 'Fechado' // Por enquanto vamos salvar como Fechado para testar o Faturamento
    };

    setVendas([novaVenda, ...vendas]);
    handleClose();
    setCliente(''); setServico(''); setValor('');
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4, alignItems: 'center' }}>
        <Typography variant="h4" sx={{ fontWeight: 700 }}>Gestão de Vendas 💰</Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={handleOpen}>Nova Venda</Button>
      </Box>

      <TableContainer component={Paper} sx={{ borderRadius: 3, border: '1px solid #e0e0e0' }}>
        <Table>
          <TableHead sx={{ bgcolor: '#f8f9fa' }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>Cliente</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Serviço</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Valor</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }} align="center">Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {vendas.map((v) => (
              <TableRow key={v.id}>
                <TableCell>{v.cliente}</TableCell>
                <TableCell>{v.servico}</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>
                   R$ {Number(v.valor).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </TableCell>
                <TableCell>
                  <Chip label={v.status} color="success" size="small" />
                </TableCell>
                <TableCell align="center">
                  <IconButton color="primary"><VisibilityIcon /></IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Modal open={open} onClose={handleClose}>
        <Box sx={modalStyle}>
          <Typography variant="h6" sx={{ mb: 3, fontWeight: 700 }}>Lançar Novo Negócio</Typography>
          <Stack spacing={3}>
            {/* SELECT DINÂMICO QUE BUSCA SEUS CLIENTES REAIS */}
            <FormControl fullWidth>
              <InputLabel>Selecionar Cliente</InputLabel>
              <Select
                value={cliente}
                label="Selecionar Cliente"
                onChange={(e) => setCliente(e.target.value)}
              >
                {clientesDisponiveis.map((c) => (
                  <MenuItem key={c.id} value={c.nome}>{c.nome}</MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField label="Descrição do Serviço" fullWidth value={servico} onChange={(e) => setServico(e.target.value)} />
            <TextField label="Valor (R$)" fullWidth type="number" value={valor} onChange={(e) => setValor(e.target.value)} />
            
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