import isEmpty from 'lodash.isempty'
import { memo, useCallback, useState } from 'react'
import { useEvent, useJoinEvent } from '../../hooks/eventHooks'
import { UserType } from '../../types/UserType'
import { ChevronDown } from '@styled-icons/boxicons-regular/ChevronDown'
import { StyledButton, StyledContent, StyledEvent, StyledHeader, StyledIcon, StyledParticipant, StyledParticipantsWrapper } from './style'

type Props = {
  eventId: number
  currentUserStatus: string
  currentUser: UserType
}

const getKebsDate = (event: string) => {
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

const createLetterAvatar = (name: string) => {
  return name.charAt(0)
}

function EventCard(props: Props) {
  const { eventId, currentUser, currentUserStatus } = props
  const [isActive, setIsActive] = useState(false)
  const { data: eventData, isFetching } = useEvent(eventId)
  const { mutate: joinToEvent } = useJoinEvent()

  const handelJoinClick = useCallback(() => joinToEvent(eventId), [])

  return (
    <StyledEvent>
      {!isFetching && currentUserStatus === 'success' && (
        <>
          <StyledHeader onClick={() => setIsActive(!isActive)}>
            {eventData.location}
            <StyledIcon>
              <ChevronDown className={isActive ? 'tranfororm  rotate-180' : ''} />
            </StyledIcon>
          </StyledHeader>

          <StyledContent $isActive={isActive}>
            <div className="py-5">
              <span className="mr-2">{`${getKebsDate(eventData.start_at as string).hour}:${getKebsDate(eventData.start_at as string).minute.padStart(2, '0')}`}</span>
              <span>{weekday(eventData.start_at)}</span>
            </div>
            <StyledParticipantsWrapper>
              <StyledParticipant>{createLetterAvatar(eventData.author.name)}</StyledParticipant>

              {!isEmpty(eventData.members) && eventData.members.map((member: { user: UserType }) => <StyledParticipant key={member.user.id}>{createLetterAvatar(member.user.name)}</StyledParticipant>)}
            </StyledParticipantsWrapper>

            {eventData.author.id !== currentUser.id && (
              <StyledButton type="button" onClick={handelJoinClick}>
                Join
              </StyledButton>
            )}
          </StyledContent>
        </>
      )}
    </StyledEvent>
  )
}

export default memo(EventCard)
