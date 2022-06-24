import { createContext, ReactNode, useContext, useMemo, useState } from 'react'
import { ThemeProvider } from 'styled-components'
import { useNetworkState, useTitle } from 'react-use'
import { useDispatch } from 'react-redux'
import { useAllEvents } from '../hooks/eventHooks'
import { setEvents } from '../slices/getAllEvents'

export const AppContext = createContext({ isAuth: false, isOnline: false, isModalOpen: false, allEventStatus: '' })

export const useAppState = () => useContext(AppContext)

type Props = {
  children: ReactNode
}

interface AppContextType {
  isAuth: boolean
  isModalOpen: boolean
  isOnline: boolean
  allEventStatus: string
  setIsAuth: React.Dispatch<React.SetStateAction<boolean>>
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export default function KebappContext(props: Props) {
  const { children } = props
  const [isAuth, setIsAuth] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { status: allEventStatus, data: events, error: allEventsError } = useAllEvents()
  const dispatch = useDispatch()
  useTitle('Kebapp')

  if (allEventStatus === 'success') dispatch(setEvents(events))

  const { online: isOnline } = useNetworkState()

  const theme = {
    accentColor: '#07CFF6',
    backgroundColor: '#04131E',
    errorColor: '#FF3636',
    fontColor: '#07CFF6',
    primaryColor: '#0D2534',
  }

  const context: AppContextType = useMemo(
    () => ({ isAuth, isModalOpen, isOnline: isOnline as boolean, allEventStatus, setIsAuth, setIsModalOpen }),
    [isAuth, isModalOpen, isOnline, allEventStatus, setIsAuth, setIsModalOpen]
  )

  return (
    <AppContext.Provider value={context}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </AppContext.Provider>
  )
}
