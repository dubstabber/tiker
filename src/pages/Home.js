import React, { useState, useEffect } from 'react'
import Card from '../components/Card'
import FollowersColumn from '../components/FollowersColumn'
import axios from 'axios'

function Home() {
    const [users, setUsers] = useState(null)
    let descendingUsers

    const fetchData = async () => {
        const results = await axios.get('http://127.0.0.1:5000/posts')
        setUsers(results.data)
    }

    useEffect(() => {
        fetchData()
    }, [])

    if(users) {
        descendingUsers = users.sort((a,b) => a.id < b.id ? 1 : -1)
    }

    return (
        <>
        {descendingUsers && (
            <div className='container'>
                <FollowersColumn />
                <div className='feed'>
                    {descendingUsers.map((descendingUser, index) => (
                        <Card
                            key={index}
                            user={descendingUser}
                        />
                    ))}

                </div>
                <div className='suggested-box'>
                    <div className='section'>
                        <div className='suggested'>
                            <h2 className='bold'>Suggested accounts</h2>
                            <div className='break' />

                        </div>
                    </div>
                </div>
            </div>)}
        </>
    )
}

export default Home