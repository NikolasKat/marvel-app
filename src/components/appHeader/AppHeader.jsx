import { PersonFillIcon } from "@primer/octicons-react";
import { NavLink, Outlet } from "react-router-dom";

import "./appHeader.scss";

const AppHeader = () => {
   return (
      <>
         <header className="app__header">
            <h1 className="app__title">
               <NavLink to="/">
                  <span>Marvel</span>{" "}
                  <span style={{ color: "black" }}>information portal</span>
               </NavLink>
            </h1>
            <nav className="app__menu">
               <ul>
                  <li>
                     <NavLink to="/">Characters</NavLink>
                     <PersonFillIcon size={16} />
                  </li>
                  /
                  <li>
                     <NavLink to="/comics">Comics</NavLink>
                  </li>
               </ul>
            </nav>
         </header>
         <main>
            <Outlet />
         </main>
      </>
   );
};

export default AppHeader;
