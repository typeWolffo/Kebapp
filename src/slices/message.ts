import { createSlice } from '@reduxjs/toolkit'

const initialState = {}
const messageSlice = createSlice({
  initialState,
  name: 'message',
  reducers: {
    clearMessage: () => {
      return { message: '' }
    },
    setMessage: (state, action) => {
      return { message: action.payload }
    },
  },
})

const { reducer, actions } = messageSlice

export const { setMessage, clearMessage } = actions
export default reducer
