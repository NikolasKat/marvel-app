import { useHttp } from "../hooks/http.hook";

const useMarvelService = () => {
   const { loading, error, request, clearError } = useHttp();

   const _apiBase = "https://gateway.marvel.com:443/v1/public/";
   const _apiKey = "apikey=fb24ab3a6ab52691753e62c57445116f";
   const _baseOffset = 210;

   const getAllCharacters = async (offset = _baseOffset) => {
      const res = await request(
         `${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`
      );
      return res.data.results.map(_transformCharacter);
   };

   const getCharacter = async (id) => {
      const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
      return _transformCharacter(res.data.results[0]);
   };

   const getAllComics = async (offset = _baseOffset) => {
      const res = await request(`${_apiBase}comics?limit=8&${_apiKey}`);

      return res.data.results.map(_transformComic);
   };

   const getOneComics = async (id) => {
      const res = await request(`${_apiBase}comics/${id}?${_apiKey}`);
      return _transformComic(res.data.results[0]);
   };

   const _transformCharacter = (char) => {
      return {
         id: char.id,
         name: char.name,
         description: char.description
            ? `${char.description.slice(0, 210)}...`
            : "Description is not found",
         thumbnail: char.thumbnail.path + "." + char.thumbnail.extension,
         homepage: char.urls[0].url,
         wiki: char.urls[1].url,
         comics: char.comics.items,
      };
   };

   const _transformComic = (comic) => {
      return {
         id: comic.id,
         title: comic.title,
         description: comic.description || "Description is not found",
         pageCount: comic.pageCount
            ? `${comic.pageCount} p.`
            : "No information about the number of pages",
         thumbnail: comic.thumbnail.path + "." + comic.thumbnail.extension,
         price: comic.prices[0].price
            ? `${comic.prices[0].price}$`
            : "not available",
      };
   };

   return {
      loading,
      error,
      getAllCharacters,
      getAllComics,
      getCharacter,
      getOneComics,
      clearError,
   };
};

export default useMarvelService;
