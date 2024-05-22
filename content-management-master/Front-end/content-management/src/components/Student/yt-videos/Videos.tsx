import { useState } from 'react';
import ReactPlayer from 'react-player';
import VideosList from "../yt-videos/VideosList";
import './videos.css';

const Videos = () => {
  const [ytVideo, setYtVideo] = useState('');
  const [ytURL, setYtURL] = useState('https://www.youtube.com/watch?v=pTB0EiLXUC8&t=2s&pp=ygUWb29wIGZvciBiZWdpbm5lcnMgamF2YQ%3D%3D');

  return (
    <div className='container'>
      <div className='yt-box'>
        <ReactPlayer url={ytURL} className='video' controls />
      </div>

      <div className='list'>
        <VideosList />
      </div>
    </div>
  );
}

export default Videos;
