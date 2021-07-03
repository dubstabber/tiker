import React from 'react'
import './PostDialog.styles.css'

const PostDialog = ({post, isFollowed, isMyPost, setPostDialogVisibility, handleLike}) => {
    const timestamp = post.timestamp.split('T')[0]

    const closeDialog = () => {
        setPostDialogVisibility(false)
    }

    return (
        <div className='post-container'>
            <span onClick={closeDialog} className='post-close'></span>
            <div className='post-left-side'>
                <video className="video-page" controls>
                    <source src={post.video} type="video/mp4" />
                </video>
            </div>
            <div className='post-right-side'>
                <div className='post-info'>
                    <div className='post-follow-btn'>
                        <div className={isFollowed ? "followed-button":"follow-button"}>
                            {isFollowed ? "Following" :"Follow"}
                        </div>
                    </div>
                    <div className='post-user'>
                        <img className='user-profile' src={post.avatar ? post.avatar : './images/user-icon.jpg'} alt='user-avatar' />
                        <div>
                            <h3 className="bold">{post.username}</h3>
                            <span>{post.name}</span><span> · </span><span>{timestamp}</span>
                        </div>
                    </div>
                    <div className='post-caption'>{post.caption}</div>
                    <div className='post-socials'>
                        <div className="section socials">
                            <i onClick={handleLike} className="far fa-heart social-mini-icon"></i>
                            <div className="social-tag">{post.likes.length}</div>
                            <i className="far fa-comment-dots"></i>
                            <div className="social-tag">{post.comments}</div>
                            <i className="far fa-share-square social-mini-icon"></i>
                        </div>
                    </div>
                </div>
                <div className='post-comments'>
                    post-comments
                </div>
                <div className='post-add-comment'>
                    <form className='post-form'>
                        <input className='post-input' placeholder='Add comment...' />
                        <button className='post-button'>Post</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default PostDialog
