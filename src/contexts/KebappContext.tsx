import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from 'react'
import { ThemeProvider } from 'styled-components'
import { useNetworkState } from 'react-use'

export const AppContext = createContext({ isAuth: false, isOnline: false, isModalOpen: false })

export const useAppState = () => useContext(AppContext)

type Props = {
  children: ReactNode
}

interface AppContextType {
  isAuth: boolean
  isModalOpen: boolean
  isOnline: boolean
  setIsAuth: React.Dispatch<React.SetStateAction<boolean>>
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export default function KebappContext(props: Props) {
  const { children } = props
  const [isAuth, setIsAuth] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const { online: isOnline } = useNetworkState()

  useEffect(() => console.log(isOnline), [isOnline])

  const theme = {
    accentColor: '#07CFF6',
    backgroundColor: '#04131E',
    errorColor: '#FF3636',
    fontColor: '#07CFF6',
    primaryColor: '#0D2534',
  }

  const context: AppContextType = useMemo(() => ({ isAuth, isModalOpen, isOnline: isOnline as boolean, setIsAuth, setIsModalOpen }), [isAuth, isModalOpen, isOnline, setIsAuth, setIsModalOpen])

  return (
    <AppContext.Provider value={context}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </AppContext.Provider>
  )
}
