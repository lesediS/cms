import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import { Button, IconButton, MenuItem, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import NavBar from '../navbar/NavBar';
import './Notifications.css';

const Notifications = () => {
    const [notificationTitle, setNotificationTitle] = useState('');
    const [notificationBody, setNotificationBody] = useState('');
    const [recipient, setRecipient] = useState('all');
    const [customRecipient, setCustomRecipient] = useState('');
    const [selectedRecipients, setSelectedRecipients] = useState([]);

    const recipientOptions = [
        { value: 'all', label: 'All Geeks' },
        { value: 'development', label: 'Software Development' },
        { value: 'testing', label: 'Testing' },
        { value: 'other', label: 'Other' },
    ];

    const formats = [
        'bold', 'italic', 'underline', 'strike', 'list', 'bullet', 'link',
        'blockquote', 'code-block', 'color', 'background', 'size', 'align'
    ];

    const sendNotification = async () => {
        if (!('Notification' in window)) {
            console.error('This browser does not support desktop notifications.');
            return;
        }

        if (Notification.permission !== 'granted') {
            await Notification.requestPermission();
        }

        new Notification(notificationTitle, {
            body: notificationBody.replace(/(<([^>]+)>)/gi, ''),
            icon: './assets/Geeks4Learning-Logo-withSlogan.png',
        });

        console.log('Notification sent:', { title: notificationTitle, body: notificationBody });
    };

    const cancelNotification = () => {
        setNotificationTitle('');
        setNotificationBody('');
        setRecipient('all');
        setSelectedRecipients([]);
    };

    const handleRecipientChange = (event) => {
        const value = event.target.value;
        setRecipient(value);
        if (value === 'other') {
            setCustomRecipient('');
        }
    };

    const handleCustomRecipientChange = (event) => {
        setCustomRecipient(event.target.value);
    };

    const addCustomRecipient = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const emails = customRecipient.split(',').filter(email => emailRegex.test(email.trim()));
        if (emails.length > 0) {
            setSelectedRecipients(prev => [...prev, ...emails]);
            setCustomRecipient('');
        } else {
            alert('Please enter valid email addresses.');
        }
    };

    const removeRecipient = (email) => {
        setSelectedRecipients(prev => prev.filter(item => item !== email));
    };

    return (
        <>
            {/* <NavBar /> */}
            <div className="container notification-form">
                <Typography variant="h4">Send Notification</Typography>
                <hr />

                <div className="recipient-section">
                    <label>Select Recipients:</label>
                    <TextField
                        select
                        value={recipient}
                        onChange={handleRecipientChange}
                        variant="outlined"
                    >
                        {recipientOptions.map(option => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                </div>

                <div>
                    {recipient === 'other' && (
                        <div className="recipient">
                            <TextField
                                type="text"
                                value={customRecipient}
                                onChange={handleCustomRecipientChange}
                                placeholder="Email address"
                                variant="outlined"
                                sx={{ width: 350, margin: '10px 0' }}
                            />
                            <Button sx={{ width: '15vh', marginLeft: '8vh', marginTop: '2.5vh', backgroundColor: '#002D43' }} className="buttons" variant="contained" onClick={addCustomRecipient} startIcon={<AddCircleOutlineIcon />}>
                                Add
                            </Button>
                        </div>
                    )}

                </div>
                <div className="recipients-list">
                    {selectedRecipients.map((recipient, index) => (
                        <div key={index} className="recipient-bubble">
                            <Typography component="span">{recipient}</Typography>
                            <IconButton onClick={() => removeRecipient(recipient)}>
                                <ClearOutlinedIcon fontSize="small" />
                            </IconButton>
                        </div>
                    ))}
                </div>

                <div className="notification-inputs">
                    <TextField
                        label="Notification Title"
                        variant="outlined"
                        fullWidth
                        value={notificationTitle}
                        onChange={(e) => setNotificationTitle(e.target.value)}
                    />

                    <ReactQuill
                        className='quill-editor'
                        theme="snow"
                        value={notificationBody}
                        onChange={setNotificationBody}
                        formats={formats}
                        placeholder="Type your notification here..."
                    />

                    <div className="btns">
                        <Button variant="contained" sx={{ backgroundColor: '#002D43' }} startIcon={<SendOutlinedIcon />} className="buttons" onClick={sendNotification}>
                            Send
                        </Button>
                        <Button variant="contained" sx={{ backgroundColor: '#002D43' }} startIcon={<CancelOutlinedIcon />} className="buttons" onClick={cancelNotification}>
                            Cancel
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Notifications;
