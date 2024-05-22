import AttachFileIcon from '@mui/icons-material/AttachFile';
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Box, IconButton, Typography } from '@mui/material';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import InlineEdit from '../inlineEdit/InlineEdit';
import './ExtraMaterial.css';

const ExtraMaterialSection = ({ extraMaterial, setExtraMaterial, onDelete }) => {
    const handleEMatTitleChange = (value) => {
        setExtraMaterial({ ...extraMaterial, title: value });
    };

    const handleExtraMatIntroTextChange = (value) => {
        setExtraMaterial({ ...extraMaterial, information: value });
    };

    const handleAttachmentChange = (event) => {
        const newFiles = Array.from(event.target.files).map(file => ({ name: file.name, file: file }));
        setExtraMaterial({ ...extraMaterial, attachments: [...extraMaterial.attachments, ...newFiles] });
    };

    const handleRemoveAttachment = (index) => {
        const filteredAttachments = extraMaterial.attachments.filter((_, i) => i !== index);
        setExtraMaterial({ ...extraMaterial, attachments: filteredAttachments });
    };

    const displayFiles = () => (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '10px', margin: '2vh -2vh 0vh -2vh' }}>
            {extraMaterial.attachments.map((file, index) => (
                <div key={index} className="file-bubble">
                    {file.name}
                    <IconButton size="small" onClick={() => handleRemoveAttachment(index)} sx={{ ml: 1 }}>
                        <DeleteIcon />
                    </IconButton>
                </div>
            ))}
        </Box>
    );


    return (
        <Box className="extra-material-container">
            <div className="section-header">
                <InlineEdit value={extraMaterial.title} setValue={handleEMatTitleChange} />
                <IconButton onClick={onDelete}>
                    <DeleteOutlineIcon />
                </IconButton>
            </div>

            <div>
                <div className="aligned-headings">
                    <Typography variant="h6" component="h6" fontSize="1.8rem" marginTop="4vh" sx={{ marginLeft: '0em' }}>
                        Additional Attachments
                        <IconButton sx={{ marginLeft: '10px' }} onClick={() => document.getElementById('extraFileInput').click()}>
                            <AttachFileIcon />
                        </IconButton>
                    </Typography>
                </div>
                <input
                    id="extraFileInput"
                    type="file"
                    multiple
                    onChange={handleAttachmentChange}
                    style={{ display: 'none' }}
                />
                {extraMaterial.attachments.length > 0 && displayFiles(extraMaterial)}
            </div>


            <div>
                <div className="aligned-headings">
                    <Typography variant="h6" component="h6" fontSize="1.8rem" marginTop="4vh" sx={{ marginLeft: '0em' }}>
                        About Section
                    </Typography>
                </div>


                <ReactQuill
                    theme="snow"
                    value={extraMaterial.information}
                    onChange={handleExtraMatIntroTextChange}
                    className="text-area"
                    style={{ marginLeft: '0vh' }}
                />
            </div>

        </Box>
    );
};

export default ExtraMaterialSection;
