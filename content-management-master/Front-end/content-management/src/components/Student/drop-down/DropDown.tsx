import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { IconButton, Menu, MenuItem } from "@mui/material";
import { useState, useEffect } from 'react';
import './drop-down.css';

const DropDown = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [arrowDirection, setArrowDirection] = useState('down');
    const [documents, setDocuments] = useState([]);

    useEffect(() => {
        // Fetch document data from backend on component mount
        fetch('/api/documents') // Replace with your API endpoint
            .then(response => response.json())
            .then(data => setDocuments(data));
    }, []);

    const handleDownload = (document) => {
        // Implement download logic using the document URL
        window.open(document.url, '_blank'); // Example: open in new tab
    };

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
        setArrowDirection(arrowDirection === 'down' ? 'up' : 'down');
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div className={`dropdown ${Boolean(anchorEl) ? 'open' : ''}`}>
            <IconButton
                aria-controls="download-menu"
                aria-haspopup="true"
                onClick={handleClick}
                sx={{ marginRight: '1em' }}
            >
                <ExpandMoreIcon className="arrow-down" />
            </IconButton>
            <Menu
                id="download-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                sx={{ maxWidth: '250px' }}
            >
                {documents.map(document => (
                    <MenuItem key={document.id} onClick={() => handleDownload(document)}>
                        {document.name}
                    </MenuItem>
                ))}
            </Menu>
        </div>
    );
};

export default DropDown