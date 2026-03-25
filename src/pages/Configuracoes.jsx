import { useState } from 'react';
import { 
  Typography, Box, Paper, Tabs, Tab, TextField, 
  Button, Avatar, Stack, Divider, Switch, FormControlLabel 
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import BusinessIcon from '@mui/icons-material/Business';
import LockIcon from '@mui/icons-material/Lock';
import BuildIcon from '@mui/icons-material/Build'; // Ícone de "Dev"

function Configuracoes() {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 4, fontWeight: 700 }}>
        Configurações do Sistema ⚙️
      </Typography>

      <Paper sx={{ borderRadius: 3, overflow: 'hidden' }}>
        <Tabs 
          value={tabValue} 
          onChange={handleTabChange} 
          indicatorColor="primary" 
          textColor="primary"
          sx={{ borderBottom: 1, borderColor: 'divider', bgcolor: '#f8f9fa' }}
        >
          <Tab label="Perfil da Empresa" icon={<BusinessIcon fontSize="small" />} iconPosition="start" />
          <Tab label="Segurança" icon={<LockIcon fontSize="small" />} iconPosition="start" />
          {/* ABA RESTRITA (ADMIN/DEV) */}
          <Tab label="Painel do Desenvolvedor" icon={<BuildIcon fontSize="small" />} iconPosition="start" />
        </Tabs>

        <Box sx={{ p: 4 }}>
          {/* ABA 0: PERFIL DA EMPRESA (O que o usuário vê) */}
          {tabValue === 0 && (
            <Stack spacing={3} sx={{ maxWidth: 600 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, mb: 2 }}>
                <Avatar sx={{ width: 80, height: 80, bgcolor: 'primary.main', fontSize: 30 }}>G</Avatar>
                <Button variant="outlined" size="small">Alterar Logo</Button>
              </Box>
              
              <TextField label="Nome da Organização" fullWidth defaultValue="Minha Empresa CRM" />
              <TextField label="E-mail de Suporte" fullWidth defaultValue="suporte@empresa.com" />
              <TextField label="CNPJ / Identificação" fullWidth />
              
              <Button variant="contained" startIcon={<SaveIcon />} sx={{ width: 'fit-content' }}>
                Salvar Alterações
              </Button>
            </Stack>
          )}

          {/* ABA 1: SEGURANÇA */}
          {tabValue === 1 && (
            <Stack spacing={3} sx={{ maxWidth: 600 }}>
              <Typography variant="h6">Alterar Senha</Typography>
              <TextField label="Senha Atual" type="password" fullWidth />
              <TextField label="Nova Senha" type="password" fullWidth />
              <Divider />
              <FormControlLabel control={<Switch />} label="Autenticação em duas etapas (2FA)" />
              <Button variant="contained">Atualizar Segurança</Button>
            </Stack>
          )}

          {/* ABA 2: PAINEL DO DESENVOLVEDOR (Uso do Dev/Admin) */}
          {tabValue === 2 && (
            <Box>
              <Typography variant="h6" color="error" sx={{ mb: 2, fontWeight: 700 }}>
                ÁREA CRÍTICA - APENAS ADMINISTRADORES
              </Typography>
              <Paper variant="outlined" sx={{ p: 3, bgcolor: '#fff5f5', borderColor: '#ffc1c1' }}>
                <Stack spacing={3}>
                  <TextField 
                    label="Meta API Token (WhatsApp Business)" 
                    fullWidth 
                    type="password" 
                    helperText="Cole aqui o token gerado no painel do Facebook Developers."
                  />
                  <TextField label="ID da Conta de Negócio (WABA ID)" fullWidth />
                  <Divider />
                  <Typography variant="subtitle2">Módulos Ativos:</Typography>
                  <FormControlLabel control={<Switch defaultChecked />} label="Módulo de Vendas" />
                  <FormControlLabel control={<Switch defaultChecked />} label="Módulo de WhatsApp" />
                  <FormControlLabel control={<Switch />} label="Módulo de IA (Beta)" />
                </Stack>
              </Paper>
            </Box>
          )}
        </Box>
      </Paper>
    </Box>
  );
}

export default Configuracoes;