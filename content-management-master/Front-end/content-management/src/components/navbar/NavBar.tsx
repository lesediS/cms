import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
import { AppBar, Box, IconButton, Toolbar, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import geeksLogo from '../../assets/Geeks4Learning-Logo-with-Slogan.png';
import './NavBar.css';

function NavBar() {
    const location = useLocation();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const titleMap = {
            '/my-courses': 'My Courses',
            '/notifications': 'Notifications',
            '/dashboard': 'Dashboard',
            '/site-admin': 'Site Admin',
        };
        document.title = titleMap[location.pathname] || 'Geeks4Learning';
    }, [location.pathname]);

    const handleMobileMenuToggle = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <AppBar position="fixed" color="default" elevation={0} className="navbar">
            <Toolbar>
                <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                    <IconButton onClick={handleMobileMenuToggle}>
                        {isMobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
                    </IconButton>
                </Box>
                <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
                    <a href="/" className="brand-logo">
                        <img src={geeksLogo} alt="G4L" className="logo smaller-logo" />
                    </a>
                    <NavLink to="/mycourses" className={`nav-link ${location.pathname === '/mycourses' ? 'active' : ''}`}>
                        My Courses
                    </NavLink>
                    <NavLink to="/notifications" className={`nav-link ${location.pathname === '/notifications' ? 'active' : ''}`}>
                        Notifications
                    </NavLink>
                    <NavLink to="/dashboard" className={`nav-link ${location.pathname === '/dashboard' ? 'active' : ''}`}>
                        Dashboard
                    </NavLink>
                    <NavLink to="/site-admin" className={`nav-link ${location.pathname === '/site-admin' ? 'active' : ''}`}>
                        Site Admin
                    </NavLink>
                </Box>
            </Toolbar>
            {isMobileMenuOpen && (
                <Box
                    sx={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '30%', // Set width to 25%
                        height: '100vh',
                        backgroundColor: 'white',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        padding: '1rem',
                        zIndex: 1,
                    }}
                >
                    <Typography variant="h6" component="div" className="brand-logo-mobile">
                        <img src={geeksLogo} alt="G4L" className="logo smaller-logo" />
                    </Typography>
                    <NavLink to="/mycourses" className={`mobile-nav-link ${location.pathname === '/mycourses' ? 'active' : ''}`}>
                        My Courses
                    </NavLink>
                    <NavLink to="/notifications" className={`mobile-nav-link ${location.pathname === '/notifications' ? 'active' : ''}`}>
                        Notifications
                    </NavLink>
                    <NavLink to="/dashboard" className={`mobile-nav-link ${location.pathname === '/dashboard' ? 'active' : ''}`}>
                        Dashboard
                    </NavLink>
                    <NavLink to="/site-admin" className={`mobile-nav-link ${location.pathname === '/site-admin' ? 'active' : ''}`}>
                        Site Admin
                    </NavLink>
                    <IconButton onClick={handleMobileMenuToggle} sx={{ position: 'absolute', top: '1rem', right: '1rem' }}>
                        <CloseIcon />
                    </IconButton>
                </Box>
            )}
        </AppBar>
    );
}

export default NavBar;
