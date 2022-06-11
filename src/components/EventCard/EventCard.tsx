import isEmpty from 'lodash.isempty'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import tw from 'tailwind-styled-components'
import useEvent from '../../hooks/useEvent'
import { UserType } from '../../types/UserType'

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
  const { status, data, error, isFetching } = useEvent(eventId)
  console.log({ data, error, status })

  return (
    <StyledEvent onClick={() => setIsActive(!isActive)}>
      <StyledHeader>
        {data.location} {eventId}
      </StyledHeader>
      <StyledContent $isActive={isActive}>
        <div>{`${getKebsDate(data.start_at as string).hour}:${getKebsDate(data.start_at as string).minute.padStart(2, '0')}`}</div>
        <div>{!isEmpty(data.members) && data.members.map((member: { user: UserType }) => <div key={member.user.id}>a</div>)}</div>
      </StyledContent>
    </StyledEvent>
  )
}

export default EventCard
