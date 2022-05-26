import React, { createContext, ReactNode, useContext, useMemo } from "react";

import AuthService from "../services/authService";
import Api from "../services/api";

const ApiContext = createContext({});

export const useAuth = () => useContext(ApiContext);

type Props = {
  children: ReactNode
}

function AuthContext(props: Props) {
  const {children} = props;
  const currentToken = localStorage.getItem("token");
  const authService = new AuthService();
  const apiService = new Api(currentToken);

  const memoizedAuth = useMemo(
    () => ({
      apiService,
      authService,
    }),
    [currentToken]
  );

  return (
    <ApiContext.Provider value={memoizedAuth}>{children}</ApiContext.Provider>
  );
}

export default AuthContext;
