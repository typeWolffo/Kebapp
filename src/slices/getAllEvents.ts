import { createSlice } from '@reduxjs/toolkit'

const initialState = { events: [] }

const getAllEventsSlice = createSlice({
  initialState,
  name: 'allEvents',
  reducers: {
    setEvents: (state, action) => {
      return { events: action.payload }
    },
  },
})
const { reducer, actions } = getAllEventsSlice
export const { setEvents } = actions

export default reducer
