import { useEffect } from 'react'
import SavedEventCard from '../../components/EventCard/SavedEventCard'
import { useAllEvents } from '../../hooks/eventHooks'
import EventCard from '../../components/EventCard/EventCard'
import { EventDataType, ManageEventType } from '../../types/EventType'
import useUser from '../../hooks/useUser'
import { StyledEventsWrapper } from './style'
import { useAppState } from '../../contexts/KebappContext'

function Home() {
  const { status: userStatus, mutate: getUser, data: userData } = useUser()
  const { isOnline } = useAppState()
  const storageEvents = localStorage.getItem('savedEvents')
  const { data: events } = useAllEvents()

  console.log(events)

  const draftEvents = storageEvents && JSON.parse(storageEvents)

  useEffect(() => {
    if (isOnline) getUser()
  }, [])

  return (
    <StyledEventsWrapper>
      {!isOnline && storageEvents && draftEvents.map((event: ManageEventType) => <SavedEventCard key={`${event.location}`} event={event} isDraft />)}
      {events && events.map((event: EventDataType) => <EventCard key={`${event.id}-${event.location}`} event={event} currentUser={userData} currentUserStatus={userStatus} />)}
    </StyledEventsWrapper>
  )
}

export default Home
