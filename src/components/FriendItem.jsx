// src/components/FriendItem.jsx
import React from "react";
import "../App.css";

function formatPlaytime(minutes) {
  const days = Math.floor(minutes / (60 * 24));
  const hours = Math.floor((minutes % (60 * 24)) / 60);
  const remainingMinutes = minutes % 60;
  return `${days}d ${hours}h ${remainingMinutes}m`;
}

const FriendItem = ({ friend }) => (
  <li key={friend.steamid} className="friend-item">
    <div className="friend-item-header">
      <img src={friend.avatar} alt={friend.personaname} />
      <h3>{friend.personaname}</h3>
    </div>
    <div>
      Total playtime last 2 weeks: {formatPlaytime(friend.totalPlaytime)}
    </div>
    <h4>Recently Played Games:</h4>
    <ul>
      {friend.recentGames.map((game) => (
        <li key={game.appid}>
          <h5>{game.name}</h5>
          <img
            src={`http://media.steampowered.com/steamcommunity/public/images/apps/${game.appid}/${game.img_icon_url}.jpg`}
            alt={game.name}
          />
          <p>Playtime in the last 2 weeks: {game.playtime_2weeks} minutes</p>
        </li>
      ))}
    </ul>
  </li>
);

export default React.memo(FriendItem);
