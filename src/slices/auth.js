import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AuthService from "../services/authService";
import { setMessage } from "./message";

const userToken = localStorage.getItem("token");
const auth = new AuthService();

export const register = createAsyncThunk("auth/register", async (userCredentials, thunkApi) => {
  try {
    const response = await auth.registerUser(userCredentials);
    thunkApi.dispatch(setMessage(response.data.message));
    return response.data;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    thunkApi.dispatch(setMessage(message));
    return thunkApi.rejectWithValue(undefined);
  }
});

export const login = createAsyncThunk("auth/login", async ({ email, password }, thunkApi) => {
  try {
    const data = await auth.loginUser({ email, password });
    return { user: data };
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    thunkApi.dispatch(setMessage(message));
    return thunkApi.rejectWithValue(undefined);
  }
});

const initialState = userToken ? { isLoggedIn: true, userToken } : { isLoggedIn: false, user: null };
const authSlice = createSlice({
  extraReducers: {
    [register.fulfilled]: (state, action) => {
      state.isLoggedIn = false;
    },
    [register.rejected]: (state, action) => {
      state.isLoggedIn = false;
    },
    [login.fulfilled]: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload.user;
    },
    [login.rejected]: (state, action) => {
      state.isLoggedIn = false;
      state.user = null;
    },
  },
  initialState,
  name: "auth",
});
const { reducer } = authSlice;
export default reducer;
