import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#006edc', // Azul profissional
    },
    background: {
      default: '#f4f6f8', // Cinza clarinho de fundo
      paper: '#ffffff',   // Branco para os Cards
    },
  },
  shape: {
    borderRadius: 12, // Bordas arredondadas modernas
  },
  typography: {
    fontFamily: '"Inter", "Roboto", sans-serif',
  },
});

export default theme;