import React from 'react'

import './SubCommentCard.styles.css'

const SubCommentCard = ({reply}) => {
    const timestampString = reply.timestamp.split('T')[0]

    return (
        <div className='reply-container'>
            <img className='user-profile'  src={reply.avatar ? reply.avatar : './images/user-icon.jpg'} width={'100%'} alt="user-profile" />
            <div className='reply-user'>
                <h3 className='bold'>{reply.username}</h3>
                <div className='reply-field'>{reply.comment}</div>
                <div>
                    <span className='reply-timestamp'>{timestampString}</span>
                    <span className='reply-btn'>Reply</span>
                </div>
            </div>
        </div>
    )
}

export default SubCommentCard
