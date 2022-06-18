import { getAllEvents } from './getAllEvents'
/* eslint-disable camelcase */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { setMessage } from './message'
import Api from '../services/api'

const api = new Api()

const event = { location: '', start_at: new Date() }

const initialState = { event, isEventManaged: false }

export const createEvent = createAsyncThunk('event/add', async ({ location, start_at }: { location: string; start_at: Date }, thunkApi) => {
  const response = await api.createEvent({ location, start_at })
  thunkApi.dispatch(setMessage(response.data))
  thunkApi.dispatch(getAllEvents([]))
  return response.data
})

export const updateEvent = createAsyncThunk('event/update', async ({ id, location, start_at }: { id: string; location: string; start_at: Date }, thunkApi) => {
  const response = await api.updateEvent(Number(id), { location, start_at })
  thunkApi.dispatch(setMessage(response.data))
  thunkApi.dispatch(getAllEvents([]))
  return response.data
})

const eventSlice = createSlice({
  extraReducers: (builder) => {
    builder.addCase(createEvent.fulfilled, (state, action) => {
      state.isEventManaged = true
      state.event = action.payload
    })
    builder.addCase(createEvent.rejected, (state, action) => {
      state.isEventManaged = false
    })
    builder.addCase(updateEvent.fulfilled, (state, action) => {
      state.isEventManaged = true
      state.event = action.payload
    })
    builder.addCase(updateEvent.rejected, (state, action) => {
      state.isEventManaged = false
    })
  },
  initialState,
  name: 'event',
  reducers: {},
})
const { reducer } = eventSlice
export default reducer
