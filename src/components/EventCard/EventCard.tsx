import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import tw from 'tailwind-styled-components'
import { getSingleEvent } from '../../slices/getSingleEvent'
import { RootState } from '../../store/store'
import { EventDataType, SingleEventDataType } from '../../types/EventType'

type Props = {
  eventId: number
}

const StyledEvent = tw.div`
    w-9/12
    p-5
    border border-solid border-secondary 
    rounded-md mb-5
`
const StyledHeader = tw.div`
    text-xl
`

const StyledContent = tw.div`
    ${({ $isActive }: { $isActive: boolean }) => ($isActive ? 'h-fit' : 'h-0')}
    overflow-hidden
`

const getKebsDate = (event: string) => {
  const date = new Date(event)

  return {
    date: `${date.getDate()}.${date.getMonth()}.${date.getFullYear()}`,
    day: String(date.getDay()),
    hour: String(date.getHours()),
    minute: String(date.getMinutes()),
  }
}

function EventCard(props: Props) {
  const { eventId } = props
  const [isActive, setIsActive] = useState(false)
  const dispatch = useDispatch()
  const singleEvent = useSelector((state: RootState) => state.getSingleEvent)

  const { event, isLoading } = singleEvent

  useEffect(() => {
    dispatch(getSingleEvent(eventId))
  }, [dispatch])

  return (
    <StyledEvent onClick={() => setIsActive(!isActive)}>
      <StyledHeader>{event.location}</StyledHeader>
      <StyledContent $isActive={isActive}>
        <div>{`${getKebsDate(event.start_at as string).hour}:${getKebsDate(event.start_at as string).minute.padStart(2, '0')}`}</div>
      </StyledContent>
    </StyledEvent>
  )
}

export default EventCard
