import { createContext, ReactNode, useContext, useMemo, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNetworkState, useTitle } from 'react-use'

import { useAllEvents } from '../hooks/eventHooks'
import { setEvents } from '../slices/getAllEvents'

export const AppContext = createContext({ isOnline: false, isModalOpen: false, allEventStatus: '' })

export const useAppState = () => useContext(AppContext)

type Props = {
  children: ReactNode
}

interface AppContextType {
  isModalOpen: boolean
  isOnline: boolean
  allEventStatus: string
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export default function KebappContext(props: Props) {
  const { children } = props
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { status: allEventStatus, data: events } = useAllEvents()
  const dispatch = useDispatch()
  useTitle('Kebapp')

  if (allEventStatus === 'success') dispatch(setEvents(events))

  const { online: isOnline } = useNetworkState()

  const context: AppContextType = useMemo(() => ({ isModalOpen, isOnline: isOnline as boolean, allEventStatus, setIsModalOpen }), [isModalOpen, isOnline, allEventStatus, setIsModalOpen])

  return <AppContext.Provider value={context}>{children}</AppContext.Provider>
}
