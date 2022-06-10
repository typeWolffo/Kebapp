import { SingleEventDataType } from './../types/EventType'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import Api from '../services/api'
import { setMessage } from './message'

const api = new Api()

const event: SingleEventDataType = {
  id: undefined,
  location: '',
  start_at: undefined,
  created_at: '',
  updated_at: '',
  author: undefined,
  members: undefined,
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
