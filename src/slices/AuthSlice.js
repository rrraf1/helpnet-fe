import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import API_URL from "../config/config";
import { getConfig } from "@testing-library/react";

const initialState = {
  user: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const LoginUser = createAsyncThunk(
  "user/login",
  async (user, thunkAPI) => {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, {
        email_kantor: user.email_kantor,
        password: user.password,
      });

      const { token, data } = response.data;
      localStorage.setItem("token", token);

      thunkAPI.dispatch(getConfig());
      return data;
    } catch (error) {
      const message = error.response.data.error;
      throw new error();
    }
  }
);

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        builder.addCase(LoginUser.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(LoginUser.fulfilled, (state, action) => {
            state.isLoading = false
            state.isError = false
        })
    }
})
