const Game = ({ game }) => {
  return (
    <div className="game-card">
      <img
        src={`https://cdn.cloudflare.steamstatic.com/steam/apps/${game.appid}/capsule_sm_120.jpg`}
        alt={game.name}
      />
      <h3>{game.name}</h3>
      <p>Playtime (2 weeks): {game.playtime_2weeks} minutes</p>
      <p>Playtime (forever): {game.playtime_forever} minutes</p>
    </div>
  );
};

export default Game;
