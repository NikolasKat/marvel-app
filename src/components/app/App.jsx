import { useState } from "react";

import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";
import AppBanner from "../appBanner/AppBanner";
import ComicsList from "../comicsList/ComicsList";
import SingleComic from "../singleComic/SingleComic";

import decoration from "../../resources/img/vision.png";

const App = () => {
   const [selectedChar, setSelectedChar] = useState(null);
   const [selectedComics, setSelectedComics] = useState(null);

   const onCharSelected = (id) => {
      setSelectedChar(id);
   };

   const onComicsSelected = (id) => {
      setSelectedComics(id);
   };

   return (
      <div className="app">
         <AppHeader />
         <main>
            <ErrorBoundary>
               <RandomChar />
            </ErrorBoundary>
            <div className="char__content">
               <ErrorBoundary>
                  <CharList onCharSelected={onCharSelected} />
               </ErrorBoundary>
               <ErrorBoundary>
                  <CharInfo data={selectedChar} />
               </ErrorBoundary>
            </div>
            <img src={decoration} className="bg-decoration" alt="vision" />
            <AppBanner />
            <ComicsList onComicsSelected={onComicsSelected} />
            <SingleComic data={selectedComics} />
         </main>
      </div>
   );
};

export default App;
