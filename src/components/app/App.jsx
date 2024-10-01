import { Route, Routes } from "react-router-dom";

import AppHeader from "../appHeader/AppHeader";
import SingleComic from "../singleComic/SingleComic";

import ComicsPage from "../pages/ComicsPage";
import HomePage from "../pages/HomePage";

const App = () => {
   return (
      <>
         <div className="app">
            <Routes>
               <Route path="/" element={<AppHeader />}>
                  <Route index element={<HomePage />} />
                  <Route path="comics" element={<ComicsPage />} />
                  <Route path="comics/:id" element={<SingleComic />} />
               </Route>
            </Routes>
         </div>
      </>
   );
};

export default App;
