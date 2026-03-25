import { 
  Typography, Box, Paper, Grid, TextField, 
  Button, Switch, FormControlLabel, Divider, Chip, Stack 
} from '@mui/material';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import SaveIcon from '@mui/icons-material/Save';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';

function AutomacaoWhats() {
  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 4, fontWeight: 700 }}>
        Automação WhatsApp 🤖
      </Typography>

      <Grid container spacing={3}>
        {/* CARD DE CONEXÃO */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, borderRadius: 3, textAlign: 'center', height: '100%' }}>
            <WhatsAppIcon sx={{ fontSize: 60, color: '#25D366', mb: 2 }} />
            <Typography variant="h6" fontWeight={700}>Status da Instância</Typography>
            <Chip 
              label="Desconectado" 
              color="error" 
              sx={{ my: 2, fontWeight: 'bold' }} 
            />
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Escaneie o QR Code para conectar o seu WhatsApp ao CRM.
            </Typography>
            <Button 
              variant="contained" 
              fullWidth 
              startIcon={<QrCodeScannerIcon />}
              sx={{ bgcolor: '#25D366', '&:hover': { bgcolor: '#128C7E' } }}
            >
              Gerar QR Code
            </Button>
          </Paper>
        </Grid>

        {/* CONFIGURAÇÃO DE MENSAGENS */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3, borderRadius: 3 }}>
            <Typography variant="h6" sx={{ mb: 3, fontWeight: 700 }}>
              Mensagens Automáticas
            </Typography>

            <Stack spacing={4}>
              {/* MENSAGEM DE BOAS VINDAS */}
              <Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                  <Typography fontWeight={600}>Boas-vindas (Novo Cliente)</Typography>
                  <FormControlLabel control={<Switch defaultChecked />} label="Ativo" />
                </Box>
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  placeholder="Olá [NOME], seja bem-vindo à nossa empresa! Como podemos ajudar?"
                  helperText="Use [NOME] para personalizar automaticamente."
                />
              </Box>

              <Divider />

              {/* MENSAGEM DE COBRANÇA/VENCIMENTO */}
              <Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                  <Typography fontWeight={600}>Lembrete de Vencimento</Typography>
                  <FormControlLabel control={<Switch />} label="Ativo" />
                </Box>
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  placeholder="Olá [NOME], sua fatura de [VALOR] vence amanhã. Segue o link para pagamento..."
                />
              </Box>

              <Button 
                variant="contained" 
                startIcon={<SaveIcon />} 
                sx={{ alignSelf: 'flex-end', px: 4 }}
              >
                Salvar Configurações
              </Button>
            </Stack>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default AutomacaoWhats;