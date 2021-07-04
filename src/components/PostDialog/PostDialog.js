import React, {useState, useEffect} from 'react'
import axios from 'axios'
import CommentCard from './CommentCard/CommentCard'

import './PostDialog.styles.css'

const PostDialog = ({post, isFollowed, isMyPost, setPostDialogVisibility, handleLike, likes}) => {
    const [comment, setComment] = useState('')
    const [postComments, setPostComments] = useState([])
    const timestamp = post.timestamp.split('T')[0]

    useEffect(() =>{
        fetchComments()
    }, [])

    const fetchComments = async () => {
        await axios.post('/postComments', {postId: post._id}).then(data => {
            setPostComments(data.data)
        }).catch(err => {
            console.log(err)
        })
    }

    const closeDialog = () => {
        setPostDialogVisibility(false)
        document.querySelector('body').classList.remove('hide-scroll')
    }

    const checkComment = (e) => {
        setComment(e.target.value)
    }

    const addComment = async (e) => {
        e.preventDefault()
        if(comment){
            await axios.post('/comment', {postId: post._id, comment}).then(data => {
                setComment('')
            })
            .catch(err => {
                console.log(err)
            })
        }
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
                            <div className="social-tag">{likes}</div>
                            <i className="far fa-comment-dots"></i>
                            <div className="social-tag">{post.comments.length}</div>
                            <i className="far fa-share-square social-mini-icon"></i>
                        </div>
                    </div>
                </div>
                <div className='post-comments'>
                    {postComments.map((postComment, index) => {
                        return <CommentCard key={index} postComment={postComment} />
                    })}
                </div>
                <div className='post-add-comment'>
                    <form onSubmit={addComment} className='post-form'>
                        <input onChange={checkComment} value={comment} name='addComment' className='post-input' placeholder='Add comment...' />
                        <button className={comment ? 'post-button-ready' : 'post-button'}>Post</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default PostDialog
