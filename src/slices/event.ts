/* eslint-disable camelcase */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { setMessage } from "./message";
import Api from "../services/api";

const token = localStorage.getItem("token");

const api = new Api({ token });

const event = { location: null, start_at: null };

export const createEvent = createAsyncThunk("event/add", async ({ location, start_at }, thunkApi) => {
  try {
    const response = await api.createEvent({ location, start_at });
    thunkApi.dispatch(setMessage(response.data.message));
    return response.data;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    thunkApi.dispatch(setMessage(message));
    return thunkApi.rejectWithValue(undefined);
  }
});

const initialState = { event, isEventCreated: false };
const eventSlice = createSlice({
  extraReducers: {
    [createEvent.fulfilled]: (state, action) => {
      state.isEventCreated = true;
      state.event = action.payload;
    },
    [createEvent.rejected]: (state, action) => {
      state.isEventCreated = false;
    },
  },
  initialState,
  name: "event",
  reducers: {},
});
const { reducer } = eventSlice;
export default reducer;
