import React, { useState } from 'react';
import { Button, Container, Typography } from "@mui/material";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import CloseIcon from '@mui/icons-material/Close';
import ExtraMaterialSection from './extraMaterial/ExtraMaterial';
import FileManager from './fileManagement/FileManager';
import InlineEdit from './inlineEdit/InlineEdit';
import ReactQuill from 'react-quill';
import YouTubeLinkManager from './youtubeLinks/YouTubeLinkManager';
import axios from 'axios';
import './Unit.css';

const Unit = ({ unitsList, setUnitsList }) => {
    const [introText, setIntroText] = useState('');
    const [youTubeLinks, setYouTubeLinks] = useState([]);
    const [extraMaterials, setExtraMaterials] = useState([]);
    const [unitName, setUnitName] = useState('Unit 1');
    const [selectedFiles, setSelectedFiles] = useState([]);

    const addMaterial = () => {
        setExtraMaterials([...extraMaterials, { title: '', information: '', attachments: [] }]);
    };

    const removeMaterial = (index) => {
        setExtraMaterials(extraMaterials.filter((_, i) => i !== index));
    };

    const saveDataToServer = async () => {
        try {
            // Your save logic here...
            // Assuming you have successfully saved the unit data to the server

            // Add the saved unit to the unitsList
            const newUnit = {
                unitName,
                introText,
                youTubeLinks,
                selectedFiles,
                extraMaterials
            };
            setUnitsList([...unitsList, newUnit]);

            resetUnit();
        } catch (error) {
            console.error('Error:', error);
            // Handle errors, such as displaying an error message to the user
        }
    };

    const resetUnit = () => {
        setIntroText("");
        setUnitName('New Unit');
        setYouTubeLinks([]);
        setExtraMaterials([]);
        setSelectedFiles([]);
    };

    return (
        <>
            <Container className='container'>
                <Typography variant="h4" gutterBottom sx={{ textAlign: 'left', fontSize: '25px' }}>Unit Builder</Typography>
                <hr className="divider" />

                <div className='aligned'>
                    <div>
                        <InlineEdit value={unitName} setValue={setUnitName} />
                        <Button
                            variant="contained"
                            sx={{
                                backgroundColor: '#07406D',
                                color: 'white',
                                fontWeight: 'bold',
                                height: '55px',
                                width: '25%',
                                marginRight: '5vh',
                                marginLeft: '2em',
                            }}
                            onClick={addMaterial}
                        >
                            <AddCircleOutlineIcon />
                            &nbsp;Add Additional Material
                        </Button>

                    </div>

                    <div>
                        <label className="secHeading" style={{ marginTop: '5vh', marginBottom: '20px' }}>About Unit</label>
                        <ReactQuill
                            theme="snow"
                            value={introText}
                            placeholder=''
                            onChange={setIntroText}
                            className='text-area' />
                    </div>

                    <div>
                        <FileManager selectedFiles={selectedFiles} setSelectedFiles={setSelectedFiles} />
                    </div>

                    <div>
                        <YouTubeLinkManager youTubeLinks={youTubeLinks} setYouTubeLinks={setYouTubeLinks} />
                    </div>

                    {extraMaterials.map((material, index) => (
                        <ExtraMaterialSection
                            key={index}
                            extraMaterial={material}
                            setExtraMaterial={(updatedMaterial) => {
                                const updatedExtraMaterials = [...extraMaterials];
                                updatedExtraMaterials[index] = updatedMaterial;
                                setExtraMaterials(updatedExtraMaterials);
                            }}
                            onDelete={() => removeMaterial(index)}
                        />
                    ))}
                </div>

                <div className='btns'>
                    <Button
                        variant="contained"
                        onClick={saveDataToServer}
                        sx={{
                            backgroundColor: '#07406D',
                            color: 'white',
                            fontWeight: 'bold',
                            height: '45px',
                            width: '8.5em',
                            marginBottom: '10px',
                        }}
                    >
                        <AddCircleOutlineIcon />
                        &nbsp;Save
                    </Button>
                    <Button
                        variant="contained"
                        onClick={resetUnit}
                        sx={{
                            backgroundColor: '#07406D',
                            color: 'white',
                            fontWeight: 'bold',
                            height: '45px',
                            width: 'auto',
                            marginBottom: '10px',
                        }}
                    >
                        <CancelOutlinedIcon />
                        &nbsp;Cancel
                    </Button>
                </div>
            </Container>
        </>
    );
}

export default Unit;
