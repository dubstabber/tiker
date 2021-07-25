import React, { useEffect, useContext } from 'react';
import AuthContext from '../../context/auth/authContext';
import HomeContext from '../../context/home/homeContext';
import Card from '../../components/Card/Card';
import Profile from '../../components/Profile/Profile';
import MediumCard from '../../components/MediumCard/MediumCard';
import MiniCard from '../../components/MiniCard/MiniCard';
import FollowersColumn from '../../components/FollowersColumn/FollowersColumn';
import './Home.styles.css';

function Home() {
  const authContext = useContext(AuthContext);
  const homeContext = useContext(HomeContext);
  let descendingPosts;
  let topFiveFollowing;
  let topFiveNotFollowing;

  useEffect(() => {
    authContext.loadUser();
    document.querySelector('body').classList.remove('hide-scroll');
    // eslint-disable-next-line
  }, [authContext.isAuth]);

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

    topFiveFollowing = homeContext && homeContext.followed;
    topFiveNotFollowing =
      homeContext &&
      homeContext.suggested.sort((a, b) =>
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
              {homeContext.foundUsers
                ? homeContext.foundUsers.map((foundUser) => (
                    <MediumCard key={foundUser.id} user={foundUser} />
                  ))
                : descendingPosts.map((descendingPost, index) => (
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
                    <MiniCard key={index} notFollowingUser={notFollowingUser} />
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
