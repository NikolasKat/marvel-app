import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import Skeleton from "../skeleton/Skeleton";
import ErrorMassage from "../errorMessage/ErrorMessage";
import Spinner from "../spinner/Spinner";
import AppBanner from "../appBanner/AppBanner";

import useMarvelService from "../../services/MarvelService";
import "./singleComic.scss";

const SingleComic = (props) => {
   const [comicsInfo, setComicsInfo] = useState(null);
   const { id } = useParams();

   const { error, loading, getOneComics, clearError } = useMarvelService();

   useEffect(() => {
      if (!id) {
         return;
      }

      clearError();
      getOneComics(id).then(onComicsLoaded);
   }, [id]);

   const onComicsLoaded = (comicsInfo) => {
      setComicsInfo(comicsInfo);
   };

   const skeleton = !(error || loading || comicsInfo) ? <Skeleton /> : null;
   const contentComp = !(loading || error || !comicsInfo) ? (
      <View comicsInfo={comicsInfo} />
   ) : null;
   const errorComp = error ? <ErrorMassage /> : null;
   const loadingComp = loading ? <Spinner /> : null;

   return (
      <>
         {skeleton}
         {contentComp}
         {errorComp}
         {loadingComp}
      </>
   );
};

const View = ({ comicsInfo }) => {
   return (
      <>
         <AppBanner />
         <div className="single-comic">
            <img
               alt={comicsInfo.title}
               src={comicsInfo.thumbnail}
               className="single-comic__img"
            />
            <div className="single-comic__info">
               <h2 className="single-comic__name">{comicsInfo.title}</h2>
               <p className="single-comic__description">
                  {comicsInfo.description}
               </p>
               <p className="single-comic__description">
                  {comicsInfo.pageCount}
               </p>
               <p className="single-comic__description"></p>
               <div className="single-comic__price">{comicsInfo.price}</div>
            </div>
            <a href="#" className="single-comic__back">
               Back to all
            </a>
         </div>
      </>
   );
};

export default SingleComic;
