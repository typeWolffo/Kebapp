import React, {createContext, ReactNode, useContext, useMemo, useState} from "react";
import { ThemeProvider } from "styled-components";

export const AppContext = createContext({});

export const useAppState = () => useContext(AppContext);

type Props = {
    children: ReactNode
}

export default function KebappContext(props: Props) {
    const { children } = props;
    const [isAuth, setIsAuth] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const theme = {
        accentColor: "#07CFF6",
        backgroundColor: "#04131E",
        errorColor: "#FF3636",
        fontColor: "#07CFF6",
        primaryColor: "#0D2534",
    };

    const context = useMemo(() => ({ isAuth, isModalOpen, setIsAuth, setIsModalOpen }), [isAuth, isModalOpen, setIsAuth, setIsModalOpen]);

    return (
        <AppContext.Provider value={context}>
            <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </AppContext.Provider>
    );
}
