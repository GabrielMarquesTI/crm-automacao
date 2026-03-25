import { useState, useEffect } from "react";
import {
  Typography,
  Box,
  Paper,
  Button,
  Modal,
  TextField,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link } from "react-router-dom";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: 3,
  boxShadow: 24,
  p: 4,
};

function Clientes() {
  const [open, setOpen] = useState(false);

  // 1. INICIALIZAÇÃO: Busca no LocalStorage
  const [listaClientes, setListaClientes] = useState(() => {
    const dadosSalvos = localStorage.getItem("crm_clientes");
    return dadosSalvos
      ? JSON.parse(dadosSalvos)
      : [
          {
            id: 1,
            nome: "Gabriel Marques",
            email: "gabriel@teste.com",
            telefone: "5511999999999",
            origem: "WhatsApp", // Exemplo com origem
          },
        ];
  });

  // 2. PERSISTÊNCIA
  useEffect(() => {
    localStorage.setItem("crm_clientes", JSON.stringify(listaClientes));
  }, [listaClientes]);

  // Estados do Formulário
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [origem, setOrigem] = useState(""); // Novo estado para Origem
  const [editandoId, setEditandoId] = useState(null);

  const handleOpen = () => {
    setEditandoId(null);
    setNome("");
    setEmail("");
    setTelefone("");
    setOrigem("");
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const handleSalvar = () => {
    if (editandoId) {
      setListaClientes(
        listaClientes.map((c) =>
          c.id === editandoId
            ? { ...c, nome, email, telefone: telefone.replace(/\D/g, ""), origem }
            : c,
        ),
      );
    } else {
      const novoCliente = {
        id: Date.now(),
        nome,
        email,
        telefone: telefone.replace(/\D/g, ""),
        origem, // Salva a origem no novo objeto
      };
      setListaClientes([...listaClientes, novoCliente]);
    }
    handleClose();
  };

  const prepararEdicao = (cliente) => {
    setEditandoId(cliente.id);
    setNome(cliente.nome);
    setEmail(cliente.email);
    setTelefone(cliente.telefone);
    setOrigem(cliente.origem || ""); // Carrega a origem na edição
    setOpen(true);
  };

  const excluirCliente = (id) => {
    if (window.confirm("Tem certeza que deseja excluir este cliente?")) {
      setListaClientes(listaClientes.filter((c) => c.id !== id));
    }
  };

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 700 }}>
          Gestão de Clientes 👥
        </Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={handleOpen}>
          Novo Cliente
        </Button>
      </Box>

      <TableContainer
        component={Paper}
        sx={{ borderRadius: 3, elevation: 0, border: "1px solid #e0e0e0" }}
      >
        <Table>
          <TableHead sx={{ bgcolor: "#f8f9fa" }}>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>Empresa</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>E-mail</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Contato</TableCell>
              <TableCell sx={{ fontWeight: "bold" }} align="center">Ações</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {listaClientes.map((cliente) => (
              <TableRow key={cliente.id} hover>
                <TableCell>
                  <Link
                    to={`/clientes/${cliente.id}`}
                    style={{
                      textDecoration: "none",
                      color: "#1976d2",
                      fontWeight: 600,
                    }}
                  >
                    {cliente.nome}
                  </Link>
                </TableCell>
                <TableCell>{cliente.email}</TableCell>
                <TableCell>{cliente.telefone}</TableCell>
                <TableCell align="center">
                  <Stack direction="row" spacing={1} justifyContent="center">
                    <IconButton
                      color="success"
                      component="a"
                      href={`https://wa.me/${cliente.telefone}`}
                      target="_blank"
                    >
                      <WhatsAppIcon />
                    </IconButton>
                    <IconButton
                      color="primary"
                      onClick={() => prepararEdicao(cliente)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => excluirCliente(cliente.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* MODAL DE CADASTRO/EDIÇÃO */}
      <Modal open={open} onClose={handleClose}>
        <Box sx={modalStyle}>
          <Typography variant="h6" sx={{ mb: 3, fontWeight: 700 }}>
            {editandoId ? "Editar Cliente" : "Novo Cadastro"}
          </Typography>
          <Stack spacing={2}>
            <TextField
              label="Nome da Empresa"
              fullWidth
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
            <TextField
              label="E-mail"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              label="Telefone com DDD"
              fullWidth
              value={telefone}
              onChange={(e) => setTelefone(e.target.value)}
            />

            {/* CAMPO DE ORIGEM (SELECT) */}
            <FormControl fullWidth>
              <InputLabel>Origem do Lead</InputLabel>
              <Select
                value={origem}
                label="Origem do Lead"
                onChange={(e) => setOrigem(e.target.value)}
              >
                <MenuItem value="WhatsApp">WhatsApp</MenuItem>
                <MenuItem value="Google Ads">Google Ads</MenuItem>
                <MenuItem value="Instagram">Instagram</MenuItem>
                <MenuItem value="Formulário Site">Formulário Site</MenuItem>
                <MenuItem value="Indicação">Indicação</MenuItem>
              </Select>
            </FormControl>

            <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
              <Button fullWidth onClick={handleClose} variant="outlined">
                Cancelar
              </Button>
              <Button fullWidth variant="contained" onClick={handleSalvar}>
                {editandoId ? "Atualizar" : "Salvar"}
              </Button>
            </Box>
          </Stack>
        </Box>
      </Modal>
    </Box>
  );
}

export default Clientes;