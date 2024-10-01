import { useState } from "react";

import ErrorBoundary from "../errorBoundary/ErrorBoundary";
import RandomChar from "../randomChar/RandomChar";
import CharInfo from "../charInfo/CharInfo";
import CharList from "../charList/CharList";

import decoration from "../../resources/img/vision.png";

const HomePage = () => {
   const [selectedChar, setSelectedChar] = useState(null);

   const onCharSelected = (id) => {
      setSelectedChar(id);
   };

   return (
      <>
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
      </>
   );
};

export default HomePage;
