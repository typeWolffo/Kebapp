import { ChevronDown } from '@styled-icons/boxicons-regular/ChevronDown'
import isEmpty from 'lodash.isempty'
import { memo, useCallback, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { useJoinEvent } from '../../hooks/eventHooks'
import { FormModes, setFormMode } from '../../slices/form'
import { EventDataType } from '../../types/EventType'
import { UserType } from '../../types/UserType'
import { StyledButton, StyledContent, StyledEvent, StyledHeader, StyledIcon, StyledParticipant, StyledParticipantsWrapper } from './style'



type Props = {
  event: EventDataType
  currentUserStatus: string
  currentUser: UserType
}

const getKebsDate = (event: Date) => {
  const date = new Date(event)

  return {
    date: `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`,
    day: String(date.getDay()),
    hour: String(date.getHours()),
    minute: String(date.getMinutes()),
  }
}

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

const weekday = (date: Date) => days[new Date(date).getDay()]

const createLetterAvatar = (name: string) => {
  return <span className="transform -translate-y-[3%]">{name.charAt(0)}</span> // magic number for optical alignment
}

function EventCard(props: Props) {
  const { event, currentUser, currentUserStatus } = props
  const [isActive, setIsActive] = useState(false)
  const { mutate: joinToEvent } = useJoinEvent()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handelJoinClick = useCallback(() => joinToEvent(event.id as number), [event.id])
  const handleEditClick = () => {
    dispatch(setFormMode(FormModes.EDIT))
    navigate(`/${event.id}/edit`)
  }

  return (
    <StyledEvent>
      {event && currentUserStatus === 'success' && (
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
              <span className="mr-2">{`${getKebsDate(event.start_at as Date).date}`}</span>
              <span>{weekday(event.start_at as Date)}</span>
            </div>
            <StyledParticipantsWrapper>
              <StyledParticipant>{createLetterAvatar(event.author?.name as string)}</StyledParticipant>

              {!isEmpty(event.members) && event.members?.map((member: { user: UserType }) => <StyledParticipant key={member.user.id}>{createLetterAvatar(member.user.name)}</StyledParticipant>)}
            </StyledParticipantsWrapper>

            {event.author?.id !== currentUser.id && (
              <StyledButton type="button" onClick={handelJoinClick}>
                Join
              </StyledButton>
            )}
            {event.author?.id === currentUser.id && (
              <StyledButton type="button" onClick={handleEditClick}>
                Edit
              </StyledButton>
            )}
          </StyledContent>
        </>
      )}
    </StyledEvent>
  )
}

export default memo(EventCard)
