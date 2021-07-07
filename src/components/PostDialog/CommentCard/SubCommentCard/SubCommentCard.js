import React from 'react'

import './SubCommentCard.styles.css'

const SubCommentCard = ({reply, handleReply, likeSubcomment, parentComment, subCommentIndex}) => {
    const timestampString = reply.timestamp.split('T')[0]

    return (
        <div className='reply-container'>
            <div className='reply-socials'>
                    <i onClick={() => likeSubcomment(parentComment, subCommentIndex)} className="far fa-heart social-mini-icon"></i>
                    <div className="social-tag">{reply.likes.length}</div>
                </div>
            <img className='user-profile-small'  src={reply.avatar ? reply.avatar : './images/user-icon.jpg'} width={'100%'} alt="user-profile" />
            <div className='reply-user'>
                <h3 className='bold'>{reply.username}</h3>
                <div className='reply-field'>{reply.comment}</div>
                <div>
                    <span className='reply-timestamp'>{timestampString}</span>
                    <span onClick={handleReply} className='reply-btn'>Reply</span>
                </div>
            </div>
        </div>
    )
}

export default SubCommentCard
