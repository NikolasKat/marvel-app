import { configureStore } from "@reduxjs/toolkit";
import comicsReducer from "./slice";

export default configureStore({
   reducer: {
      comics: comicsReducer,
   },
});
