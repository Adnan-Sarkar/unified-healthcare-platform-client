import {
  getFromLocalStorage,
  removeFromLocalStorage,
  setToLocalStorage,
} from "@/utils/local-storage";
import { decodedToken } from "@/utils/jwtHelpers";
import {TTokenData} from "@/types";

const authKey = process.env.NEXT_PUBLIC_AUTH_KEY as string;

export const storeUserInfo = (token: string) => {
  return setToLocalStorage(authKey, token);
};

export const getUserInfo = () => {
  const authToken = getFromLocalStorage(authKey);

  if (authToken) {
    const decodedData = decodedToken(authToken);

    if (Date.now() >= decodedData.exp * 1000) {
      return null;
    }

    return {
      ...decodedData,
    };
  }
};

export const removeUserInfo = () => {
  return removeFromLocalStorage(authKey);
};

export const isLoggedIn = () => {
  const authToken = getFromLocalStorage(authKey);
  return !!authToken;
};
