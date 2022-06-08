import { createSlice } from '@reduxjs/toolkit'

const initialState = { isModalOpen: false }
const modalSlice = createSlice({
  initialState,
  name: 'modal',
  reducers: {
    openModal: () => {
      return { isModalOpen: true }
    },
    closeModal: () => {
      return { isModalOpen: false }
    },
  },
})

const { reducer, actions } = modalSlice

export const { openModal, closeModal } = actions
export default reducer
