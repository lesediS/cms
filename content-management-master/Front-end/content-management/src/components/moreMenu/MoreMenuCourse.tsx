import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import { IconButton, Menu, MenuItem } from '@mui/material';
import axios from 'axios';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './Moremenu.css';

export default function MoreMenu({ courseId, onDelete }) {
    const location = useLocation();
    const [anchorEl, setAnchorEl] = useState(null); // Anchor element for Menu
    const openMenu = Boolean(anchorEl);


    const handleClickMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    const handleAdd = () => {
        const currentPage = location.pathname;
        if (currentPage.includes('/site-admin/course-management/course-content')) {
            window.open('/site-admin/course-management/module-content', '_blank');
            handleCloseMenu();
        } else {
            handleCloseMenu();
            window.open('/add-unit', '_blank');
        }
        console.log('moremenu course');
    };

    const handleEditCourse = () => {
        handleCloseMenu(); // Close the menu
        // Add logic to handle editing the course
    };

    const handleDeleteCourse = async (courseId) => { // Use courseId prop here
        try {
            const response = await axios.delete(`http://localhost:8080/content-management/courses/${courseId}`);
            console.log('Course deleted:', response.data);
            onDelete(); // Call the onDelete function passed from the parent component
        } catch (error) {
            console.error('Error deleting course: ', error);
        }
        handleCloseMenu();
    };

    return (
        <div style={{ position: 'absolute', top: '20px', right: '8px' }}>
            <IconButton
                className='btn-more'
                aria-label="more"
                aria-controls="course-menu"
                aria-haspopup="true"
                onClick={handleClickMenu}
            >
                <MoreVertOutlinedIcon />
            </IconButton>
            <Menu
                className='menu'
                id="course-menu"
                anchorEl={anchorEl}
                keepMounted
                open={openMenu}
                onClose={handleCloseMenu}
            >
                <MenuItem onClick={handleEditCourse} className='menu-item'>Edit</MenuItem>
                <MenuItem onClick={handleDeleteCourse} className='menu-item'>Delete</MenuItem>
                <MenuItem className='menu-item' onClick={handleAdd}>Add</MenuItem>
            </Menu>
        </div>
    );
}
