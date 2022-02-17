import React, { createContext, useContext, useMemo } from "react";

import ApiClient from "../services/api";
import { useAppState } from "./KebappContext";

const ApiContext = createContext({});

export const useApi = () => useContext(ApiContext);

function AuthContext({ children }) {
  const { token } = useAppState();
  const memoizedApi = useMemo(() => new ApiClient({ token }), [token]);

  return <ApiContext.Provider value={memoizedApi}>{children}</ApiContext.Provider>;
}

export default AuthContext;
