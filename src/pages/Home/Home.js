import React, { useEffect, useContext } from 'react';
import { AppContext } from '../../context';
import Card from '../../components/Card/Card';
import Profile from '../../components/Profile/Profile';
import MiniCard from '../../components/MiniCard/MiniCard';
import FollowersColumn from '../../components/FollowersColumn/FollowersColumn';
import './Home.styles.css';

function Home() {
  const {
    user,
    showProfile,
    followed,
    suggested,
    posts,
    allPosts,
    setAllPosts,
  } = useContext(AppContext);
  let descendingPosts;
  let followingPosts;
  let topFiveFollowing;
  let topFiveNotFollowing;

  useEffect(() => {
    document.querySelector('body').classList.remove('hide-scroll');
  }, []);

  if (posts) {
    descendingPosts = posts.sort((a, b) => {
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

    topFiveFollowing = followed.slice(0, 5);
    topFiveNotFollowing = suggested.sort((a, b) =>
      a.followers.length < b.followers.length ? 1 : -1
    );
  }

  return (
    <>
      {descendingPosts && (
        <div className="container">
          <FollowersColumn
            users={topFiveFollowing}
            allPosts={allPosts}
            setAllPosts={setAllPosts}
          />
          {showProfile ? (
            <Profile />
          ) : (
            <div className="feed">
              {allPosts === 2
                ? descendingPosts.map((descendingPost, index) => (
                    <Card key={index} post={descendingPost} />
                  ))
                : allPosts === 1 &&
                  followingPosts.map((followingPost, index) => (
                    <Card key={index} post={followingPost} />
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
