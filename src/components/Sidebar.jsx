import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  Divider,
  Box,
} from "@mui/material";
import { Link, useLocation } from "react-router-dom"; // Importamos o useLocation

import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import SettingsIcon from "@mui/icons-material/Settings";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import PollIcon from '@mui/icons-material/Poll';

function Sidebar({ drawerWidth }) {
  const location = useLocation(); // Esse hook nos dá o "endereço" atual da URL

  const menuItems = [
    { text: "Dashboard", icon: <DashboardIcon />, path: "/" },
    { text: "Clientes", icon: <PeopleIcon />, path: "/clientes" },
    { text: "Vendas", icon: <PointOfSaleIcon />, path: "/vendas" },
    {text: "Metricas", icon: < PollIcon />, path: "/metricas"},
    { text: "Automação Whats", icon: <WhatsAppIcon />, path: "/whats"},
    
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: "border-box",
          backgroundColor: "#ffffff",
          borderRight: "1px solid #e0e0e0",
        },
      }}
    >
      <Toolbar>
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{ fontWeight: 800, color: "primary.main" }}
        >
          SUAEMPRESA.CRM
        </Typography>
      </Toolbar>

      <Box sx={{ overflow: "auto", mt: 2 }}>
        <List>
          {menuItems.map((item) => {
            // Lógica de verificação: se o path do item for igual ao da URL
            const isActive = location.pathname === item.path;

            return (
              <ListItem key={item.text} disablePadding>
                <ListItemButton
                  component={Link}
                  to={item.path}
                  selected={isActive} // Avisa ao MUI que este item está selecionado
                  sx={{
                    py: 1.5,
                    // Estilo quando está ATIVO
                    backgroundColor: isActive ? "rgba(0, 110, 220, 0.08)" : "transparent",
                    color: isActive ? "primary.main" : "text.secondary",
                    borderRight: isActive ? "4px solid #006edc" : "none",
                    "&:hover": { 
                      backgroundColor: isActive ? "rgba(0, 110, 220, 0.12)" : "#f0f7ff" 
                    },
                  }}
                >
                  <ListItemIcon 
                    sx={{ 
                      minWidth: 45, 
                      color: isActive ? "primary.main" : "inherit" 
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.text}
                    primaryTypographyProps={{ 
                      fontSize: "14px", 
                      fontWeight: isActive ? 700 : 500 
                    }}
                  />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>

        <Divider sx={{ my: 2 }} />

        <List>
          <ListItem disablePadding>
            {/* Podemos aplicar a mesma lógica aqui caso crie a rota /config */}
            <ListItemButton 
              component={Link} 
              to="/config"
              selected={location.pathname === "/config"}
            >
              <ListItemIcon>
                <SettingsIcon color={location.pathname === "/config" ? "primary" : "inherit"} />
              </ListItemIcon>
              <ListItemText
                primary="Configurações"
                primaryTypographyProps={{ 
                  fontSize: "14px",
                  fontWeight: location.pathname === "/config" ? 700 : 400
                }}
              />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
}

export default Sidebar;