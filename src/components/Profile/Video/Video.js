import React from 'react';

import './Video.styles.css';

const Video = ({ video }) => {
  return (
    <video className="video__user" controls>
      <source src={video.video} type="video/mp4" />
    </video>
  );
};

export default Video;
