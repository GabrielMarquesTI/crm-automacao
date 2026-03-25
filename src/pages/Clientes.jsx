import { useState, useEffect } from 'react'; // 1. useEffect importado
import { 
  Typography, Box, Paper, Button, Modal, 
  TextField, Stack, Table, TableBody, 
  TableCell, TableContainer, TableHead, TableRow, IconButton 
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const modalStyle = {
  position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
  width: 400, bgcolor: 'background.paper', borderRadius: 3, boxShadow: 24, p: 4,
};

function Clientes() {
  const [open, setOpen] = useState(false);

  // 2. INICIALIZAÇÃO: Busca no LocalStorage ou começa vazio
  const [listaClientes, setListaClientes] = useState(() => {
    const dadosSalvos = localStorage.getItem('crm_clientes');
    return dadosSalvos ? JSON.parse(dadosSalvos) : [
      { id: 1, nome: 'Gabriel Marques', email: 'gabriel@teste.com', telefone: '5511999999999' }
    ];
  });

  // 3. PERSISTÊNCIA: Salva sempre que a lista mudar
  useEffect(() => {
    localStorage.setItem('crm_clientes', JSON.stringify(listaClientes));
  }, [listaClientes]);

  // Estados do Formulário
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [editandoId, setEditandoId] = useState(null);

  const handleOpen = () => {
    setEditandoId(null);
    setNome(''); setEmail(''); setTelefone('');
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const handleSalvar = () => {
    if (editandoId) {
      setListaClientes(listaClientes.map(c => 
        c.id === editandoId ? { ...c, nome, email, telefone: telefone.replace(/\D/g, '') } : c
      ));
    } else {
      const novoCliente = { id: Date.now(), nome, email, telefone: telefone.replace(/\D/g, '') };
      setListaClientes([...listaClientes, novoCliente]);
    }
    handleClose();
  };

  const prepararEdicao = (cliente) => {
    setEditandoId(cliente.id);
    setNome(cliente.nome);
    setEmail(cliente.email);
    setTelefone(cliente.telefone);
    setOpen(true);
  };

  const excluirCliente = (id) => {
    if (window.confirm("Tem certeza que deseja excluir este cliente?")) {
      setListaClientes(listaClientes.filter(c => c.id !== id));
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 700 }}>Gestão de Clientes 👥</Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={handleOpen}>Novo Cliente</Button>
      </Box>

      <TableContainer component={Paper} sx={{ borderRadius: 3, elevation: 0, border: '1px solid #e0e0e0' }}>
        <Table>
          <TableHead sx={{ bgcolor: '#f8f9fa' }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>Nome</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>E-mail</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Telefone</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }} align="center">Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {listaClientes.map((cliente) => (
              <TableRow key={cliente.id}>
                <TableCell>{cliente.nome}</TableCell>
                <TableCell>{cliente.email}</TableCell>
                <TableCell>{cliente.telefone}</TableCell>
                <TableCell align="center">
                  <Stack direction="row" spacing={1} justifyContent="center">
                    <IconButton color="success" component="a" href={`https://wa.me/${cliente.telefone}`} target="_blank">
                      <WhatsAppIcon />
                    </IconButton>
                    <IconButton color="primary" onClick={() => prepararEdicao(cliente)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton color="error" onClick={() => excluirCliente(cliente.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Modal open={open} onClose={handleClose}>
        <Box sx={modalStyle}>
          <Typography variant="h6" sx={{ mb: 3, fontWeight: 700 }}>
            {editandoId ? 'Editar Cliente' : 'Novo Cadastro'}
          </Typography>
          <Stack spacing={2}>
            <TextField label="Nome Completo" fullWidth value={nome} onChange={(e) => setNome(e.target.value)} />
            <TextField label="E-mail" fullWidth value={email} onChange={(e) => setEmail(e.target.value)} />
            <TextField label="Telefone" fullWidth value={telefone} onChange={(e) => setTelefone(e.target.value)} />

            <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
              <Button fullWidth onClick={handleClose} variant="outlined">Cancelar</Button>
              <Button fullWidth variant="contained" onClick={handleSalvar}>
                {editandoId ? 'Atualizar' : 'Salvar'}
              </Button>
            </Box>
          </Stack>
        </Box>
      </Modal>
    </Box>
  );
}

export default Clientes;