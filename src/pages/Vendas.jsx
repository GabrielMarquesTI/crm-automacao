import { useState, useEffect } from 'react';
import { 
  Typography, Box, Paper, Button, Table, TableBody, 
  TableCell, TableContainer, TableHead, TableRow, Chip,
  Modal, TextField, Stack, FormControl, InputLabel, Select, MenuItem, IconButton,
  Menu, ListItemText, Divider
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const modalStyle = {
  position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
  width: 450, bgcolor: 'background.paper', borderRadius: 3, boxShadow: 24, p: 4,
};

// 1. CONFIGURAÇÃO VISUAL DO FUNIL
const statusConfig = {
  'Lead': { color: 'default', label: 'Lead', hex: '#9e9e9e' },
  'Negociação': { color: 'primary', label: 'Negociação', hex: '#1976d2' },
  'Orçamento Enviado': { color: 'info', label: 'Orçamento Enviado', hex: '#0288d1' },
  'Aguardando Pagamento': { color: 'warning', label: 'Aguardando Pgto', hex: '#ed6c02' },
  'Finalizada': { color: 'success', label: 'Finalizada', hex: '#2e7d32' },
  'Perdida': { color: 'error', label: 'Perdida', hex: '#d32f2f' },
};

function Vendas() {
  const [open, setOpen] = useState(false);
  const [vendas, setVendas] = useState(() => {
    const salvas = localStorage.getItem('crm_vendas');
    return salvas ? JSON.parse(salvas) : [];
  });
  const [clientesDisponiveis, setClientesDisponiveis] = useState([]);

  // Estados do formulário
  const [cliente, setCliente] = useState('');
  const [servico, setServico] = useState('');
  const [valor, setValor] = useState('');
  const [status, setStatus] = useState('Lead');
  const [editandoId, setEditandoId] = useState(null);

  // ESTADOS DO MENU FLUTUANTE
  const [anchorEl, setAnchorEl] = useState(null);
  const [vendaParaMudarStatus, setVendaParaMudarStatus] = useState(null);
  const openMenu = Boolean(anchorEl);

  useEffect(() => {
    const clientesSalvos = localStorage.getItem('crm_clientes');
    if (clientesSalvos) setClientesDisponiveis(JSON.parse(clientesSalvos));
  }, []);

  useEffect(() => {
    localStorage.setItem('crm_vendas', JSON.stringify(vendas));
  }, [vendas]);

  const handleOpen = () => {
    setEditandoId(null);
    setCliente(''); setServico(''); setValor(''); setStatus('Lead');
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  // AÇÕES DO MENU FLUTUANTE
  const handleClickStatus = (event, venda) => {
    setAnchorEl(event.currentTarget);
    setVendaParaMudarStatus(venda);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
    setVendaParaMudarStatus(null);
  };

  const handleMudarStatusRapido = (novoStatus) => {
    if (vendaParaMudarStatus) {
      const novasVendas = vendas.map(v => 
        v.id === vendaParaMudarStatus.id ? { ...v, status: novoStatus } : v
      );
      setVendas(novasVendas);
    }
    handleCloseMenu();
  };

  const handleSalvarVenda = () => {
    if (editandoId) {
      setVendas(vendas.map(v => v.id === editandoId 
        ? { ...v, cliente, servico, valor: Number(valor), status } 
        : v
      ));
    } else {
      const novaVenda = {
        id: Date.now(),
        cliente,
        servico,
        valor: Number(valor),
        status
      };
      setVendas([novaVenda, ...vendas]);
    }
    handleClose();
  };

  const prepararEdicao = (venda) => {
    setEditandoId(venda.id);
    setCliente(venda.cliente);
    setServico(venda.servico);
    setValor(venda.valor);
    setStatus(venda.status);
    setOpen(true);
  };

  const excluirVenda = (id) => {
    if (window.confirm("Deseja excluir este registro de venda?")) {
      setVendas(vendas.filter(v => v.id !== id));
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4, alignItems: 'center' }}>
        <Typography variant="h4" sx={{ fontWeight: 700 }}>Gestão de Vendas 💰</Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={handleOpen}>Nova Venda</Button>
      </Box>

      <TableContainer component={Paper} sx={{ borderRadius: 3, border: '1px solid #e0e0e0', boxShadow: 'none' }}>
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
              <TableRow key={v.id} hover>
                <TableCell sx={{ fontWeight: 500 }}>{v.cliente}</TableCell>
                <TableCell>{v.servico}</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: '#2e7d32' }}>
                   R$ {Number(v.valor).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </TableCell>
                
                {/* CHIP COM TRIGGER DO MENU FLUTUANTE */}
                <TableCell>
                  <Chip 
                    label={statusConfig[v.status]?.label || v.status} 
                    color={statusConfig[v.status]?.color || 'default'} 
                    size="small" 
                    onClick={(e) => handleClickStatus(e, v)}
                    sx={{ 
                      fontWeight: 700, 
                      cursor: 'pointer',
                      px: 1,
                      '&:hover': { filter: 'brightness(0.9)' } 
                    }}
                  />
                </TableCell>

                <TableCell align="center">
                  <Stack direction="row" spacing={1} justifyContent="center">
                    <IconButton size="small" color="primary" onClick={() => prepararEdicao(v)}><EditIcon fontSize="small" /></IconButton>
                    <IconButton size="small" color="error" onClick={() => excluirVenda(v.id)}><DeleteIcon fontSize="small" /></IconButton>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* MENU FLUTUANTE DE STATUS */}
      <Menu
        anchorEl={anchorEl}
        open={openMenu}
        onClose={handleCloseMenu}
        PaperProps={{
          sx: { borderRadius: 2, mt: 1, boxShadow: '0px 8px 24px rgba(0,0,0,0.12)', minWidth: 200 }
        }}
      >
        <Typography variant="overline" sx={{ px: 2, py: 1, color: 'text.secondary', fontWeight: 700 }}>Mudar Estágio</Typography>
        <Divider sx={{ mb: 1 }} />
        {Object.keys(statusConfig).map((key) => (
          <MenuItem 
            key={key} 
            onClick={() => handleMudarStatusRapido(key)}
            selected={vendaParaMudarStatus?.status === key}
            sx={{ py: 1 }}
          >
            <Box sx={{ 
              width: 10, height: 10, borderRadius: '50%', 
              bgcolor: statusConfig[key].hex, 
              mr: 2 
            }} />
            <ListItemText primary={key} primaryTypographyProps={{ fontSize: '14px', fontWeight: 500 }} />
          </MenuItem>
        ))}
      </Menu>

      {/* MODAL DE CADASTRO/EDIÇÃO */}
      <Modal open={open} onClose={handleClose}>
        <Box sx={modalStyle}>
          <Typography variant="h6" sx={{ mb: 3, fontWeight: 700 }}>
            {editandoId ? 'Editar Registro' : 'Lançar Novo Negócio'}
          </Typography>
          <Stack spacing={3}>
            <FormControl fullWidth>
              <InputLabel>Selecionar Cliente</InputLabel>
              <Select value={cliente} label="Selecionar Cliente" onChange={(e) => setCliente(e.target.value)}>
                {clientesDisponiveis.map((c) => (
                  <MenuItem key={c.id} value={c.nome}>{c.nome}</MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField label="O que foi vendido?" fullWidth value={servico} onChange={(e) => setServico(e.target.value)} />
            <TextField label="Valor (R$)" fullWidth type="number" value={valor} onChange={(e) => setValor(e.target.value)} />
            
            <FormControl fullWidth>
              <InputLabel>Estágio Inicial</InputLabel>
              <Select value={status} label="Estágio Inicial" onChange={(e) => setStatus(e.target.value)}>
                {Object.keys(statusConfig).map((key) => (
                  <MenuItem key={key} value={key}>{key}</MenuItem>
                ))}
              </Select>
            </FormControl>

            <Box sx={{ display: 'flex', gap: 2, mt: 1 }}>
              <Button fullWidth onClick={handleClose} variant="outlined">Cancelar</Button>
              <Button fullWidth variant="contained" onClick={handleSalvarVenda}>
                {editandoId ? 'Atualizar' : 'Salvar Negócio'}
              </Button>
            </Box>
          </Stack>
        </Box>
      </Modal>
    </Box>
  );
}

export default Vendas;