import { ChevronDown } from '@styled-icons/boxicons-regular'
import { useState } from 'react'
import { ManageEventType } from '../../types/EventType'
import { StyledContent, StyledEvent, StyledHeader, StyledIcon } from './style'

type Props = {
  event: ManageEventType
  isDraft: boolean
}

const getKebsDate = (event: Date) => {
  const date = new Date(event)

  return {
    date: `${date.getDate()}.${date.getMonth()}.${date.getFullYear()}`,
    day: String(date.getDay()),
    hour: String(date.getHours()),
    minute: String(date.getMinutes()),
  }
}

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

const weekday = (date: Date) => days[new Date(date).getDay()]

function SavedEventCard(props: Props) {
  const { event, isDraft } = props
  const [isActive, setIsActive] = useState(false)

  return (
    <StyledEvent $isDraft={isDraft}>
      {event && (
        <>
          <StyledHeader onClick={() => setIsActive(!isActive)}>
            {event.location}
            <StyledIcon>
              <ChevronDown className={isActive ? 'tranfororm  rotate-180' : ''} />
            </StyledIcon>
          </StyledHeader>

          <StyledContent $isActive={isActive}>
            <div className="py-5">
              <span className="mr-2">{`${getKebsDate(event.start_at as Date).hour}:${getKebsDate(event.start_at as Date).minute.padStart(2, '0')}`}</span>
              <span>{weekday(event.start_at as Date)}</span>
            </div>
          </StyledContent>
        </>
      )}
    </StyledEvent>
  )
}

export default SavedEventCard
