import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import { CircularProgress, IconButton } from '@mui/material';
import axios from 'axios';
import { useState } from 'react';
import './AddForm.css';

const AddModuleForm = ({ onClose }) => {
    const [module, setModule] = useState({
        name: '',
        description: '',
        image: null,
    });
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const { name, description, image } = module;

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setModule({ ...module, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        setModule({ ...module, image: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);
        if (image) {
            formData.append('image', image);
        }

        // Convert course object to JSON string and append to formData
        formData.append('module', JSON.stringify({ name, description }));

        try {
            const response = await axios.post('http://localhost:8080/content-management/modules', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log('Response:', response.data);
            // Handle successful response, e.g., redirect or show success message
            setSuccessMessage('Module created successfully.');
            onClose(); // Close the dialog after successful submission
        } catch (error) {
            console.error('Error:', error);
            setErrorMessage('Error creating module. Please try again.');
            setTimeout(() => {
                setErrorMessage('');
            }, 3000); // Hide error message after 3 seconds
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        onClose(); // Close the dialog on cancel
    };

    return (
        <div className="form-container">
            <h2>Add Module</h2>
            {successMessage && <div className="success-message">{successMessage}</div>}
            {errorMessage && <div className="error-message">{errorMessage}</div>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={name}
                        onChange={handleChange}
                        required
                        placeholder="Enter module name"
                    />
                </div>
                <div>
                    <label>Description:</label>
                    <input
                        type="text"
                        name="description"
                        value={description}
                        onChange={handleChange}
                        required
                        placeholder="Enter module description"
                    />
                </div>
                <div>
                    <label>Image:</label>
                    <input type="file" accept="image/*" onChange={handleImageChange} required />
                </div>

                <div className="button-group">
                    {loading ? (
                        <CircularProgress size={24} color='primary' />
                    ) : (
                        <>
                    <IconButton type="submit" color="primary" aria-label="submit" onClick={handleSubmit}>
                        <SendOutlinedIcon sx={{ mr: 0.8 }} />Save
                    </IconButton>
                    <IconButton type="button" color="secondary" aria-label="cancel" onClick={handleCancel}>
                        <CancelOutlinedIcon sx={{ mr: 0.8 }} />Cancel
                    </IconButton>
                    </>
                    )}
                </div>
            </form>
        </div>
    );
};

export default AddModuleForm;
