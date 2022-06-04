/* eslint-disable camelcase */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { setMessage } from './message'
import AuthService from '../services/authService'
import { RegisterUserDataType } from '../types/RegisterUserDataType'
import { LoginUserDataType } from '../types/LoginUserDataType'

const userToken = localStorage.getItem('token')
const auth = new AuthService()

export const registerUser = createAsyncThunk('auth/register', async ({ name, email, password, password_confirmation }: RegisterUserDataType, thunkApi) => {
  const response = await auth.registerUser({
    email,
    name,
    password,
    password_confirmation,
  })
  thunkApi.dispatch(setMessage(response.data.message))
  return response.data
})

export const loginUser = createAsyncThunk('auth/login', async ({ email, password }: LoginUserDataType, thunkApi) => {
  const data = await auth.loginUser({ email, password })
  return { user: data }
})

const initialState = userToken ? { isLoggedIn: true, userToken } : { isLoggedIn: false, userToken: null }
const authSlice = createSlice({
  extraReducers: (builder) => {
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.isLoggedIn = false
    })

    builder.addCase(registerUser.rejected, (state, action) => {
      state.isLoggedIn = false
    })

    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.isLoggedIn = true
      state.userToken = action.payload.user
    })

    builder.addCase(loginUser.rejected, (state, action) => {
      state.isLoggedIn = false
      state.userToken = null
    })
  },
  initialState,
  name: 'auth',
  reducers: {},
})
const { reducer } = authSlice
export default reducer
