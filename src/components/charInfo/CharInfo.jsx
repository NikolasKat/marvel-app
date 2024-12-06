import { useEffect, useState } from "react";

import Spinner from "../ui/spinner/Spinner";
import ErrorMassage from "../errorMessage/ErrorMessage";
import Skeleton from "../ui/skeleton/Skeleton";
import useMarvelService from "../../services/MarvelService";

import "./charInfo.scss";

const CharInfo = (props) => {
   const [charInfo, setCharInfo] = useState(null);

   const { error, loading, getCharacter, clearError } = useMarvelService();

   useEffect(() => {
      updateChar();
   }, [props.data]);

   const updateChar = () => {
      if (!props.data) {
         return;
      }

      clearError();
      getCharacter(props.data).then(onCharLoaded);
   };

   const onCharLoaded = (charInfo) => {
      setCharInfo(charInfo);
   };

   const skeleton = !(error || loading || charInfo) ? <Skeleton /> : null;
   const contentComp = !(loading || error || !charInfo) ? (
      <View charInfo={charInfo} />
   ) : null;
   const errorComp = error ? <ErrorMassage /> : null;
   const loadingComp = loading ? <Spinner /> : null;

   return (
      <div className="char__info">
         {skeleton}
         {contentComp}
         {errorComp}
         {loadingComp}
      </div>
   );
};

const View = ({ charInfo }) => {
   const { name, description, thumbnail, homepage, wiki, comics } = charInfo;

   const renderComicsList = (list) => {
      // eslint-disable-next-line array-callback-return
      const items = list.map((item, index) => {
         if (index < 10) {
            return (
               <li key={index} className="char__comics-item">
                  {item.name}
               </li>
            );
         }
      });

      return <ul className="char__comics-list">{items}</ul>;
   };

   const comicsList = renderComicsList(comics);
   const comicsComp =
      comicsList.props.children.length > 0
         ? comicsList.props.children
         : "There aren`t any comics";

   let imgStyle = { objectFit: "cover" };
   if (
      thumbnail ===
      "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"
   ) {
      imgStyle = { objectFit: "contain" };
   }

   return (
      <>
         <div className="char__basics">
            <img src={thumbnail} alt={name} style={imgStyle} />
            <div>
               <div className="char__info-name">{name}</div>
               <div className="char__btns">
                  <a href={homepage} className="button button__main">
                     <div className="inner">homepage</div>
                  </a>
                  <a href={wiki} className="button button__secondary">
                     <div className="inner">Wiki</div>
                  </a>
               </div>
            </div>
         </div>
         <div className="char__description">{description}</div>
         <div className="char__comics">Comics:</div>
         {comicsComp}
      </>
   );
};

export default CharInfo;
