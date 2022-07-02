import { X } from '@styled-icons/boxicons-regular'
import { useEffect, useState } from 'react'
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

import Map from '../../components/Map/Map'
import { useAppState } from '../../contexts/KebappContext'
import { createEvent, updateEvent } from '../../slices/event'
import { closeModal } from '../../slices/modal'
import { RootState } from '../../store/store'
import { EventDataType, ManageEventType } from '../../types/EventType'

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

  const { register, control, handleSubmit, setValue } = useForm<ManageEventType>()
  const { fields, append, remove } = useFieldArray({
    name: 'notes',
    control,
  })

  const onSubmit: SubmitHandler<EventDataType> = (data) => {
    const eventData = {
      location: data.location,
      start_at: data.start_at,
      notes: data.notes,
    }

    console.log(eventData)

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

  const handleAddNoteClick = () => {
    append({ value: '' })
    console.log(fields)
  }

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

          {fields &&
            fields.map((field, index) => (
              <div key={field.id} className="w-72 mt-4 flex h-14 justify-between items-center">
                <input
                  key={field.id}
                  {...register(`notes.${index}.value` as const, {
                    required: false,
                  })}
                  type="text"
                  placeholder="Note"
                  className="input input-bordered input-primary max-w-xs outline-none focus:outline-none active:outline-none h-14 text-lg text-primary"
                />
                <button className="btn btn-outline btn-error w-10 h-10 min-h-0 p-0" type="button" onClick={() => remove(index)}>
                  <X />
                </button>
              </div>
            ))}

          <button className="btn m-5 w-10/12" type="button" onClick={handleAddNoteClick}>
            Add note
          </button>

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
