import React from 'react'

import './CommentCard.styles.css'

const CommentCard = ({postComment}) => {
    const timestampString = postComment.timestamp.split('T')[0]

    return (
        <div className='comment-container'>
            <div className='comment-socials'>
                <i className="far fa-heart social-mini-icon"></i>
                <div className="social-tag">{postComment.likes.length}</div>
            </div>
            <img className='user-profile'  src={postComment.avatar ? postComment.avatar : './images/user-icon.jpg'} width={'100%'} alt="user-profile" />
            <div className='comment-user'>
                <h3 className='bold'>{postComment.username}</h3>
                <div className='comment-field'>{postComment.comment}</div>
                <div>
                    <span className='comment-timestamp'>{timestampString}</span>
                    <span className='reply-btn'>Reply</span>
                </div>
            </div>
        </div>
    )
}

export default CommentCard
