import { Component } from "react";
import Spinner from "../spinner/Spinner";
import ErrorMassage from "../errorMessage/ErrorMessage";
import mjolnir from "../../resources/img/mjolnir.png";
import MarvelService from "../../services/MarvelService";

import "./randomChar.scss";

class RandomChar extends Component {
   state = {
      char: {},
      loading: true,
      error: false,
   };

   onError = () => {
      this.setState({
         loading: false,
         error: true,
      });
   };

   marvelService = new MarvelService();

   componentDidMount() {
      this.onUpdateCharacter();
   }

   onCharLoaded = (char) => {
      this.setState({
         char: char,
         loading: false,
      });
   };

   onCharLoading = () => {
      this.setState({ loading: true });
   };

   onUpdateCharacter = () => {
      const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
      this.onCharLoading();
      this.marvelService
         .getCharacter(id)
         .then(this.onCharLoaded)
         .catch(this.onError);
   };

   render() {
      const { char, loading, error } = this.state;

      const content = !(error || loading) ? <View char={char} /> : null;
      const errorMassage = error ? <ErrorMassage /> : null;
      const loadingMassage = loading ? <Spinner /> : null;
      return (
         <div className="randomchar">
            {content}
            {loadingMassage}
            {errorMassage}
            <div className="randomchar__static">
               <p className="randomchar__title">
                  Random character for today!
                  <br />
                  Do you want to get to know him better?
               </p>
               <p className="randomchar__title">Or choose another one</p>
               <button
                  className="button button__main"
                  onClick={this.onUpdateCharacter}
               >
                  <div className="inner">try it</div>
               </button>
               <img
                  src={mjolnir}
                  alt="mjolnir"
                  className="randomchar__decoration"
               />
            </div>
         </div>
      );
   }
}

const View = ({ char }) => {
   const { name, description, thumbnail, homepage, wiki } = char;
   return (
      <div className="randomchar__block">
         <img
            src={thumbnail}
            alt="Random character"
            className="randomchar__img"
         />
         <div className="randomchar__info">
            <p className="randomchar__name">{name}</p>
            <p className="randomchar__descr">{description}</p>
            <div className="randomchar__btns">
               <a href={homepage} className="button button__main">
                  <div className="inner">homepage</div>
               </a>
               <a href={wiki} className="button button__secondary">
                  <div className="inner">Wiki</div>
               </a>
            </div>
         </div>
      </div>
   );
};

export default RandomChar;
