"use client";

import { persistor, store } from "@/redux/store";
import { Provider } from "react-redux";
import React from "react";
import { PersistGate } from "redux-persist/integration/react";

type TProps = { children: React.ReactNode };

const Providers = ({ children }: TProps) => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        {children}
      </PersistGate>
    </Provider>
  );
};

export default Providers;
