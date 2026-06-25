import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import sampleInfoSlice from "./publicSampleInfoSlice";
//import sampleReducer from "./sampleSlice";

import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";

const Reduceres = combineReducers({
    auth: userSlice,
    sampleInfo: sampleInfoSlice,

//    sample: sampleReducer
});

// 🎯 إعداد persist
const persistConfig = {
    key: "root",
    storage,
    whitelist: ["auth"] 
};

const persistedReducer = persistReducer(persistConfig, Reduceres);

export const store = configureStore({
    reducer: persistedReducer
});

export const persistor = persistStore(store);