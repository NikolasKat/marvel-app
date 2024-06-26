import { Component } from "react";
import Spinner from "../spinner/Spinner";
import ErrorMassage from "../errorMessage/ErrorMessage";
import MarvelService from "../../services/MarvelService";

import "./charList.scss";

class CharList extends Component {
   state = {
      charList: [],
      loading: true,
      error: false,
   };

   marvelService = new MarvelService();

   componentDidMount() {
      this.marvelService
         .getAllCharacters()
         .then(this.onCharLoaded)
         .catch(this.onChangeError);
   }

   onCharLoaded = (charList) => {
      this.setState({
         charList,
         loading: false,
      });
   };

   onChangeError = () => {
      this.setState({
         loading: false,
         error: true,
      });
   };

   renderList(arr) {
      const result = arr.map((item) => {
         return (
            <li className="char__item char__item">
               <img src={item.thumbnail} alt="abyss" />
               <div className="char__name">{item.name}</div>
            </li>
         );
      });
      return <ul className="char__grid">{result}</ul>;
   }

   render() {
      const { charList, loading, error } = this.state;
      const item = this.renderList(charList);

      const errorComp = error ? <ErrorMassage /> : null;
      const loadingComp = loading ? <Spinner /> : null;
      const contentComp = !(loading || error) ? item : null;

      return (
         <div className="char__list">
            {errorComp}
            {loadingComp}
            {contentComp}
            <button className="button button__main button__long">
               <div className="inner">load more</div>
            </button>
         </div>
      );
   }
}

export default CharList;
