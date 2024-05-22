import AttachFileIcon from '@mui/icons-material/AttachFile';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton, Typography } from '@mui/material';
import './FileManager.css'; // Ensure the styles are imported

const FileManager = ({ selectedFiles, setSelectedFiles }) => {
    const handleFileChange = (event) => {
        const newFiles = Array.from(event.target.files);
        setSelectedFiles((prevFiles) => [...prevFiles, ...newFiles]);
    };

    const removeFile = (index) => {
        const updatedFiles = selectedFiles.filter((_, i) => i !== index);
        setSelectedFiles(updatedFiles);
    };

    const displayFileNames = (files) => {
        if (files.length === 0) return null;
        return (
            <div className="file-container">
                {files.map((file, index) => (
                    <div key={index} className="file-bubble">
                        {file.name}
                        <IconButton size="small" onClick={() => removeFile(index)} className="file-bubble-icon">
                            <DeleteIcon />
                        </IconButton>
                    </div>
                ))}
            </div>
        );
    };

    return (
        <div>
            <Typography variant="h6" component="h6" fontSize='28px' marginTop='5vh' marginLeft='2vh' sx={{ display: 'flex', alignItems: 'center' }}>
                Attachments
                <IconButton sx={{ marginLeft: '10px' }} onClick={() => document.getElementById('fileInput').click()}>
                    <AttachFileIcon />
                </IconButton>
            </Typography>
            <input
                id="fileInput"
                type="file"
                multiple
                onChange={handleFileChange}
                style={{ display: 'none' }}
            />
            {selectedFiles.length > 0 && displayFileNames(selectedFiles)}
        </div>
    );
};

export default FileManager;
