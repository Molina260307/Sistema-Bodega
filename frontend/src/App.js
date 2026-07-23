import React, { useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { AppBar, Toolbar, Typography, IconButton, Drawer, List, ListItem, ListItemText, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import theme from './theme';
import FormIngreso from './components/FormIngreso';
import Dashboard from './pages/Dashboard';
import logo from './assets/logoexpo.jpeg'; // 👈 importa tu logo
import ReporteCBM from './pages/ReporteCBM';


function App() {
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState('dashboard');

  const toggleDrawer = () => setOpen(!open);
  const handleNavigation = (pageName) => { setPage(pageName); setOpen(false); };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex' }}>
        <AppBar position="fixed" color="primary">
          <Toolbar>
            <IconButton color="inherit" edge="start" onClick={toggleDrawer}>
              <MenuIcon />
            </IconButton>
            <img src={logo} alt="Logo Empresa" style={{ height: 40, marginRight: 10 }} />
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              Sistema de Bodega
            </Typography>
          </Toolbar>
        </AppBar>

        <Drawer anchor="left" open={open} onClose={toggleDrawer}>
          <List>
            <ListItem button onClick={() => handleNavigation('dashboard')}>
              <ListItemText primary="Dashboard" />
            </ListItem>
            <ListItem button onClick={() => handleNavigation('ingreso')}>
              <ListItemText primary="Registrar Ingreso" />
            </ListItem>
            <ListItem button onClick={() => handleNavigation('reporte')}>
            <ListItemText primary="Reporte CBM" />
          </ListItem>

          </List>
        </Drawer>

        <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 8 }}>
          {page === 'dashboard' && <Dashboard />}
          {page === 'ingreso' && <FormIngreso />}
          {page === 'reporte' && <ReporteCBM />}

        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;
