import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import Api from '../services/api'
import { setMessage } from './message'

const api = new Api()
const initialState = { events: [], isLoading: false }

export const getAllEvents = createAsyncThunk('allEvents/get', async (events: [], thunkApi) => {
  const response = await api.getAllEvents()
  thunkApi.dispatch(setMessage(response.data.message))
  return response.data
})

const getAllEventsSlice = createSlice({
  extraReducers: (builder) => {
    builder.addCase(getAllEvents.pending, (state, action) => {
      state.isLoading = true
    })
    builder.addCase(getAllEvents.fulfilled, (state, action) => {
      state.isLoading = false
      state.events = action.payload.data.events
    })
  },
  initialState,
  name: 'allEvents',
  reducers: {},
})
const { reducer } = getAllEventsSlice
export default reducer
