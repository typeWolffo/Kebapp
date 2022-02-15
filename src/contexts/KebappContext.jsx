import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import PropTypes from "prop-types";
import { ThemeProvider } from "styled-components";

export const AppContext = createContext({});

export const useAppState = () => useContext(AppContext);

export default function KebappContext(props) {
  const { children } = props;
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const theme = {
    accentColor: "#07CFF6",
    backgroundColor: "#04131E",
    fontColor: "#07CFF6",
    primaryColor: "#0D2534",
  };

  const setCookie = (userCookie) => {
    document.cookie = userCookie;
  };

  useEffect(() => {
    if (document.cookie) setIsAuthenticated(true);
  }, [document.cookie]);

  const context = useMemo(
    () => ({
      isAuthenticated,
      setCookie,
      setIsAuthenticated,
    }),
    [setCookie, isAuthenticated]
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
