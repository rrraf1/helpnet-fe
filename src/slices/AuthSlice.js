import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import API_URL from "../config/config";

const initialState = {
  user: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const LoginUser = createAsyncThunk(
  "auth/LoginUser",
  async (user, thunkAPI) => {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, user);
      localStorage.setItem("token", response.data.token);
      return response.data;
    } catch (error) {
      if (error.response) {
        return thunkAPI.rejectWithValue(error.response.data.error);
      }
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(LoginUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(LoginUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.user = action.payload;
    });
    builder.addCase(LoginUser.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
