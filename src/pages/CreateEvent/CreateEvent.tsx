import { useEffect } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import Modal from '../../components/Modal/Modal'
import { createEvent } from '../../slices/event'
import { openModal } from '../../slices/modal'
import { RootState } from '../../store/store'
import { EventDataType } from '../../types/EventType'

function CreateEvent() {
  const { register, handleSubmit, setValue } = useForm<EventDataType>()
  const dispatch = useDispatch()
  const { isModalOpen } = useSelector((state: RootState) => state.modal)

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
    <>
      <div className="flex flex-col items-center justify-center w-screen h-screen">
        <form onSubmit={handleSubmit(onSubmit)} className="w-9/12 flex justify-center flex-col">
          <input
            {...register('location')}
            type="text"
            placeholder="Location"
            className="input input-bordered input-secondary w-full max-w-xs outline-none focus:outline-none active:outline-none mb-4 h-14 text-lg text-secondary"
          />
          <input {...register('startAt')} type="datetime-local" placeholder="Date" className="input input-bordered input-secondary w-full max-w-xs h-14 text-lg text-secondary" />
          <button type="submit" className="btn m-5">
            Create
          </button>
        </form>
        <div className="divider px-12">OR</div>
        <button type="button" className="btn px-4 py-1" onClick={() => dispatch(openModal())}>
          Choose from map
        </button>
      </div>
      <Modal isOpen={isModalOpen} />
    </>
    // <CreateWrapper>
    //   <form onSubmit={handleSubmit(onSubmit)}>
    //     {/*<input type="text" {...register('location')} list="kebsOptions" placeholder="Jaka miejscuwa wariacie" />*/}
    //     <label className="relative block p-3 border-2 border-gray-200 rounded-lg" htmlFor="name">
    //       <input className="w-full px-0 pt-3.5 pb-0 text-sm placeholder-transparent border-none focus:ring-0 peer" id="name" type="text" placeholder="Name" />
    //       <span className="absolute text-xs font-medium text-gray-500 transition-all left-3 peer-focus:text-xs peer-focus:top-3 peer-focus:translate-y-0 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-sm">
    //         Name
    //       </span>
    //     </label>
    //     <datalist id="kebsOptions">
    //       <option value="Nazar">Nazar</option>
    //       <option value="Diamond">Diamond</option>
    //       <option value="Diamond Bielsko">Diamond Bielsko</option>
    //     </datalist>
    //     <input type="datetime-local" {...register('startAt')} />
    //     <button type="submit">Gituwa</button>
    //   </form>
    // </CreateWrapper>
  )
}

export default CreateEvent
