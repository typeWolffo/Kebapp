import React, { createContext, useContext, useMemo } from "react";
import PropTypes from "prop-types";
import { ThemeProvider } from "styled-components";

export const AppContext = createContext({});

export const useAppState = () => useContext(AppContext);

export default function KebappContext(props) {
  const { children } = props;

  const theme = {
    accentColor: "#66fcf1",
    backgroundColor: "#747474",
    fontColor: "#e0dddd",
    primaryColor: "#9f9d9d",
  };

  const context = useMemo(
    () => ({
      // context data here
    }),
    [
      // context data here
    ]
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
