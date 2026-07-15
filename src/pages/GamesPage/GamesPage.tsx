import gamesLogo from "@/assets/icons/games_logo.svg";
import GameList from "@/components/GameList/GameList";
import "./styles.scss";

const GamesPage = () => {
  return (
    <section className="games-page">
      <div className="games-page__title">
        <img src={gamesLogo} alt="" aria-hidden="true" />
        <h1>Pragmatic Play</h1>
      </div>
      <GameList />
    </section>
  );
};

export default GamesPage;
