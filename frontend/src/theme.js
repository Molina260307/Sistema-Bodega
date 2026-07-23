import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: { main: '#0A3D62' },   // azul corporativo
    secondary: { main: '#F39C12' }, // dorado acento
    background: { default: '#F4F6F8' }, // gris claro
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
    h6: { fontWeight: 600, color: '#0A3D62' },
    body1: { fontSize: '1rem', color: '#333' },
  },
});

export default theme;
