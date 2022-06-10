import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { getAllEvents } from '../../slices/getAllEvents'
import { RootState } from '../../store/store'
import EventCard from '../../components/EventCard/EventCard'

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
  const { isLoggedIn } = useSelector((state: RootState) => state.auth)

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(getAllEvents([]))
    }
  }, [dispatch])

  return (
    <StyledEventsWrapper>
      {events &&
        events.map(({ id }) => (
          <EventCard key={id} eventId={id} />
          // <StyledEvent key={createdAt}>
          //   <StyledEventDetails>
          //     <span>{location}</span>
          //     <span>{`${weekdays[getKebsDate(startAt).day as unknown as keyof Weekdays]} (${getKebsDate(startAt).date})`}</span>
          //     <span>{`${getKebsDate(startAt).hour}:${getKebsDate(startAt).minute.padStart(2, '0')}`}</span>
          //   </StyledEventDetails>
          //   <StyledApprove>
          //     <span>ok</span>
          //   </StyledApprove>
          // </StyledEvent>
        ))}
    </StyledEventsWrapper>
  )
}

export default Home
