import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import HomeContext from '../../context/home/homeContext';
import Card from '../../components/Card/Card';
import Profile from '../../components/Profile/Profile';
import MiniCard from '../../components/MiniCard/MiniCard';
import FollowersColumn from '../../components/FollowersColumn/FollowersColumn';
import './Home.styles.css';

function Home() {
  const homeContext = useContext(HomeContext);
  const [followedUsers, setFollowedUsers] = useState([]);
  let descendingPosts;
  let followingPosts;
  let topFiveFollowing;
  let topFiveNotFollowing;

  useEffect(() => {
    // async function fetchFollowedUsers() {
    //   await axios
    //     .get('/getUsers/5')
    //     .then((data) => {
    //       setFollowedUsers(data.data);
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     });
    // }
    // fetchFollowedUsers();

    document.querySelector('body').classList.remove('hide-scroll');
  }, []);

  if (homeContext.posts) {
    descendingPosts = homeContext.posts.sort((a, b) => {
      const [dateA, timeA] = a.timestamp.split('T');
      let [yearA, monthA, dayA] = dateA.split('-');
      let [hoursA, minutesA, secondsA] = timeA.split(':');
      let msA = new Date(
        yearA,
        monthA - 1,
        dayA,
        hoursA,
        minutesA,
        secondsA
      ).getTime();

      const [dateB, timeB] = b.timestamp.split('T');
      let [yearB, monthB, dayB] = dateB.split('-');
      let [hoursB, minutesB, secondsB] = timeB.split(':');
      let msB = new Date(
        yearB,
        monthB - 1,
        dayB,
        hoursB,
        minutesB,
        secondsB
      ).getTime();

      if (msA < msB) return 1;
      else if (msA > msB) return -1;

      return 0;
    });

    followingPosts = descendingPosts.filter((el) => {
      return !user.following.every((id) => id.id !== el.userId);
    });

    topFiveFollowing = followedUsers;
    topFiveNotFollowing = suggested.sort((a, b) =>
      a.followers.length < b.followers.length ? 1 : -1
    );
  }

  return (
    <>
      {descendingPosts && (
        <div className="container">
          <FollowersColumn users={topFiveFollowing} />
          {homeContext.profile ? (
            <Profile />
          ) : (
            <div className="feed">
              {descendingPosts.map((descendingPost, index) => (
                <Card key={index} post={descendingPost} />
              ))}
            </div>
          )}
          <div className="suggested-box">
            <div className="section">
              <div className="suggested">
                <h2 className="bold">Suggested accounts</h2>
                <div className="break" />
                {topFiveNotFollowing &&
                  topFiveNotFollowing.map((notFollowingUser, index) => (
                    <MiniCard
                      key={index}
                      notFollowingUser={notFollowingUser}
                      setAllPosts={setAllPosts}
                    />
                  ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Home;
