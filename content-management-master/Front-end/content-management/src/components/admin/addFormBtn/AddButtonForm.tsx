import { Box, Button, Snackbar, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';

interface AddItemFormProps {
    onCancel: () => void;
    onSave: (data: { title: string; description: string; image: File | null }) => void;
}

const AddItemForm: React.FC<AddItemFormProps> = ({ onCancel, onSave }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState<File | null>(null);
    const [imageName, setImageName] = useState('');
    const [openSnackbar, setOpenSnackbar] = useState(false);

    const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
    };

    const handleDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDescription(event.target.value);
    };

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setImage(event.target.files[0]);
            setImageName(event.target.files[0].name);
        }
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onSave({ title, description, image });
        setOpenSnackbar(true);
        setTitle('');
        setDescription('');
        setImage(null);
        setImageName('');
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    return (
        <Box
            sx={{
                width: '80%',
                maxWidth: 400,
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                padding: 2,
                borderRadius: 2,
                boxShadow: 3,
                bgcolor: 'background.paper',
                '@media (max-width: 600px)': {
                    maxWidth: '100%',
                },
            }}
        >
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <TextField
                    margin='normal'
                    fullWidth
                    id="title"
                    label="Title"
                    name="title"
                    value={title}
                    onChange={handleTitleChange}
                    required
                />

                <TextField
                    margin='normal'
                    fullWidth
                    id="description"
                    label="Description"
                    name="description"
                    multiline
                    value={description}
                    onChange={handleDescriptionChange}
                    minRows={3}
                />

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 2 }}>
                    <Button
                        variant="contained"
                        component="label"
                        sx={{ background: '#07406D' }}>
                        Upload Image
                        <input
                            type="file"
                            hidden
                            accept="image/*"
                            onChange={handleImageChange}
                        />
                    </Button>
                    {imageName && <Typography variant="caption">{imageName}</Typography>}
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
                    <Button sx={{ background: '#07406D' }} variant="contained" onClick={onCancel}>
                        Cancel
                    </Button>
                    <Button type="submit" sx={{ background: '#07406D' }} variant="contained">
                        Save
                    </Button>
                </Box>
            </form>
            <Snackbar
                open={openSnackbar}
                autoHideDuration={3000}
                onClose={handleCloseSnackbar}
                message="Successfully created"
            />
        </Box>
    );
};

export default AddItemForm;
