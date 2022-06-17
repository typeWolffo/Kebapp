import { useEffect } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { createEvent } from '../../slices/event'
import { EventDataType } from '../../types/EventType'
import Map from '../../components/Map/Map'
import { closeModal } from '../../slices/modal'

function CreateEvent() {
  const { register, handleSubmit, setValue } = useForm<EventDataType>()
  const dispatch = useDispatch()

  const onSubmit: SubmitHandler<EventDataType> = (data) => {
    const eventData = {
      location: data.location,
      start_at: data.start_at,
    }
    dispatch(createEvent(eventData))
    dispatch(closeModal())
  }

  const locationFromMap = window.sessionStorage.getItem('kebabName')

  useEffect(() => {
    if (locationFromMap) {
      setValue('location', locationFromMap)
    }
  }, [locationFromMap])

  return (
    <>
      <div className="flex flex-col items-center justify-center w-full h-full">
        <form onSubmit={handleSubmit(onSubmit)} className="w-9/12 flex justify-center flex-col">
          <input
            {...register('location')}
            type="text"
            placeholder="Location"
            className="input input-bordered input-primary w-full max-w-xs outline-none focus:outline-none active:outline-none mb-4 h-14 text-lg text-primary"
          />
          <input {...register('start_at')} type="datetime-local" placeholder="Date" className="input input-bordered input-primary w-full max-w-xs h-14 text-lg text-primary" />
          <button type="submit" className="btn m-5">
            Create
          </button>
        </form>
        <div className="divider px-12">OR</div>
        <div>
          <Map />
        </div>
      </div>
    </>
  )
}

export default CreateEvent
