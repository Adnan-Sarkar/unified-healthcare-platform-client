import storage from "redux-persist/lib/storage";
import tokenReducer from "@/redux/features/user/tokenSlice";
import userReducer from "@/redux/features/user/userSlice";
import { persistReducer } from "redux-persist";
import baseApi from "./api/baseApi";

const persistConfig = {
  key: process.env.NEXT_PUBLIC_AUTH_KEY as string,
  storage,
};

const persistedAuthReducer = persistReducer(persistConfig, tokenReducer);

export const reducer = {
  [baseApi?.reducerPath]: baseApi?.reducer,
  token: persistedAuthReducer,
  user: userReducer,
};
