import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";

import decoration from "../../resources/img/vision.png";

const App = () => {
   return (
      <div className="app">
         <AppHeader />
         <main>
            <RandomChar />
            <div className="char__content">
               <CharList />
               <CharInfo />
            </div>
            <img src={decoration} className="bg-decoration" alt="vision" />
         </main>
      </div>
   );
};

export default App;
