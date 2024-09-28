import { combineReducers, configureStore } from "@reduxjs/toolkit";

import userReducer from "../pages/user/userSlice";
import loginReducer from "../pages/login/loginSlice";
import themeReducer from "../themeSlice";
import storage from "redux-persist/lib/storage/session";
import { persistReducer, persistStore } from "redux-persist";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  user: userReducer,
  login: loginReducer,
  theme: themeReducer,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
