import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { getAllEvents } from '../../slices/getAllEvents'
import { RootState } from '../../store/store'
import EventCard from '../../components/EventCard/EventCard'
import { EventDataType } from '../../types/EventType'

const StyledEventsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 50px 0;
  width: 100%;
  height: 100%;
`

function Home() {
  const dispatch = useDispatch()
  const { events } = useSelector((state: RootState) => state.getAllEvents)

  useEffect(() => {
    dispatch(getAllEvents([]))
  }, [dispatch])

  return <StyledEventsWrapper>{events && events.map((event: EventDataType) => <EventCard key={`${event.id}-${event.location}`} eventId={event.id as number} />)}</StyledEventsWrapper>
}

export default Home
