import GridViewIcon from '@mui/icons-material/GridView';
import ViewListIcon from '@mui/icons-material/ViewList';
import { IconButton } from '@mui/material';
import { useState } from 'react';
import './ViewAs.css'; 

const ViewAs = ({ onViewModeChange }) => {
    const [viewMode, setViewMode] = useState('grid'); // Initial view mode

    const handleToggleView = (mode) => {
        setViewMode(mode);
        onViewModeChange(mode); // Call the callback function with the updated mode
    };

    return (
        <div className="view-as-container">
            <IconButton
                onClick={() => handleToggleView('grid')}
                style={{
                    borderRadius: '5px',
                    color: viewMode === 'grid' ? 'white' : '#515151',
                    backgroundColor: viewMode === 'grid' ? '#07406D' : 'transparent',
                }}
                title="View as grid"
            >
                <GridViewIcon />
            </IconButton>
            <IconButton
                onClick={() => handleToggleView('list')}
                style={{
                    borderRadius: '5px',
                    color: viewMode === 'list' ? 'white' : '#515151',
                    backgroundColor: viewMode === 'list' ? '#07406D' : 'transparent',
                }}
                title="View as list"
            >
                <ViewListIcon />
            </IconButton>
        </div>
    );
};


export default ViewAs;
