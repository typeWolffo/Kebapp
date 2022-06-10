import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../slices/auth'
import messageReducer from '../slices/message'
import eventReducer from '../slices/event'
import modalReducer from '../slices/modal'
import getAllEventsReducer from '../slices/getAllEvents'
import getSingleEventReducer from '../slices/getSingleEvent'
import { useDispatch } from 'react-redux'

const reducer = {
  auth: authReducer,
  event: eventReducer,
  getAllEvents: getAllEventsReducer,
  getSingleEvent: getSingleEventReducer,
  message: messageReducer,
  modal: modalReducer,
}

export const store = configureStore({
  devTools: true,
  reducer,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
