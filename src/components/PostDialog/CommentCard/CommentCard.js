import React from 'react'

import './CommentCard.styles.css'

const CommentCard = ({postComment}) => {
    return (
        <div className='comment-container'>
            <div className='comment-user'>
                <img className="user-profile"  src={postComment.avatar ? postComment.avatar : './images/user-icon.jpg'} width={'100%'} alt="user-profile" />
                <div className="section microcard">
                    <h3 className="bold">{postComment.username}</h3>
                </div>
            </div>
            <p>{postComment.comment}</p>
        </div>
    )
}

export default CommentCard
