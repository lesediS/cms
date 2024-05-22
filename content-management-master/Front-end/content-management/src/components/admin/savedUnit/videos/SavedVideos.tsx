import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import { IconButton } from '@mui/material';
import { useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import YouTubeLinkManager from '../../addUnit/youtubeLinks/YouTubeLinkManager';
import '../UnitDisplay.css';
import './SavedVideos.css';

const SavedVideos = () => {
    const [ytVideos, setYtVideos] = useState([]);
    const [isEditingYtVideo, setIsEditingYtVideo] = useState(false);

    const handleAboutVideoChange = (value) => {
        setYtVideos(value);
    };

    const handleToggleEditVideos = () => {
        setIsEditingYtVideo(!isEditingYtVideo);
    };

    return (
        <div className='vids'>
            <div className="secHeadingContainer">
                <label className="secHeading">Videos</label>
                <div className='icons'>
                    <IconButton onClick={handleToggleEditVideos}>
                        {isEditingYtVideo ? <CancelOutlinedIcon /> : <ModeEditOutlineIcon />}
                    </IconButton>
                </div>
            </div>

            <div className='vidsAdded'>
                {/* TODO: Add videos section and save/cancel buttons */}
                {isEditingYtVideo && <YouTubeLinkManager youTubeLinks={ytVideos} setYouTubeLinks={setYtVideos} />}
            </div>

        </div>
    );
}
export default SavedVideos;
