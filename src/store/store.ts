import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../slices/auth'
import messageReducer from '../slices/message'
import eventReducer from '../slices/event'
import modalReducer from '../slices/modal'
import formReducer from '../slices/form'
import getAllEventsReducer from '../slices/getAllEvents'
import { useDispatch } from 'react-redux'

const reducer = {
  auth: authReducer,
  event: eventReducer,
  getAllEvents: getAllEventsReducer,
  message: messageReducer,
  modal: modalReducer,
  form: formReducer,
}

export const store = configureStore({
  devTools: true,
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredPaths: ['event.event.start_at'],
      },
    }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
