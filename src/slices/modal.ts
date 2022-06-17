import { createSlice } from '@reduxjs/toolkit'

const initialState: { isModalOpen: boolean; modalData: string | null } = { isModalOpen: false, modalData: null }
const modalSlice = createSlice({
  initialState,
  name: 'modal',
  reducers: {
    openModalWith: (state, action) => {
      return { isModalOpen: true, modalData: action.payload }
    },
    closeModal: () => {
      return { isModalOpen: false, modalData: '' }
    },
  },
})

const { reducer, actions } = modalSlice

export const { openModalWith, closeModal } = actions
export default reducer
