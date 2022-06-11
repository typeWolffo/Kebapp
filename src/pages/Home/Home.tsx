import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllEvents } from '../../slices/getAllEvents'
import { RootState } from '../../store/store'
import EventCard from '../../components/EventCard/EventCard'
import { EventDataType } from '../../types/EventType'
import useUser from '../../hooks/useUser'
import { StyledEventsWrapper } from './style'

function Home() {
  const dispatch = useDispatch()
  const { events } = useSelector((state: RootState) => state.getAllEvents)
  const { status: userStatus, mutate: getUser, data: userData } = useUser()

  useEffect(() => getUser(), [])

  useEffect(() => {
    dispatch(getAllEvents([]))
  }, [dispatch])

  return (
    <StyledEventsWrapper>
      {events && events.map((event: EventDataType) => <EventCard key={`${event.id}-${event.location}`} eventId={event.id as number} currentUser={userData} currentUserStatus={userStatus} />)}
    </StyledEventsWrapper>
  )
}

export default Home
