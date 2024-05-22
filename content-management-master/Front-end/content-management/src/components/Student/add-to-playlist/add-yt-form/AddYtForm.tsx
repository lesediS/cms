import DeleteIcon from '@mui/icons-material/Delete';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Link, TextField } from '@mui/material';
import { useState } from 'react';

const AddYtForm = ({ youTubeLinks, setYouTubeLinks }) => {
    const [open, setOpen] = useState(false);
    const [newLink, setNewLink] = useState('');
    const [newTitle, setNewTitle] = useState('');
    const [isValid, setIsValid] = useState(true);

    const validateYouTubeUrl = (url) => {
        if (!url) return false;
        const regExp = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/;
        return regExp.test(url);
    };

    const handleClickOpen = () => {
        setOpen(true);
        setNewLink(''); // Clear previous link on opening the dialog
        setNewTitle('');
        setIsValid(true); // Reset validation state
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleAddLink = () => {
        if (validateYouTubeUrl(newLink)) {
            const title = newTitle.trim() || extractVideoTitle(newLink);
            setYouTubeLinks([...youTubeLinks, { url: newLink, title }]);
            handleClose();
        } else {
            setIsValid(false);
        }
    };

    const updateLink = (index, value, type) => {
        const updatedLinks = [...youTubeLinks];
        if (type === 'url' && validateYouTubeUrl(value)) {
            updatedLinks[index] = { ...updatedLinks[index], url: value, title: newTitle.trim() || extractVideoTitle(value) };
        } else if (type === 'title') {
            updatedLinks[index] = { ...updatedLinks[index], title: value };
        }
        setYouTubeLinks(updatedLinks);
    };

    const removeLink = (index) => {
        const updatedLinks = [...youTubeLinks];
        updatedLinks.splice(index, 1);
        setYouTubeLinks(updatedLinks);
    };

    const extractVideoTitle = (url) => {
        const videoId = new URLSearchParams(new URL(url).search).get('v');
        return videoId ? `Video ID: ${videoId}` : "Unknown Video Name";
    };

    return (
        <div>
            {youTubeLinks.map((item, index) => (
                <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginLeft: '15px', marginTop: '5px' }}>
                    <IconButton onClick={() => removeLink(index)} aria-label="delete">
                        <DeleteIcon />
                    </IconButton>
                    <Link href={item.url} target="_blank" rel="noopener noreferrer">{item.title}</Link>
                </div>
            ))}

            <Button variant="contained" onClick={handleClickOpen} sx={{ background: '#757575', color: 'white', borderRadius: '15px', fontSize: 'small', '&:hover': { background: '#909090' } }}>
                Add Video
            </Button>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add a YouTube Link</DialogTitle>
                {open && (
                    <DialogContent>
                        <DialogContentText>
                            Please enter a valid YouTube URL.
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="YouTube URL"
                            type="url"
                            fullWidth
                            variant="outlined"
                            value={newLink}
                            onChange={(e) => setNewLink(e.target.value)}
                            error={!isValid}
                            required
                            helperText={!isValid && "Please enter a valid YouTube URL"}
                        />
                    </DialogContent>
                )}
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleAddLink} disabled={!isValid}>
                        Add
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default AddYtForm;
