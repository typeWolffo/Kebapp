/* eslint-disable camelcase */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { setMessage } from './message'
import Api from '../services/api'

const api = new Api()

const event = { location: null, start_at: null }

const initialState = { event, isEventCreated: false }

export const createEvent = createAsyncThunk('event/add', async ({ location, start_at }: { location: string; start_at: string }, thunkApi) => {
  const response = await api.createEvent({ location, start_at })
  thunkApi.dispatch(setMessage(response.data.message))
  return response.data
})

const eventSlice = createSlice({
  extraReducers: (builder) => {
    builder.addCase(createEvent.fulfilled, (state, action) => {
      state.isEventCreated = true
      state.event = action.payload
    })
    builder.addCase(createEvent.rejected, (state, action) => {
      state.isEventCreated = false
    })
  },
  initialState,
  name: 'event',
  reducers: {},
})
const { reducer } = eventSlice
export default reducer
