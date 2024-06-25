export default class MarvelService {
   _apiBase = "https://gateway.marvel.com:443/v1/public/";
   _apiKey = "apikey=fb24ab3a6ab52691753e62c57445116f";

   getRecourse = async (url) => {
      const result = await fetch(url);

      if (!result.ok) {
         throw new Error(`Error of service, error status: ${result.status}`);
      }

      return await result.json();
   };

   getAllCharacters = async () => {
      const res = await this.getRecourse(
         `${this._apiBase}characters?limit=9&offset=210&${this._apiKey}`
      );
      return res.data.results.map(this._transformCharacter);
   };

   getCharacter = async (id) => {
      const res = await this.getRecourse(
         `${this._apiBase}characters/${id}?${this._apiKey}`
      );
      return this._transformCharacter(res.data.results[0]);
   };

   _transformCharacter = (char) => {
      return {
         name: char.name,
         description: `${
            char.description.slice
               ? char.description.slice(0, 160)
               : "Description is not found"
         }...`,
         thumbnail: char.thumbnail.path + "." + char.thumbnail.extension,
         homepage: char.urls[0].url,
         wiki: char.urls[1].url,
      };
   };
}
