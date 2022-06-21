import { useEffect, useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { createEvent, updateEvent } from '../../slices/event'
import { EventDataType, ManageEventType } from '../../types/EventType'
import Map from '../../components/Map/Map'
import { closeModal } from '../../slices/modal'
import { RootState } from '../../store/store'
import { useNavigate, useParams } from 'react-router-dom'
import { useAppState } from '../../contexts/KebappContext'

function CreateEvent() {
  const { formModeData } = useSelector((state: RootState) => state.form)
  const { events } = useSelector((state: RootState) => state.getAllEvents)
  const [currentEvent, setCurrentEvent] = useState<EventDataType>({ location: '', start_at: new Date() })
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { id } = useParams()
  const { isOnline } = useAppState()

  useEffect(() => {
    if (id) {
      const event = events.filter((singleEventvent: ManageEventType) => singleEventvent.id === Number(id))
      setCurrentEvent(event[0])
    }
  }, [id])

  const { register, handleSubmit, setValue } = useForm<ManageEventType>()

  const onSubmit: SubmitHandler<EventDataType> = (data) => {
    const eventData = {
      location: data.location,
      start_at: data.start_at,
    }
    if (isOnline) {
      if (String(formModeData) === 'create') dispatch(createEvent(eventData))
      if (id && String(formModeData) === 'edit') dispatch(updateEvent({ id, ...eventData }))
    } else {
      if (String(formModeData) === 'create') {
        const storageEvents = localStorage.getItem('savedEvents')
        if (storageEvents) {
          const lastEvents = JSON.parse(storageEvents)
          const actualEvents = [...lastEvents, eventData]
          localStorage.setItem('savedEvents', JSON.stringify(actualEvents))
        } else {
          localStorage.setItem('savedEvents', JSON.stringify([eventData]))
        }
      }
      if (id && String(formModeData) === 'edit') dispatch(updateEvent({ id, ...eventData }))
    }
    dispatch(closeModal())
    navigate('/')
  }

  const locationFromMap = window.sessionStorage.getItem('kebabName')

  useEffect(() => {
    if (locationFromMap) setValue('location', locationFromMap)
    if (currentEvent.location) setValue('location', currentEvent.location)
  }, [locationFromMap, currentEvent.location])

  return (
    <>
      <div className="flex flex-col items-center justify-center w-full h-full">
        <form onSubmit={handleSubmit(onSubmit)} className="w-9/12 flex justify-center items-center flex-col">
          <input
            {...register('location')}
            type="text"
            placeholder="Location"
            className="input input-bordered input-primary w-72 max-w-xs outline-none focus:outline-none active:outline-none mb-4 h-14 text-lg text-primary"
          />
          <input {...register('start_at')} type="datetime-local" placeholder="Date" className="input input-bordered input-primary w-72 max-w-xs h-14 text-lg text-primary" />
          <button type="submit" className="btn m-5 w-10/12">
            {String(formModeData) === 'create' ? 'Create' : 'Save'}
          </button>
        </form>
        {isOnline && (
          <>
            <div className="divider px-12">OR</div>
            <div>
              <Map />
            </div>
          </>
        )}
      </div>
    </>
  )
}

export default CreateEvent
