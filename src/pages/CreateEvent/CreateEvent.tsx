import { useEffect } from 'react'
import styled from 'styled-components'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import Modal from '../../components/Modal/Modal'
import { createEvent } from '../../slices/event'
import { EventDataType } from '../../types/EventType'

const CreateWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  justify-content: center;
  align-items: center;

  form {
    display: flex;
    flex-direction: column;
    max-width: 400px;
    width: 80%;

    input {
      height: 45px;
      margin: 10px 0;
      padding: 0 10px;
      border-radius: 5px;
      border-color: ${({ theme }) => theme.accentColor};
      background-color: transparent;
      color: ${({ theme }) => theme.fontColor};
      outline: none;
      border-style: solid;
    }
    input[type='datetime-local']::-webkit-calendar-picker-indicator {
      display: none !important;
    }

    button {
      background-color: ${({ theme }) => theme.primaryColor};
      border: 1px solid ${({ theme }) => theme.accentColor};
      border-radius: 5px;
      color: ${({ theme }) => theme.fontColor};
      width: 200px;
      height: 45px;
      align-self: center;
    }
  }
`

function CreateEvent() {
  const { register, handleSubmit, setValue } = useForm<EventDataType>()
  const dispatch = useDispatch()

  const onSubmit: SubmitHandler<EventDataType> = (data) => {
    const eventData = {
      location: data.location,
      start_at: new Date(String(data.startAt)).toISOString(),
    }
    dispatch(createEvent(eventData))
  }

  const locationFromMap = window.sessionStorage.getItem('kebabName')

  useEffect(() => {
    if (locationFromMap) {
      setValue('location', locationFromMap)
    }
  }, [locationFromMap])

  return (
    <CreateWrapper>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="text" {...register('location')} list="kebsOptions" placeholder="Jaka miejscuwa wariacie" />
        <datalist id="kebsOptions">
          <option value="Nazar">Nazar</option>
          <option value="Diamond">Diamond</option>
          <option value="Diamond Bielsko">Diamond Bielsko</option>
        </datalist>
        <input type="datetime-local" {...register('startAt')} />
        <button type="submit">Gituwa</button>
      </form>
      <Modal />
    </CreateWrapper>
  )
}

export default CreateEvent
