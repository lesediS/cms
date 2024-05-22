import { Typography } from '@mui/material';
import StdNavBar from '../std-navbar/StdNavBar';
import NotificationsIcon from '@mui/icons-material/Notifications';
import './std-notifications.css';

const StdNotifications = () => {

    const handledClick = () => {
        console.log('hi')
    };


    return (
        <div>
            <StdNavBar />

            <div className='container notifs'>
                <Typography variant="h4" gutterBottom sx={{ textAlign: 'left', fontSize: '25px' }} >
                    Notifications
                </Typography>
                <hr />

                <div className='notifsContainer'>
                    <div>
                        <NotificationsIcon className='notif-icon' onClick={handledClick} />
                        <Typography variant="body1" sx={{ marginLeft: '10px', marginTop: '0.8em', cursor: 'pointer' }} onClick={handledClick}>Notifications</Typography>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default StdNotifications;
