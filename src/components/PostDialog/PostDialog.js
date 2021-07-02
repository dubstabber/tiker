import React, {useContext} from 'react'
import './PostDialog.styles.css'
import {AppContext} from '../../context'

const PostDialog = () => {
    const {postDialog, setPostDialog, currentPost, setCurrentPost} = useContext(AppContext)

    const closeDialog = () => {
        setPostDialog(false)
        setCurrentPost({})
    }


    if(!postDialog) return <></>

    return (
        <div className='post-container'>
            <span onClick={closeDialog} className='post-close'></span>
            <div className='post-left-side'>
                <video className="video-page" controls>
                    <source src={currentPost.video} type="video/mp4" />
                </video>
            </div>
            <div className='post-right-side'>
                <div className='post-info'>
                    <img className='user-profile' src={currentPost.avatar} alt='user-avatar' />
                    <div>
                        <h3>{currentPost.username}</h3>
                        <p>{currentPost.name}</p>
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
