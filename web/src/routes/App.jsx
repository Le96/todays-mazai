import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import {
  Box,
  Button,
  createTheme,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
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
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState('Top');

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

  const handleOpen = () => {
    setOpen(!open);
  };

  const handlePage = (newPage) => {
    setPage(newPage);
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
        <AppBar color="success" open={open} position="fixed">
          <Toolbar>
            <IconButton aria-label="menu" color="inherit" edge="start" onClick={handleOpen} size="large" sx={{ mr: 1, ...(open && { display: 'none' }) }}>
              <MenuIcon />
            </IconButton>
            <Typography component="div" variant="h5" sx={{ mr: 1, flexGrow: 1 }}>
              #TodaysMazai
            </Typography>
            <IconButton color="inherit" onClick={handleDarkMode} sx={{ ml: 1 }}>
              {modeChangeIcon}
            </IconButton>
            <Button color="inherit">Login</Button>
          </Toolbar>
        </AppBar>
        <Toolbar />
      </Box>
      <Drawer
        anchor="left"
        open={open}
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
          <IconButton color="inherit" onClick={handleOpen}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {subPages.map((subPage) => (
            <ListItem button color="inherit" key={subPage.text} onClick={() => handlePage(subPage.text)} value={subPage.text}>
              <ListItemIcon>{subPage.icon}</ListItemIcon>
              <ListItemText>{subPage.text}</ListItemText>
            </ListItem>
          ))}
          <Divider />
          <ListItem button color="inherit" onClick={handleDarkMode}>
            <ListItemIcon>{modeChangeIcon}</ListItemIcon>
            <ListItemText>{`${darkMode ? 'Light' : 'Dark'} Mode`}</ListItemText>
          </ListItem>
        </List>
      </Drawer>
      <Main open={open}>
        <Box sx={{ m: 2 }}>
          {page && subPages.map((subpage) => page === subpage.text && subpage.page)}
          <Outlet />
        </Box>
      </Main>
    </ThemeProvider>
  );
}
