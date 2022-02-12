import React, { createContext, useContext, useMemo, useState } from "react";
import PropTypes from "prop-types";
import { ThemeProvider } from "styled-components";

export const AppContext = createContext({});

export const useAppState = () => useContext(AppContext);

export default function KebappContext(props) {
  const { children } = props;
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const theme = {
    accentColor: "#66fcf1",
    backgroundColor: "#565353",
    fontColor: "#e0dddd",
    primaryColor: "#3f3f3f",
  };

  const setCookie = (userCookie) => {
    document.cookie = userCookie;
  };

  const context = useMemo(
    () => ({
      isAuthenticated,
      setCookie,
      setIsAuthenticated,
    }),
    [setCookie, isAuthenticated, setIsAuthenticated]
  );
  console.log(isAuthenticated);
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
