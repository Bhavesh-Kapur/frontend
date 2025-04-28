import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom'; // Add Link import
import './styles/main.css';
import './styles/lobby.css';
import logo from '../../public/images/logo.png';

const LobbyPage = () => {
  const [displayName, setDisplayName] = useState('');
  const [roomId, setRoomId] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const savedName = localStorage.getItem('display_name');
    if (savedName) {
      setDisplayName(savedName);
    }

    const queryParams = new URLSearchParams(location.search);
    const idFromURL = queryParams.get('room'); // Support both 'id' and 'room'

    if (idFromURL) {
      setRoomId(idFromURL);
    }
  }, [location.search]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!displayName.trim()) return; // Add basic validation

    localStorage.setItem('display_name', displayName);
    const inviteCode = roomId || `room_${Math.floor(Math.random() * 10000)}`; // More unique room ID
    navigate(`/room?room=${inviteCode}`);
  };

  return (
    <div>
      {/* Header */}
      <header id="nav">
        <div className="nav--list">
          <a href="/lobby">
            <h3 id="logo">
              <img src={logo} alt="Site Logo" />
              <span>StuMeet</span>
            </h3>
          </a>
        </div>

        <div id="nav__links">
          <a className="nav__link" href="/">
            Lobby
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#ede0e0" viewBox="0 0 24 24">
              <path d="M20 7.093v-5.093h-3v2.093l3 3zm4 5.907l-12-12-12 12h3v10h7v-5h4v5h7v-10h3zm-5 8h-3v-5h-8v5h-3v-10.26l7-6.912 7 6.99v10.182z" />
            </svg>
          </a>
          <a className="nav__link" id="create__room__btn" href="/lobby">
            Create Room
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#ede0e0" viewBox="0 0 24 24">
              <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6 13h-5v5h-2v-5h-5v-2h5v-5h2v5h5v2z" />
            </svg>
          </a>
        </div>
      </header>

      {/* Main Form */}
      <main id="room__lobby__container">
        <div id="form__container">
          <div id="form__container__header">
            <p>👋 Create or Join Room</p>
          </div>

          <form id="lobby__form" onSubmit={handleSubmit}>
            <div className="form__field__wrapper">
              <label>Your Name</label>
              <input
                type="text"
                name="name"
                required
                placeholder="Enter your display name..."
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
              />
            </div>

            <div className="form__field__wrapper">
              <label>Room Name</label>
              <input
                type="text"
                name="room"
                placeholder="Enter room name..."
                value={roomId}
                onChange={(e) => setRoomId(e.target.value)}
              />
            </div>

            <div className="form__field__wrapper">
              <button type="submit">
                Go to Room
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                  <path d="M13.025 1l-2.847 2.828 6.176 6.176h-16.354v3.992h16.354l-6.176 6.176 2.847 2.828 10.975-11z" />
                </svg>
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default LobbyPage;
