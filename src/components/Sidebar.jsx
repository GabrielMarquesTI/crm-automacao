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
import { Link } from "react-router-dom";

// Importação dos Ícones (O "tempero" visual do CRM)
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import SettingsIcon from "@mui/icons-material/Settings";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";

function Sidebar({ drawerWidth }) {
  // Lista de itens do menu para deixar o código limpo (DRY - Don't Repeat Yourself)
  const menuItems = [
    { text: "Dashboard", icon: <DashboardIcon color="primary" />, path: "/" },
    { text: "Clientes", icon: <PeopleIcon />, path: "/clientes" },
    { text: "Vendas", icon: <PointOfSaleIcon />, path: "/vendas" },
    {
      text: "Automação Whats",
      icon: <WhatsAppIcon sx={{ color: "#25D366" }} />,
      path: "/whats",
    },
  ];

  return (
    <Drawer
      variant="permanent" // "Permanent" faz ela ficar sempre visível no Desktop
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: "border-box",
          backgroundColor: "#ffffff", // Fundo branco limpo igual sua foto
          borderRight: "1px solid #e0e0e0", // Linha sutil separando do conteúdo
        },
      }}
    >
      <Toolbar>
        {/* LOGO DO SEU CRM */}
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
          {menuItems.map((item) => (
            <ListItem key={item.text} disablePadding>
              {/* O segredo está aqui: o component={Link} e o to={item.path} */}
              <ListItemButton
                component={Link}
                to={item.path}
                sx={{ py: 1.5, "&:hover": { backgroundColor: "#f0f7ff" } }}
              >
                <ListItemIcon sx={{ minWidth: 45, color: "primary.main" }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.text}
                  primaryTypographyProps={{ fontSize: "14px", fontWeight: 500 }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        <Divider sx={{ my: 2 }} />

        {/* ÁREA DE CONFIGURAÇÕES (Separada por uma linha) */}

        <List>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText
                primary="Configurações"
                primaryTypographyProps={{ fontSize: "14px" }}
              />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
}

export default Sidebar;
