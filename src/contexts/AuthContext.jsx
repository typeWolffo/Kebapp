import React, { createContext, useContext, useMemo } from "react";

import PropTypes from "prop-types";
import AuthService from "../services/authService";
import Api from "../services/api";

const ApiContext = createContext({});

export const useAuth = () => useContext(ApiContext);

function AuthContext({ children }) {
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

  return <ApiContext.Provider value={memoizedAuth}>{children}</ApiContext.Provider>;
}

AuthContext.propTypes = {
  children: PropTypes.element.isRequired,
};

export default AuthContext;
