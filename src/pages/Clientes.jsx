import { Typography, Box, Paper } from '@mui/material';

function Clientes() {
  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 4, fontWeight: 700 }}>
        Gerenciamento de Clientes 👥
      </Typography>
      <Paper sx={{ p: 4 }}>
        <Typography>Em breve, aqui teremos a lista completa e filtros de busca.</Typography>
      </Paper>
    </Box>
  );
}

export default Clientes;