// src/components/FriendsList.jsx
import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Avatar,
  CircularProgress,
} from "@mui/material";
import "../App.css";

function convertMinutes(mins) {
  let days = Math.floor(mins / 24 / 60);
  let hours = Math.floor(mins / 60) % 24;
  let minutes = mins % 60;
  return `${days}d ${hours}h ${minutes}m`;
}

function percentageCalc(mins) {
  const totalMinutesInTwoWeeks = 20160;
  const percentage = (mins / totalMinutesInTwoWeeks) * 100;
  return percentage.toFixed(0);
}

const FriendsList = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const [friends, setFriends] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  React.useEffect(() => {
    setPage(0);
  }, [friends]);
  useEffect(() => {
    const fetchFriends = async () => {
      setIsLoading(true); // Set loading to true when the fetch starts
      try {
        const response = await fetch("http://localhost:8000/friends");
        const data = await response.json();
        const steamids = data.data.map((friend) => friend.steamid);
        const steamidsParams = steamids.map((id) => `steamids=${id}`).join("&");
        const profileResponse = await fetch(
          `http://localhost:8000/players/?${steamidsParams}`
        );
        const profileData = await profileResponse.json();
        const friendsData = data.data.map((friend) => {
          const profile = profileData.data.find(
            (profile) => profile.steamid === friend.steamid
          );
          return { ...friend, ...profile };
        });

        const twoWeeksAgo = Date.now() / 1000 - 2 * 7 * 24 * 60 * 60; // timestamp for two weeks ago in seconds
        const recentFriends = friendsData.filter(
          (friend) => friend.lastlogoff > twoWeeksAgo
        );

        for (let friend of recentFriends) {
          const gamesResponse = await fetch(
            `http://localhost:8000/recent_games/${friend.steamid}`
          );
          const gamesData = await gamesResponse.json();
          friend.recentGames = gamesData.data.games || [];
          friend.totalPlaytime = friend.recentGames.reduce(
            (total, game) => total + game.playtime_2weeks,
            0
          );
        }
        setFriends(
          recentFriends.sort((a, b) => b.totalPlaytime - a.totalPlaytime)
        );
      } catch (error) {
        console.error("Error fetching Steam friends:", error);
        setError(error.toString()); // Set the error state
      }
      setIsLoading(false); // Set loading to false when the fetch ends
    };

    fetchFriends();
  }, []);

  if (isLoading) {
    return (
      <div>
        <h2 className="friends-list-title">My Steam Friends</h2>
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className="friends-list-container">
      <h2 className="friends-list-title">
        My Steam Friends Playtime The Last Two Weeks
      </h2>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Avatar</TableCell>
              <TableCell>Friend Name</TableCell>
              <TableCell>Total Playtime</TableCell>
              <TableCell>%</TableCell>
              {/* Add more table cells here for additional data fields */}
            </TableRow>
          </TableHead>
          <TableBody>
            {friends
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((friend, index) => (
                <TableRow key={friend.id} className="TableRow">
                  <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                  <TableCell>
                    <Avatar src={friend.avatar} />
                  </TableCell>
                  <TableCell>{friend.personaname}</TableCell>
                  <TableCell>{convertMinutes(friend.totalPlaytime)}</TableCell>
                  <TableCell>{percentageCalc(friend.totalPlaytime)}%</TableCell>
                  {/* Add more table cells here for additional data fields */}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={friends.length}
        page={page}
        onPageChange={(event, newPage) => setPage(newPage)}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={(event) =>
          setRowsPerPage(parseInt(event.target.value, 10))
        }
      />
    </div>
  );
};

export default FriendsList;
