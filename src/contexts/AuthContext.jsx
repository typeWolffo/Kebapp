import React, { createContext, useContext, useMemo } from "react";

import ApiClient from "../services/api";

const ApiContext = createContext({});

export const useApi = () => useContext(ApiContext);

function AuthContext({ children }) {
  const token = localStorage.getItem("token");
  const memoizedApi = useMemo(() => new ApiClient({ token }), [token]);

  return <ApiContext.Provider value={memoizedApi}>{children}</ApiContext.Provider>;
}

export default AuthContext;
