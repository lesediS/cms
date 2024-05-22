import AttachFileIcon from '@mui/icons-material/AttachFile';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import { Chip, IconButton } from '@mui/material';
import { useState } from 'react';
import '../UnitDisplay.css';
import './SavedAttachments.css';

const SavedAttachments = () => {

    const [isEditingDocuments, setIsEditingDocuments] = useState(false);
    const [documents, setDocuments] = useState([]);

    const handleFileSelect = (event) => {
        const files = Array.from(event.target.files);
        setDocuments(prev => [...prev, ...files.map(file => ({ name: file.name, file: file }))]);
    };

    const handleRemoveDocument = (docName) => {
        setDocuments(documents.filter(doc => doc.name !== docName));
    };

    const handleToggleEditDocuments = () => {
        setIsEditingDocuments(!isEditingDocuments);
    };

    return (
        <>
        <div className='attach'>

            <div className="secHeadingContainer">
                <label className="secHeading">Attachments</label>
                {isEditingDocuments && (
                    <>
                        <input
                            type="file"
                            id="fileInput"
                            style={{ display: 'none' }}
                            onChange={handleFileSelect}
                            multiple
                        />
                        <IconButton
                            onClick={() => document.getElementById('fileInput').click()}
                            style={{ marginLeft: '1em' }} /* Use em unit for margin-left */
                        >
                            <AttachFileIcon/>
                        </IconButton>
                    </>
                )}
                <div className='icons'>
                    <IconButton onClick={handleToggleEditDocuments}>
                        {isEditingDocuments ? <CancelOutlinedIcon /> : <ModeEditOutlineIcon />}
                    </IconButton>
                </div>
            </div>
            </div>


            <div className="document-container">
                {documents.map((doc, index) => (
                    <Chip
                        key={index}
                        label={doc.name}
                        onDelete={() => handleRemoveDocument(doc.name)}
                        deleteIcon={<CancelOutlinedIcon />}
                        className='file-bubble'
                    />
                ))}

            </div>
        </>
    )
}

export default SavedAttachments
