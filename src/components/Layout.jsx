import { Box } from '@mui/material';
import Sidebar from './Sidebar';

const drawerWidth = 240;

function Layout({ children }) {
  return (
    // 1. O PAI DE TODOS (Container que segura tudo)
    <Box sx={{ 
      display: 'flex', 
      minHeight: '100vh', 
      width: '100vw', // Força a largura a ser 100% da "View Width" (janela)
      bgcolor: 'background.default', // Garante que o fundo cinza cubra tudo
      overflowX: 'hidden' // Evita que apareça uma barra de rolagem lateral chata
    }}>
      
      {/* 2. SIDEBAR (Fixa na esquerda) */}
      <Sidebar drawerWidth={drawerWidth} />

      {/* 3. CONTEÚDO PRINCIPAL (Onde o Dashboard aparece) */}
      <Box
        component="main"
        sx={{
          flexGrow: 1, // Esse cara diz: "Cresça e ocupe todo o resto da tela"
          p: 3,        // Espaçamento para o conteúdo não grudar
          width: { sm: `calc(100% - ${drawerWidth}px)` }, // Cálculo exato da sobra
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {children}
      </Box>
    </Box>
  );
}

export default Layout;