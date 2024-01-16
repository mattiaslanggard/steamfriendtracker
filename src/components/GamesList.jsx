import Game from "./Game";

const GamesList = ({ games }) => {
  return (
    <div className="games-list">
      {games.map((game) => (
        <Game key={game.appid} game={game} />
      ))}
    </div>
  );
};

export default GamesList;
