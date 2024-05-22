import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import { IconButton } from '@mui/material';
import { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './SavedAbout.css';

const SavedAbout = () => {
    const [aboutUnitText, setAboutUnitText] = useState('Initial information about Unit 1.');
    const [isEditingAboutUnit, setIsEditingAboutUnit] = useState(false);

    const handleAboutUnitChange = (value) => {
        setAboutUnitText(value);
    };
    const handleToggleEditAboutUnit = () => {
        setIsEditingAboutUnit(!isEditingAboutUnit);
    };

    return (
        <>
            <div className="cont">
                <label className="secHeading">About Unit</label>
                <div className='icons' style={{marginLeft:'6vh'}}>
                    <IconButton onClick={handleToggleEditAboutUnit}>
                        {isEditingAboutUnit ? <CancelOutlinedIcon /> : <ModeEditOutlineIcon />}
                    </IconButton>
                </div>
            </div>

            <div className='abt'>
                {isEditingAboutUnit ? (
                    <div>
                        <ReactQuill
                            theme="snow"
                            value={aboutUnitText}
                            onChange={handleAboutUnitChange}
                            onBlur={() => setIsEditingAboutUnit(true)}
                            className="textareas"
                        />
                    </div>
                ) : (
                    <div dangerouslySetInnerHTML={{ __html: aboutUnitText }} />
                )}
            </div>
        </>
    );
};
export default SavedAbout;
