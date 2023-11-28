import {configureStore} from "@reduxjs/toolkit"
import competenceReducer from "../slices/competenceSlice"
import errorReducer from "../slices/errorSlice"
import preloaderReducer from "../slices/preloaderSlice"
import userReducer from "../slices/userSlice"
export const store = configureStore({
    reducer: {
        errorReducer,
        preloaderReducer,
        competenceReducer,
        userReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;