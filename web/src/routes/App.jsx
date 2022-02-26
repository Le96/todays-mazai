import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  createTheme,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ThemeProvider,
  Toolbar,
  Typography,
} from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import FiberNewIcon from '@mui/icons-material/FiberNew';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import LeaderBoardIcon from '@mui/icons-material/Leaderboard';
import MenuIcon from '@mui/icons-material/Menu';

import AppBar from '../components/AppBar';
import DrawerHeader from '../components/DrawerHeader';
import Main, { drawerWidth } from '../components/Main';
import LoginDialog from '../components/dialog/LoginDialog';

import About from './About';
import Latest from './Latest';
import Leaderboard from './Leaderboard';
import MainPage from './MainPage';

const checkDarkMode = () => {
  let strDarkMode = localStorage.getItem('darkMode');
  if (!strDarkMode || (strDarkMode !== 'on' && strDarkMode !== 'off')) {
    localStorage.setItem('darkMode', 'off');
    strDarkMode = localStorage.getItem('darkMode');
  }
  return strDarkMode === 'on';
};

export default function App() {
  const [darkMode, setDarkMode] = useState(checkDarkMode);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [page, setPage] = useState('Top');

  const navigate = useNavigate();

  const lightTheme = createTheme();
  const darkTheme = createTheme({ palette: { mode: 'dark' } });

  const theme = darkMode ? darkTheme : lightTheme;
  const modeChangeIcon = darkMode ? <Brightness7Icon /> : <Brightness4Icon />;

  useEffect(() => {
    if (!loading) return;
    setLoading(false);
  }, [loading]);

  const handleDarkMode = () => {
    localStorage.setItem('darkMode', darkMode ? 'off' : 'on');
    setDarkMode(!darkMode);
  };

  const handleDrawerOpen = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleModalOpen = () => {
    setDialogOpen(!dialogOpen);
  };

  const handlePage = (newPage) => {
    setPage(newPage);
    navigate(newPage.toLowerCase(), { replace: true });
  };

  const subPages = [
    { text: 'Top', icon: <HomeIcon />, page: <MainPage /> },
    { text: 'About', icon: <InfoIcon />, page: <About /> },
    { text: 'Latest', icon: <FiberNewIcon />, page: <Latest /> },
    { text: 'Leaderboard', icon: <LeaderBoardIcon />, page: <Leaderboard /> },
  ];

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ flexGrow: 1 }}>
        <AppBar color="success" open={drawerOpen} position="fixed">
          <Toolbar>
            <IconButton
              aria-label="menu"
              color="inherit"
              edge="start"
              onClick={handleDrawerOpen}
              size="large"
              sx={{ mr: 1, ...(drawerOpen && { display: 'none' }) }}
            >
              <MenuIcon />
            </IconButton>
            <Typography component="div" variant="h5" sx={{ mr: 1, flexGrow: 1 }}>
              #TodaysMazai
            </Typography>
            <IconButton color="inherit" onClick={handleDarkMode} sx={{ ml: 1 }}>
              {modeChangeIcon}
            </IconButton>
            <Button color="inherit" onClick={handleModalOpen}>Login</Button>
          </Toolbar>
        </AppBar>
        <Toolbar />
      </Box>
      <Drawer
        anchor="left"
        open={drawerOpen}
        variant="persistent"
        sx={{
          flexShrink: 0,
          width: drawerWidth,
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: drawerWidth,
          },
        }}
      >
        <DrawerHeader>
          <IconButton color="inherit" onClick={handleDrawerOpen}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {subPages.map((subPage) => (
            <ListItemButton
              color="inherit"
              key={subPage.text}
              onClick={() => handlePage(subPage.text)}
              selected={page === subPage.text}
              value={subPage.text}
            >
              <ListItemIcon>{subPage.icon}</ListItemIcon>
              <ListItemText>{subPage.text}</ListItemText>
            </ListItemButton>
          ))}
          <Divider />
          <ListItemButton color="inherit" onClick={handleDarkMode}>
            <ListItemIcon>{modeChangeIcon}</ListItemIcon>
            <ListItemText>{`${darkMode ? 'Light' : 'Dark'} Mode`}</ListItemText>
          </ListItemButton>
        </List>
      </Drawer>
      <Main open={drawerOpen}>
        <Box sx={{ mx: 2 }}>
          <Outlet context={[darkMode]} />
        </Box>
      </Main>
      <LoginDialog open={dialogOpen} setOpen={setDialogOpen} />
    </ThemeProvider>
  );
}
