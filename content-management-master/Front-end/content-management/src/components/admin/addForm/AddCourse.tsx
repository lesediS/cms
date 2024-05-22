import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import { CircularProgress, IconButton } from '@mui/material'; // Import CircularProgress
import axios from 'axios';
import { useState } from 'react';
import './AddForm.css';

const AddCourseForm = ({ onClose }) => {
    const [course, setCourse] = useState({
        name: '',
        description: '',
        image: null,
    });
    const [loading, setLoading] = useState(false); // Add loading state

    const { name, description, image } = course;

    const handleChange = (e) => {
        setCourse({ ...course, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        setCourse({ ...course, image: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Set loading state to true when form is submitted

        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);
        if (image) {
            formData.append('image', image);
        }

        // Convert course object to JSON string and append to formData
        formData.append('course', JSON.stringify({ name, description }));

        try {
            const response = await axios.post('http://localhost:8080/content-management/courses', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log('Response:', response.data);
            // Handle successful response, e.g., redirect or show success message

            onClose(); // Close the dialog after successful submission
        } catch (error) {
            console.error('Error creating course. Please try again.', error);
            // Handle error, e.g., display error message to the user
        } finally {
            setLoading(false); // Set loading state to false after form submission completes
        }
    };

    const handleCancel = () => {
        onClose(); // Close the dialog on cancel
    };

    return (
        <div className="form-container">
            <h2>Add Course</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={name}
                        onChange={handleChange}
                        required
                        placeholder='Enter course name'
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
                        placeholder='Enter course description' />
                </div>
                <div>
                    <label>Image:</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        required
                    />
                </div>

                <div className="button-group">
                    {/* Show loading indicator when loading is true */}
                    {loading ? (
                        <CircularProgress size={24} color="primary" />
                    ) : (
                        <>
                            <IconButton type="submit" color="primary" aria-label="submit">
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

export default AddCourseForm;
