/* eslint-disable camelcase */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AuthService from "../services/authService";
import { setMessage } from "./message";

const userToken = localStorage.getItem("token");
const auth = new AuthService();

export const registerUser = createAsyncThunk("auth/register", async ({ name, email, password, password_confirmation }, thunkApi) => {
  try {
    const response = await auth.registerUser({ email, name, password, password_confirmation });
    thunkApi.dispatch(setMessage(response.data.message));
    console.log(response.data);
    return response.data;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    thunkApi.dispatch(setMessage(message));
    return thunkApi.rejectWithValue(undefined);
  }
});

export const loginUser = createAsyncThunk("auth/login", async ({ email, password }, thunkApi) => {
  try {
    const data = await auth.loginUser({ email, password });
    return { user: data };
  } catch (error) {
    const message = error.response?.data?.message || error.message || error.toString();
    thunkApi.dispatch(setMessage(message));
    return thunkApi.rejectWithValue(undefined);
  }
});

const initialState = userToken ? { isLoggedIn: true, userToken } : { isLoggedIn: false, userToken: null };
const authSlice = createSlice({
  extraReducers: {
    [registerUser.fulfilled]: (state, action) => {
      state.isLoggedIn = false;
    },
    [registerUser.rejected]: (state, action) => {
      state.isLoggedIn = false;
    },
    [loginUser.fulfilled]: (state, action) => {
      state.isLoggedIn = true;
      state.userToken = action.payload;
    },
    [loginUser.rejected]: (state, action) => {
      state.isLoggedIn = false;
      state.userToken = null;
    },
  },
  initialState,
  name: "auth",
  reducers: {},
});
const { reducer } = authSlice;
export default reducer;
