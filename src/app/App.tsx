import { BrowserRouter } from "react-router-dom";

import Header from "@/components/Header/Header";
import GamesPage from "@/pages/GamesPage/GamesPage";

import "./App.scss";

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Header />
        <main className="app__main">
          <GamesPage />
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
