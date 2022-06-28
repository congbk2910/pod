import React from "react";
import Axios, { AxiosInstance } from "axios";

export const ApiContext = React.createContext<null | AxiosInstance>(null);

type ApiProviderProps = {
  children: React.ReactNode;
};

export const ApiProvider = (props: ApiProviderProps) => {
  const { children } = props;

  const axios = React.useMemo(() => {
    const instance = Axios.create({
      baseURL: process.env.NEXT_PUBLIC_APP_API_URL,
      timeout: 20000,
      headers: {
        "Content-Type": "application/json",
      },
    });

    return instance;
  }, []);

  return <ApiContext.Provider value={axios}>{children}</ApiContext.Provider>;
};

export const useApi = () => {
  return React.useContext(ApiContext);
};
