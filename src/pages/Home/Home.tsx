import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllEvents } from '../../slices/getAllEvents'
import { RootState } from '../../store/store'
import EventCard from '../../components/EventCard/EventCard'
import { EventDataType, ManageEventType } from '../../types/EventType'
import useUser from '../../hooks/useUser'
import { StyledEventsWrapper } from './style'
import { useAppState } from '../../contexts/KebappContext'
import SavedEventCard from '../../components/EventCard/SavedEventCard'

function Home() {
  const dispatch = useDispatch()
  const { events } = useSelector((state: RootState) => state.getAllEvents) //TODO: change teh way of events fetching to react-query and saving these events to state for better offline experience
  const { userToken } = useSelector((state: RootState) => state.auth)
  const { status: userStatus, mutate: getUser, data: userData } = useUser()
  const { isOnline } = useAppState()
  const storageEvents = localStorage.getItem('savedEvents')

  const draftEvents = storageEvents && JSON.parse(storageEvents)

  useEffect(() => {
    if (isOnline) getUser()
  }, [])

  useEffect(() => {
    if (userToken && isOnline) dispatch(getAllEvents([]))
  }, [userToken])

  return (
    <StyledEventsWrapper>
      {!isOnline && storageEvents && draftEvents.map((event: ManageEventType) => <SavedEventCard key={`${event.location}`} event={event} isDraft />)}
      {events && events.map((event: EventDataType) => <EventCard key={`${event.id}-${event.location}`} event={event} currentUser={userData} currentUserStatus={userStatus} />)}
    </StyledEventsWrapper>
  )
}

export default Home
