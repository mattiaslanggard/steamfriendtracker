import React, { useState, useEffect } from 'react';

const api_key = import.meta.env.VITE_API_KEY
const my_steam_id = import.meta.env.VITE_STEAM_ID
const api_url = 'https://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v0001/?key='+ api_key +'&steamid='+ my_steam_id +'&format=json'
const api_url_test = 'https://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=' + api_key + '&steamid='+ my_steam_id +'&format=json'
const api_url_test2 = 'https://api.steampowered.com/ISteamUser/GetFriendList/v1/?key=' + api_key + '&steamid='+ my_steam_id


function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(api_url_test2, {method: "GET"})
      .then(response => response.json())
      .then(json => setData(json))
      .catch(error => console.log());
  }, []);

  return (
    <div>
      {data ? <pre>{JSON.stringify(data, null, 2)}</pre> : 'Loading...'}
    </div>
  );
}

export default App;