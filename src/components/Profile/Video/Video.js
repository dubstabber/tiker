import React, { useContext } from 'react';
import { AppContext } from '../../../context';
import PostDialog from '../../PostDialog/PostDialog';

import './Video.styles.css';

const Video = ({ video }) => {
  const { showPostDialog, postDialogToShow } = useContext(AppContext);

  if (postDialogToShow === video._id) return <PostDialog post={video} />;

  return (
    <video onClick={() => showPostDialog(video._id)} className="video__user">
      <source src={video.video} type="video/mp4" />
    </video>
  );
};

export default Video;
