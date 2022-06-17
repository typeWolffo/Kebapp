import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import Api from '../services/api'
import { EventDataType } from '../types/EventType'
import { setMessage } from './message'

const api = new Api()

const event: EventDataType = {
  id: 0,
  location: '',
  start_at: new Date(),
  created_at: '',
  updated_at: '',
  author: undefined,
  members: [{ id: 0, event_id: 0, user: { id: 0, name: '', email: '' } }],
  is_active: undefined,
  change_requests: undefined,
}

const initialState = { event, isLoading: false }

export const getSingleEvent = createAsyncThunk('singleEvent/get', async (id: number, thunkApi) => {
  const response = await api.getSingleEvent(id)
  thunkApi.dispatch(setMessage(response.data.message))
  return response.data
})

const getSingleEventSlice = createSlice({
  extraReducers: (builder) => {
    builder.addCase(getSingleEvent.pending, (state, action) => {
      state.isLoading = true
    })
    builder.addCase(getSingleEvent.fulfilled, (state, action) => {
      state.isLoading = false
      state.event = action.payload.data.event
    })
  },
  initialState,
  name: 'singleEvent',
  reducers: {},
})
const { reducer } = getSingleEventSlice
export default reducer
