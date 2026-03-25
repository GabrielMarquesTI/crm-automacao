import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { 
  Typography, Box, Paper, Grid, Button, Avatar, 
  Chip, Stack, Divider, List, ListItem, ListItemText, ListItemIcon 
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import AdsClickIcon from '@mui/icons-material/AdsClick';
import InstagramIcon from '@mui/icons-material/Instagram';
import LanguageIcon from '@mui/icons-material/Language';
import GroupIcon from '@mui/icons-material/Group';

function ClienteDetalhes() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [cliente, setCliente] = useState(null);

  useEffect(() => {
    const clientesSalvos = localStorage.getItem('crm_clientes');
    if (clientesSalvos) {
      const lista = JSON.parse(clientesSalvos);
      const encontrado = lista.find(c => c.id === Number(id));
      
      if (encontrado) {
        // Se o cliente não tiver origem (cadastros antigos), definimos 'Não Informada'
        setCliente({
          ...encontrado,
          origem: encontrado.origem || 'Não Informada',
          totalGasto: 'R$ 0,00', // Isso vira dinâmico quando conectarmos com Vendas
          dataCadastro: new Date(encontrado.id).toLocaleDateString('pt-BR')
        });
      }
    }
  }, [id]);

  // Função para escolher o ícone baseado na origem
  const getOrigemIcon = (origem) => {
    switch (origem) {
      case 'WhatsApp': return <WhatsAppIcon color="success" />;
      case 'Google Ads': return <AdsClickIcon color="info" />;
      case 'Instagram': return <InstagramIcon sx={{ color: '#E1306C' }} />;
      case 'Formulário Site': return <LanguageIcon color="action" />;
      case 'Indicação': return <GroupIcon color="primary" />;
      default: return <AdsClickIcon />;
    }
  };

  if (!cliente) return <Typography p={4}>Cliente não encontrado.</Typography>;

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4 }}>
        <Button startIcon={<ArrowBackIcon />} onClick={() => navigate('/clientes')}>
          Voltar
        </Button>
        <Typography variant="h4" sx={{ fontWeight: 700 }}>{cliente.nome}</Typography>
        <Chip label="Lead" variant="outlined" />
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Stack spacing={3}>
            <Paper sx={{ p: 3, borderRadius: 3, textAlign: 'center' }}>
              <Avatar sx={{ width: 80, height: 80, bgcolor: 'primary.main', fontSize: 30, mx: 'auto', mb: 2 }}>
                {cliente.nome.charAt(0)}
              </Avatar>
              <Typography variant="h6">{cliente.nome}</Typography>
              <Typography variant="body2" color="text.secondary">{cliente.email}</Typography>
              <Button 
                variant="contained" 
                startIcon={<WhatsAppIcon />} 
                color="success" 
                fullWidth 
                sx={{ mt: 3 }}
                href={`https://wa.me/${cliente.telefone}`}
                target="_blank"
              >
                Chamar no Whats
              </Button>
            </Paper>

            <Paper sx={{ p: 3, borderRadius: 3 }}>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>Origem do Lead</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                {getOrigemIcon(cliente.origem)}
                <Typography variant="h6" fontWeight={600}>{cliente.origem}</Typography>
              </Box>
              
              <Divider sx={{ my: 2 }} />
              
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>Total em Compras</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'success.main' }}>
                <AttachMoneyIcon />
                <Typography variant="h5" fontWeight={700}>{cliente.totalGasto}</Typography>
              </Box>
            </Paper>
          </Stack>
        </Grid>

        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3, borderRadius: 3, minHeight: '400px' }}>
            <Typography variant="h6" sx={{ mb: 3, fontWeight: 700 }}>Linha do Tempo</Typography>
            <List>
              <ListItem>
                <ListItemIcon>{getOrigemIcon(cliente.origem)}</ListItemIcon>
                <ListItemText 
                  primary={`Lead capturado via ${cliente.origem}`} 
                  secondary={`Data do registro: ${cliente.dataCadastro}`} 
                />
              </ListItem>
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default ClienteDetalhes;