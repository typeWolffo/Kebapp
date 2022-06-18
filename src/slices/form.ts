import { createSlice } from '@reduxjs/toolkit'

export enum FormModes {
  'EDIT' = 'edit',
  'CREATE' = 'create',
  'SAVE' = 'save',
}

type FormMode = {
  formMode: FormModes | string
}

const formModeData = {
  formMode: FormModes.SAVE,
}

const initialState: { formModeData: FormMode } = { formModeData }

const formSlice = createSlice({
  initialState,
  name: 'form',
  reducers: {
    setFormMode: (state, action) => {
      return { formModeData: action.payload }
    },
  },
})

const { reducer, actions } = formSlice

export const { setFormMode } = actions
export default reducer
