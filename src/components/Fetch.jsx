import { useState, useEffect } from "react";
import GamesList from "./GamesList";

const api_key = import.meta.env.VITE_API_KEY;
const my_steam_id = import.meta.env.VITE_STEAM_ID;
const api_url =
  "https://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v0001/?key=" +
  api_key +
  "&steamid=" +
  my_steam_id +
  "&format=json";
/*const api_url_test =
  "https://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=" +
  api_key +
  "&steamid=" +
  my_steam_id +
  "&format=json";
const api_url_test2 =
  "https://api.steampowered.com/ISteamUser/GetFriendList/v1/?key=" +
  api_key +
  "&steamid=" +
  my_steam_id;

const Fetch = () => {
  const [info, setInfo] = useState([]);
  useEffect(() => {
    fetch(api_url)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setInfo(data);
      });
  }, []);
  return (
    <div>
      {info ? <pre>{JSON.stringify(info, null, 2)}</pre> : "Loading..."}
    </div>
  );
};
export default Fetch;*/

const Fetch = () => {
  const [info, setInfo] = useState([]);

  useEffect(() => {
    fetch(api_url)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setInfo(data.response.games);
      });
  }, []);

  return (
    <div>{info.length > 0 ? <GamesList games={info} /> : "Loading..."}</div>
  );
};

export default Fetch;
