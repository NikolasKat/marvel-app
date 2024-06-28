import { Component } from "react";

import Spinner from "../spinner/Spinner";
import ErrorMassage from "../errorMessage/ErrorMessage";
import Skeleton from "../skeleton/Skeleton";

import MarvelService from "../../services/MarvelService";

import "./charInfo.scss";
//import thor from "../../resources/img/thor.jpeg";

class CharInfo extends Component {
   state = {
      charInfo: null,
      loading: false,
      error: false,
   };

   marvelService = new MarvelService();

   componentDidMount() {
      this.updateChar();
   }

   componentDidUpdate(prevProps) {
      if (this.props.data !== prevProps.data) {
         this.updateChar();
      }
   }

   updateChar = () => {
      if (!this.props.data) {
         return;
      }
      this.onLoading();
      this.marvelService
         .getCharacter(this.props.data)
         .then(this.onCharLoaded)
         .catch(this.onError);
   };

   onError = () => {
      this.setState({
         loading: false,
         error: true,
      });
   };

   onLoading = () => {
      this.setState({
         loading: true,
         error: false,
      });
   };

   onCharLoaded = (charInfo) => {
      this.setState({ charInfo: charInfo, loading: false });
   };

   render() {
      const { charInfo, loading, error } = this.state;

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
   }
}

const View = ({ charInfo }) => {
   const { name, description, thumbnail, homepage, wiki, comics } = charInfo;

   const renderComicsList = (list) => {
      const items = list.map((item, index) => {
         return (
            <li key={index} className="char__comics-item">
               {item.name}
            </li>
         );
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
