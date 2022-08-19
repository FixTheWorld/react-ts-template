import { configureStore } from "@reduxjs/toolkit";
import counterSlice from "./counter";
import movieSlice from "./movieSlice";

const store=configureStore({
    reducer:{
        counter:counterSlice,
        movies:movieSlice
    }
});

export type RootState=ReturnType<typeof store.getState>;
export type AppDispatch=typeof store.dispatch;
export default store;