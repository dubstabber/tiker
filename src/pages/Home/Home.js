import React, { useState, useEffect, useContext } from 'react'
import {AppContext} from '../../context'
import Card from '../../components/Card/Card'
import MiniCard from '../../components/MiniCard/MiniCard'
import FollowersColumn from '../../components/FollowersColumn/FollowersColumn'
import axios from 'axios'
import './Home.styles.css'

function Home() {
    const [posts, setPosts] = useState(null)
    const [followed, setFollowed] = useState([])
    const [suggested, setSuggested] = useState([])
    const {user, setShowModalDialog} = useContext(AppContext)
    let descendingPosts
    let topFiveFollowing
    let topFiveNotFollowing

    useEffect(() => {
        fetchPosts()
        if(user.isAuth){
            axios.get('/getFollowing').then(data => {
                setFollowed(data.data)
            }).catch(err => {
                console.error(err)
            })
        }
        if(user.isAuth){
            axios.get('/getSuggestedUsers').then(data => {
                setSuggested(data.data)
            }).catch(err => {
                console.error(err)
            })
        }else {
            axios.get('/getUsers/5').then(data => {
                setSuggested(data.data)
            }).catch(err => {
                console.error(err)
            })
        }
    }, [user])

    const fetchFollowing = async () => {
        if(user.isAuth){
            await axios.get('/getFollowing').then(data => {
                setFollowed(data.data)
            }).catch(err => {
                console.error(err)
            })
        }
    }

    const fetchPosts = async () => {
        await axios.get('/posts').then(data => {
            setPosts(data.data)
        }).catch(err => {
            console.error(err)
        })
    }

    const fetchNotFollowing = async () => {
        if(user.isAuth){
            await axios.get('/getSuggestedUsers').then(data => {
                setSuggested(data.data)
            }).catch(err => {
                console.error(err)
            })
        }else {
            await axios.get('/getUsers/5').then(data => {
                setSuggested(data.data)
            })
        }
    }  
    
    const followUser = async (username) => {
        if(user.isAuth && user.username !== username){
            await axios.put(`/follow/${username}`).catch(err => {
                console.error(err)
            })
            fetchFollowing()
            fetchNotFollowing()
        }else {
            setShowModalDialog(true)
        }
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

        topFiveFollowing = followed.slice(0,5)

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
                        follow={followUser}
                        followedUsers={followed}
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
                                        notFollowingUser={notFollowingUser}
                                        follow={followUser}
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