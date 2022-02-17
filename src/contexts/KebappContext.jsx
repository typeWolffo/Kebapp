import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";
import { ThemeProvider } from "styled-components";

export const AppContext = createContext({});

export const useAppState = () => useContext(AppContext);

export default function KebappContext(props) {
  const { children, token } = props;
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const theme = {
    accentColor: "#07CFF6",
    backgroundColor: "#04131E",
    fontColor: "#07CFF6",
    primaryColor: "#0D2534",
  };

  useEffect(() => {
    if (document.cookie) setIsAuthenticated(true);
  }, [document.cookie]);

  console.log(isAuthenticated);

  const context = useMemo(
    () => ({
      isAuthenticated,
      setIsAuthenticated,
      token,
    }),
    [token, isAuthenticated]
  );
  return (
    <AppContext.Provider value={context}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </AppContext.Provider>
  );
}
KebappContext.defaultProps = {
  children: null,
};

KebappContext.propTypes = {
  children: PropTypes.element,
};
