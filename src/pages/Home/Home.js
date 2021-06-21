import React, { useState, useEffect, useContext } from 'react'
import Card from '../../components/Card/Card'
import MiniCard from '../../components/MiniCard/MiniCard'
import FollowersColumn from '../../components/FollowersColumn/FollowersColumn'
import {AppContext} from '../../context'
import axios from 'axios'
import './Home.styles.css'

function Home() {
    const [posts, setPosts] = useState(null)
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
    }, [])

    if(userToToggle) {
        // const newValue = userToToggle.is_followed ? false : true
        // const data = JSON.stringify({is_followed: newValue})

        // axios.put(`http://localhost:5000/edit/${userToToggle._id}/?data=${data}`)
        // .then(() => fetchData())
        // setUserToToggle(null)
    }

    

    if(posts) {
        //let date = new Date()
        //let dateString = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}T${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
        //descendingPosts = posts.sort((a,b) => a.timestamp < b.timestamp ? 1 : -1)
        descendingPosts = posts.sort((a,b) => {
            const [dateA, timeA] = a.timestamp.split('T')
            let [yearA, monthA, dayA] = dateA.split('-')
            yearA = parseInt(yearA)
            monthA = parseInt(monthA)
            dayA = parseInt(dayA)
            const [dateB, timeB] = b.timestamp.split('T')
            let [yearB, monthB, dayB] = dateB.split('-')
            yearB = parseInt(yearB)
            monthB = parseInt(monthB)
            dayB = parseInt(dayB)

            if(yearA <= yearB){
                if(monthA <= monthB){
                    if(dayA <= dayB){
                        return 1
                    }else return -1
                }else return -1
            }else return -1
        })

        //console.log(descendingPosts)
        // const following = posts.filter(post => post.is_followed)
        // const descendingFollowing = following.sort((a,b) => a.likes < b.likes ? 1 : -1)
        // topFiveFollowing = descendingFollowing.slice(0,5)

        // const notFollowing = posts.filter(post => post.is_followed === false)
        // const descendingNotFollowing = notFollowing.sort((a,b) => a.likes < b.likes ? 1 : -1)
        // topFiveNotFollowing = descendingNotFollowing.slice(0,5)
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