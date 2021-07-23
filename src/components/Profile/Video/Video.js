import React, { useContext } from 'react';
import DialogContext from '../../../context/dialog/dialogContext';

import './Video.styles.css';

const Video = ({ video }) => {
  const { showPostDialog } = useContext(DialogContext);

  return (
    <video onClick={() => showPostDialog(video.id)} className="video__user">
      <source src={video.video} type="video/mp4" />
    </video>
  );
};

export default Video;
