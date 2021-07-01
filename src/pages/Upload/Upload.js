import React, {useContext} from 'react'
import {Redirect} from 'react-router-dom'
import {AppContext} from '../../context'
import axios from 'axios'
import './Upload.styles.css'

const Upload = () => {
  const {user} = useContext(AppContext)

  if(!user.isAuth){
    return <Redirect to='/' />
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if(user.isAuth){
      const postData =  {
          caption: e.target.caption.value,
          video: e.target.video.value
        }

      axios.post('/add', postData)
      .then((response) => {
        return <Redirect to='/' />
      })
      .catch((err) => {
        console.error(err)
      })
    }
  }

  return (
    <div className="upload-page">
        <br />
        <h1>Upload video</h1>
        <p>This video will be published to @{user.username}</p>
        <div className='container'>
          <form onSubmit={handleSubmit}>
            <div className='section'>
              <div className="image-upload"></div>
              <div className="form-section">
                <div className='section input-section'>
                  <label className="bold">Caption</label>
                  <input
                    className='input'
                    name='caption'
                  />
                </div>
                <div className="break"></div>
                <div className='section input-section'>
                  <label className="bold">Video Url</label>
                  <input
                    className='input'
                    name='video'
                  />
                </div>
              </div>
            </div>			
            <button>Post</button>
          </form>
        </div>
    </div>
  )
}

export default Upload