import { useState } from 'react'
import ReactPlayer from 'react-player'
import './videos-list.css'

const VideosList = () => {

  const [ytURL, setYtURL] = useState('https://www.youtube.com/watch?v=luggwIg0w2c&list=PL_c9BZzLwBRLW7Kw8bqc_PJqAnjCJI63P')

  return (
    <div className='list-box'>
      <ReactPlayer url={ytURL} className='vid' controls />
    </div>
  )
}

export default VideosList