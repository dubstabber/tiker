import React from 'react'
import SubCommentCard from './SubCommentCard/SubCommentCard'

import './CommentCard.styles.css'

const CommentCard = ({postComment, reply, index, likeComment, likeSubcomment}) => {
    const timestampString = postComment.timestamp.split('T')[0]

    const handleReply = () => {
        reply(index)
    }

    const handleLike = () => {
        likeComment(index)
    }

    return (
        <>
            <div className='comment-container'>
                <div className='comment-socials'>
                    <i onClick={handleLike} className="far fa-heart social-mini-icon"></i>
                    <div className="social-tag">{postComment.likes.length}</div>
                </div>
                <img className='user-profile'  src={postComment.avatar ? postComment.avatar : './images/user-icon.jpg'} width={'100%'} alt="user-profile" />
                <div className='comment-user'>
                    <h3 className='bold'>{postComment.username}</h3>
                    <div className='comment-field'>{postComment.comment}</div>
                    <div>
                        <span className='comment-timestamp'>{timestampString}</span>
                        <span onClick={handleReply} className='reply-btn'>Reply</span>
                    </div>
                </div>
            </div>
                {postComment.subComments.map((reply, i) => <SubCommentCard key={i} 
                                                                               parentComment={index}
                                                                               subCommentIndex={i}
                                                                               reply={reply} 
                                                                               handleReply={handleReply} 
                                                                               likeSubcomment={likeSubcomment}
                                                                               />)}
        </>
    )
}

export default CommentCard
