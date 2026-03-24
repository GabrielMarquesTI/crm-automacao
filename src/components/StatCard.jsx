import { Paper, Typography, Box } from '@mui/material';
// Importamos todos os ícones para facilitar a escolha via string ou prop
import * as Icons from '@mui/icons-material'; 

function StatCard({ title, value, iconName, color }) {
  // Dinamicamente escolhe o ícone baseado no nome que passamos
  const IconComponent = Icons[iconName] || Icons.HelpOutline;

  return (
    <Paper 
      elevation={0} 
      sx={{ 
        p: 3, 
        display: 'flex', 
        alignItems: 'center', 
        gap: 2,
        borderRadius: '16px', // Formato consistente
        border: '1px solid',
        borderColor: 'divider', // Cor de borda que vem do tema
        transition: '0.3s',
        '&:hover': { boxShadow: '0 8px 24px rgba(0,0,0,0.1)' }
      }}
    >
      <Box sx={{ 
        p: 1.5, 
        display: 'flex',
        borderRadius: '12px', 
        backgroundColor: `${color}15`, 
        color: color 
      }}>
        <IconComponent fontSize="large" />
      </Box>
      
      <Box>
        <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 600 }}>
          {title}
        </Typography>
        <Typography variant="h5" sx={{ fontWeight: 800 }}>
          {value}
        </Typography>
      </Box>
    </Paper>
  );
}

export default StatCard;