import { createSlice } from '@reduxjs/toolkit'

type ModalData = {
  modalType: string | null
}

const modalData = {
  modalType: null,
}

const initialState: { isModalOpen: boolean; modalData: ModalData } = { isModalOpen: false, modalData }
const modalSlice = createSlice({
  initialState,
  name: 'modal',
  reducers: {
    openModalWith: (state, action) => {
      return { isModalOpen: true, modalData: action.payload }
    },
    closeModal: () => {
      return { isModalOpen: false, modalData }
    },
  },
})

const { reducer, actions } = modalSlice

export const { openModalWith, closeModal } = actions
export default reducer
