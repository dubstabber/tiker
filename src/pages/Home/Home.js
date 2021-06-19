import React, { useState, useEffect } from 'react'
import Card from '../../components/Card/Card'
import MiniCard from '../../components/MiniCard/MiniCard'
import FollowersColumn from '../../components/FollowersColumn/FollowersColumn'
import axios from 'axios'
import './Home.styles.css'

function Home() {
    const [posts, setPosts] = useState(null)
    const [userToToggle, setUserToToggle] = useState(null)
    let descendingPosts
    let topFiveFollowing
    let topFiveNotFollowing

    const fetchData = async () => {
        let results = await axios.get('http://localhost:5000/posts')
        results = results.data.map((post) => {
            axios.get('http://localhost:5000/getUser/' + post.userId).then(user => {
                console.log(Object.assign(post, user.data))
            })
        })
        setPosts(results)
    }

    if(userToToggle) {
        const newValue = userToToggle.is_followed ? false : true
        const data = JSON.stringify({is_followed: newValue})

        axios.put(`http://localhost:5000/edit/${userToToggle._id}/?data=${data}`)
        .then(() => fetchData())
        setUserToToggle(null)
    }

    useEffect(() => {
        fetchData()
    }, [])

    if(posts) {
        descendingPosts = posts.sort((a,b) => a.id < b.id ? 1 : -1)

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
                    {descendingPosts.map((descendingPost, index) => (
                        <Card
                            key={index}
                            post={descendingPost}
                            toggleFollow={userToToggle => setUserToToggle(userToToggle)}
                        />
                    ))}

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