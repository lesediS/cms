import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import { IconButton, TextField } from '@mui/material';
import { useState } from 'react';
import NavBar from "../../navbar/NavBar";
import SavedAbout from './about/SavedAbout';
import SavedAttachments from './attachments/SavedAttachments';
import './UnitDisplay.css';
import SavedVideos from './videos/SavedVideos';

const UnitDisplay = () => {
    const [unitName, setUnitName] = useState('Unit 1');
    const [isEditingName, setIsEditingName] = useState(false);

    const handleToggleEditName = () => {
        setIsEditingName(!isEditingName);
    };

    const handleNameChange = (event) => {
        setUnitName(event.target.value);
    };

    const handleNameKeyDown = (event) => {
        if (event.key === 'Enter' || event.type === 'blur') {
            setIsEditingName(false);
        }
    };

    return (
        <>
            <NavBar />

            <div className='container'>
                <div className='inline-edit-container'>
                    {isEditingName ? (
                        <div className="input-field-container">
                            <TextField
                                value={unitName}
                                onChange={handleNameChange}
                                onBlur={() => setIsEditingName(false)}
                                onKeyDown={handleNameKeyDown}
                                autoFocus
                                fullWidth
                                variant="outlined"
                            />
                            <IconButton onClick={handleToggleEditName}>
                                <CancelOutlinedIcon />
                            </IconButton>
                        </div>
                    ) : (
                        <>
                            <h1>{unitName}</h1>
                            <IconButton onClick={handleToggleEditName}>
                                <ModeEditOutlineIcon />
                            </IconButton>
                        </>
                    )}
                </div>
                <hr className="hr-divider" />

                <SavedAbout />

                <SavedAttachments />

                <SavedVideos />

            </div>
        </>
    );
};

export default UnitDisplay;