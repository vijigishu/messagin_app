import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import { assets } from '../assets/assets';
import Remove from './remove'; // Import the Remove component

// Function to fetch friends from the server
const fetchFriends = async (username) => {
  try {
    const response = await fetch('http://localhost:5000/api/user/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Fetched friends:', data);

    if (Array.isArray(data.friends)) {
      return data.friends;
    }

    if (data.username) {
      return [{ username: data.username }];
    }

    return [];
  } catch (error) {
    console.error('Error fetching friends:', error);
    return [];
  }
};

// Main Home component
const Home = () => {
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState('');
  const [friends, setFriends] = useState([]);
  const [myFriends, setMyFriends] = useState([]);
  const [showRemove, setShowRemove] = useState(false);
  const [friendToRemove, setFriendToRemove] = useState('');

  // Handle the search functionality
  const handleSearch = async () => {
    const foundFriends = await fetchFriends(searchInput);
    setFriends(foundFriends);
  };

  // Add a friend to the myFriends list
  const handleAddFriend = (friend) => {
    if (!myFriends.some(f => f.username === friend.username)) {
      setMyFriends([...myFriends, friend]);
    }
  };

  // Handle removing a friend
  const handleRemoveFriend = (friendUsername) => {
    setFriendToRemove(friendUsername);
    setShowRemove(true);
  };

  // Function to actually remove a friend
  const removeFriend = (friendUsername) => {
    setMyFriends(myFriends.filter(friend => friend.username !== friendUsername));
    setShowRemove(false);
    // Navigate back after removal
    navigate('/home');
  };

  // Cancel removal operation
  const cancelRemove = () => {
    setShowRemove(false);
  };

  return (
    <div className="home">
      <div className="left">
        <div className="my-identity">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <button onClick={handleSearch}>Search</button>
          </div>
        </div>
        <div className="friends">
          {friends.length > 0 ? (
            <ul>
              {friends.map((friend, index) => (
                <li key={index}>
                  <div className="search-friend">
                    <span>#{friend.username}</span>
                    <button type="button" onClick={() => handleAddFriend(friend)}>Add</button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p>No friends found</p>
          )}
        </div>
        <div className="my-friends">
          <h3>My Friends</h3>
          <ul>
            {myFriends.map((friend, index) => (
              <li key={index}>
                <div className="friends-logo" >
                  <img src={assets.profile} alt="" className="face-logo" />
                  <span className='my-friend-name'>#{friend.username}</span>
                  <button type='submit' onClick={() => handleRemoveFriend(friend.username)}>Remove</button>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="settings">
          <div className="profile-info">
            <img src={assets.logo} alt="User" className="profile-image" />
            <span className="username">My Name</span>
          </div>
        </div>
      </div>
      <div className="right">
        <div className="friend-username">
          <div className="language-dropdown">
            <select id="language" name="language">
              <option value="none">Choose Language</option>
              <option value="en">English</option>
              <option value="hi">Hindi</option>
              <option value="mr">Marathi</option>
            </select>
          </div>
        </div>
        <div className="chat"></div>
        <div className="type-message">
          <input type="text" placeholder="Write your message..." />
          <button>Send</button>
        </div>
      </div>

      {/* Conditionally render Remove component */}
      {showRemove && (
        <Remove friendUsername={friendToRemove} onRemove={removeFriend} onCancel={cancelRemove} />
      )}
    </div>
  );
};

export default Home;
