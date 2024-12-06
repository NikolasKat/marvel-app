import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import useMarvelService from "../../services/MarvelService";
import ErrorMassage from "../errorMessage/ErrorMessage";
import Spinner from "../ui/spinner/Spinner";

import "./comicsList.scss";

const ComicsList = (props) => {
   const [comicsList, setComicsList] = useState([]);
   const [newComicsLoading, setNewComicsLoading] = useState(false);
   const [offset, setOffset] = useState(0);
   const [comicsEnded, setComicsEnded] = useState(false);

   const { error, loading, getAllComics } = useMarvelService();

   useEffect(() => {
      onRequest(offset, true);
   }, []);

   const onRequest = (offset, initial) => {
      initial ? setNewComicsLoading(false) : setNewComicsLoading(true);

      getAllComics(offset).then(onComicsListLoaded);
   };

   const onComicsListLoaded = (newList) => {
      let ended = false;
      if (newList.length < 8) {
         ended = true;
      }

      setComicsList((comicsList) => [...comicsList, ...newList]);
      setNewComicsLoading((newComicsLoading) => false);
      setOffset((offset) => offset + 8);
      setComicsEnded((comicsEnded) => ended);
   };

   function renderComicsList(arr) {
      const items = arr.map((item) => {
         return (
            <Link
               className="comics__item"
               key={item.id}
               to={`/comics/${item.id}`}
               onClick={() => {
                  props.onComicsSelected(item.id);
               }}
            >
               <img
                  src={item.thumbnail}
                  alt="ultimate war"
                  className="comics__item-img"
               />
               <div className="comics__item-name">{item.title}</div>
               <div className="comics__item-price">{item.price}</div>
            </Link>
         );
      });

      return <ul className="comics__grid">{items}</ul>;
   }

   const items = renderComicsList(comicsList);
   const errorMessage = error ? <ErrorMassage /> : null;
   const loadingMessage = loading ? <Spinner /> : null;

   return (
      <div className="comics__list">
         {items}
         {errorMessage}
         {loadingMessage}
         <button
            className="button button__main button__long"
            disabled={newComicsLoading}
            style={{ display: comicsEnded ? "none" : "block" }}
            onClick={() => onRequest(offset)}
         >
            <div className="inner">load more</div>
         </button>
      </div>
   );
};

export default ComicsList;
