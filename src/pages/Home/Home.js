import React, { useState, useEffect } from 'react'
import Card from '../../components/Card/Card'
import MiniCard from '../../components/MiniCard/MiniCard'
import FollowersColumn from '../../components/FollowersColumn/FollowersColumn'
import axios from 'axios'
import './Home.styles.css'

function Home() {
    const [posts, setPosts] = useState(null)
    const [suggested, setSuggested] = useState(null)
    const [userToToggle, setUserToToggle] = useState(null)
    let descendingPosts
    let topFiveFollowing
    let topFiveNotFollowing
    
    const fetchData = async () => {
        await axios.get('http://localhost:5000/posts').then(data => {
            setPosts(data.data)
        })
    }

    useEffect(() => {
        fetchData()
        fetchNotFollowing()
    }, [])

    const fetchNotFollowing = async () => {
        await axios.get('http://localhost:5000/getUsers/5').then(data => {
            setSuggested(data.data)
        })
    }

    if(userToToggle) {
        // const newValue = userToToggle.is_followed ? false : true
        // const data = JSON.stringify({is_followed: newValue})

        // axios.put(`http://localhost:5000/edit/${userToToggle._id}/?data=${data}`)
        // .then(() => fetchData())
        // setUserToToggle(null)
    }

    

    if(posts) {
        descendingPosts = posts.sort((a,b) => {
            const [dateA, timeA] = a.timestamp.split('T')
            let [yearA, monthA, dayA] = dateA.split('-')
            let [hoursA, minutesA, secondsA] = timeA.split(':')
            let msA = new Date(yearA, monthA-1, dayA, hoursA, minutesA, secondsA).getTime()

            const [dateB, timeB] = b.timestamp.split('T')
            let [yearB, monthB, dayB] = dateB.split('-')
            let [hoursB, minutesB, secondsB] = timeB.split(':')
            let msB = new Date(yearB, monthB-1, dayB, hoursB, minutesB, secondsB).getTime()

            if(msA < msB) return 1
            else if(msA > msB) return -1

            return 0
        })

        // const following = posts.filter(post => post.is_followed)
        // topFiveFollowing = descendingFollowing.slice(0,5)

        
        // const notFollowing = posts.filter(post => post.is_followed === false)
        topFiveNotFollowing = suggested.sort((a,b) => a.followers.length < b.followers.length ? 1 : -1)
    }

    return (
        <>
        {descendingPosts && (
            <div className='container'>
                <FollowersColumn users={topFiveFollowing} />
                <div className='feed'>
                    {descendingPosts.map((descendingPost, index) => (<Card
                        key={index}
                        post={descendingPost}
                        toggleFollow={userToToggle => setUserToToggle(userToToggle)}
                    />)
                    )}

                </div>
                <div className='suggested-box'>
                    <div className='section'>
                        <div className='suggested'>
                            <h2 className='bold'>Suggested accounts</h2>
                            <div className='break' />
                                {topFiveNotFollowing && topFiveNotFollowing.map((notFollowingUser, index) => (
                                    <MiniCard 
                                        key={index}
                                        user={notFollowingUser}
                                        toggleFollow={userToToggle => setUserToToggle(userToToggle)}
                                    />
                                ))}
                        </div>
                    </div>
                </div>
            </div>)}
        </>
    )
}

export default Home