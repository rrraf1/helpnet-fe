import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import API_URL from "../config/config";

const initialState = {
  user: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  // profilePicUrl: "",
};

export const LoginUser = createAsyncThunk(
  "auth/LoginUser",
  async (user, thunkAPI) => {
    try {
      const response = await axios.post(`${API_URL}auth/login`, user);
      localStorage.setItem("token", response.data.token);
      return response.data;
    } catch (error) {
      if (error.response) {
        return thunkAPI.rejectWithValue(error.response.data.error);
      }
    }
  }
);

export const checkLogin = createAsyncThunk(
  "user/check",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`${API_URL}auth/check`);
      return response.data;
    } catch (error) {
      if (error.response) {
        const message = error.response.data.error;
        return thunkAPI.rejectWithValue(message);
      }
    }
  }
);

export const logOut = createAsyncThunk("user/logOut", async (_, thunkAPI) => {
  localStorage.removeItem('token');
  const response = await axios.delete(`${API_URL}auth/logout`);
  return response.data;
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(LoginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(LoginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(LoginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(checkLogin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkLogin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload.username;
        // state.profilePicUrl = action.payload.profilePicUrl;
      })
      .addCase(checkLogin.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(logOut.fulfilled, (state) => {
        state.user = null;
        state.isError = false;
        state.isSuccess = false;
        state.isLoading = false;
        state.message = "";
      });
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
