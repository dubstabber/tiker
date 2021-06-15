import React, { useState, useEffect } from 'react'
import Card from '../components/Card'
import MiniCard from '../components/MiniCard'
import FollowersColumn from '../components/FollowersColumn'
import axios from 'axios'

function Home() {
    const [users, setUsers] = useState(null)
    const [userToToggle, setUserToToggle] = useState(null)
    let descendingUsers
    let topFiveFollowing
    let topFiveNotFollowing

    const fetchData = async () => {
        const results = await axios.get('http://localhost:5000/posts')
        setUsers(results.data)
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

    if(users) {
        descendingUsers = users.sort((a,b) => a.id < b.id ? 1 : -1)

        const following = users.filter(user => user.is_followed)
        const descendingFollowing = following.sort((a,b) => a.likes < b.likes ? 1 : -1)
        topFiveFollowing = descendingFollowing.slice(0,5)

        const notFollowing = users.filter(user => user.is_followed === false)
        const descendingNotFollowing = notFollowing.sort((a,b) => a.likes < b.likes ? 1 : -1)
        topFiveNotFollowing = descendingNotFollowing.slice(0,5)
    }


    return (
        <>
        {descendingUsers && (
            <div className='container'>
                <FollowersColumn users={topFiveFollowing} />
                <div className='feed'>
                    {descendingUsers.map((descendingUser, index) => (
                        <Card
                            key={index}
                            user={descendingUser}
                            toggleFollow={userToToggle => setUserToToggle(userToToggle)}
                        />
                    ))}

                </div>
                <div className='suggested-box'>
                    <div className='section'>
                        <div className='suggested'>
                            <h2 className='bold'>Suggested accounts</h2>
                            <div className='break' />
                                {topFiveNotFollowing.map((notFollowingUser, index) => (
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