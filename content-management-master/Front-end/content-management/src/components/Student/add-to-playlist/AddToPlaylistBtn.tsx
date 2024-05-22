import { Button, Dialog, DialogContent, DialogTitle } from '@mui/material';
import { useState } from 'react';
import './add-btn.css';
import AddYtForm from './add-yt-form/AddYtForm';

const AddToPlaylistBtn = () => {
    const [open, setOpen] = useState(false);
    const [youtubeLinks, setYouTubeLinks] = useState([]);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Button
                variant="contained"
                onClick={handleOpen}
                sx={{
                    background: '#07406D',
                    color: 'white',
                    borderRadius: '15px',
                    fontSize: 'small',
                }}
            >
                Add To Playlist
            </Button>

            <Dialog open={open} onClose={handleClose} classes={{ paper: 'dialog-paper' }}>
                <DialogTitle>Add YouTube Link</DialogTitle>
                <DialogContent>
                    <AddYtForm youTubeLinks={youtubeLinks} setYouTubeLinks={setYouTubeLinks} />
                </DialogContent>
            </Dialog>
        </>
    );
};

export default AddToPlaylistBtn;
