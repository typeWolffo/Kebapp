import React, { createContext, useContext, useMemo } from "react";

import PropTypes from "prop-types";
import ApiClient from "../services/api";

const ApiContext = createContext({});

export const useApi = () => useContext(ApiContext);

function AuthContext({ children }) {
  const token = localStorage.getItem("token");
  const memoizedApi = useMemo(() => new ApiClient({ token }), [token]);

  return <ApiContext.Provider value={memoizedApi}>{children}</ApiContext.Provider>;
}

AuthContext.propTypes = {
  children: PropTypes.element.isRequired,
};

export default AuthContext;
