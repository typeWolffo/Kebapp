import { useEffect } from 'react'
import PropagateLoader from 'react-spinners/PropagateLoader'

import EventCard from '../../components/EventCard/EventCard'
import SavedEventCard from '../../components/EventCard/SavedEventCard'
import { useAppState } from '../../contexts/KebappContext'
import { useAllEvents } from '../../hooks/eventHooks'
import useUser from '../../hooks/useUser'
import { EventDataType, ManageEventType } from '../../types/EventType'
import { StyledEventsWrapper } from './style'

function Home() {
  const { status: userStatus, mutate: getUser, data: userData } = useUser()
  const { isOnline } = useAppState()
  const storageEvents = localStorage.getItem('savedEvents')
  const { data: events } = useAllEvents()

  const draftEvents = storageEvents && JSON.parse(storageEvents)

  useEffect(() => {
    if (isOnline) getUser()
  }, [])

  if (!events) {
    return (
      <div className="w-screen h-screen flex items-center justify-center">
        <PropagateLoader />
      </div>
    )
  }

  return (
    <StyledEventsWrapper>
      {!isOnline && storageEvents && draftEvents.map((event: ManageEventType) => <SavedEventCard key={`${event.location}`} event={event} isDraft />)}
      {events && events.map((event: EventDataType) => <EventCard key={`${event.id}-${event.location}`} event={event} currentUser={userData} currentUserStatus={userStatus} />)}
    </StyledEventsWrapper>
  )
}

export default Home
