import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { userMockData } from "../../utils/loginMock";

export const generateAccessToken = createAsyncThunk(
  "user/generateAccessToken",
  async function generateAccessToken(unProtectedCall, data) {
    const tokens = await unProtectedCall("/auth/login", data, "post");
    return { tokens };
  }
);

export const loginDataFetch = createAsyncThunk(
  "login/loginDataFetch",
  async function loginDataFetch({ protectedCall, useMock }) {
    const userData = useMock
      ? await userMockData
      : await protectedCall("/auth/profile");
    return { userData };
  }
);

const initialState = {
  userData: {},
  loggedUser: {},
  accessToken: null,
  refreshToken: null,
  status: "idle", // Could be 'idle', 'loading', 'succeeded', 'failed'
  error: null,
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    addLogindetails(state, action) {
      state.loggedUser = action.payload;
    },
    deleteDetails(state) {
      state.loggedUser = {};
    },
  },
  extraReducers: (builder) => {
    builder.addCase(generateAccessToken.fulfilled, (state, action) => {
      state.accessToken = action.payload.tokens.access_token;
      state.refreshToken = action.payload.tokens.refresh_token;
      state.status = "idle";
    });
    builder.addCase(generateAccessToken.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(generateAccessToken.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
    builder.addCase(loginDataFetch.fulfilled, (state, action) => {
      state.userData = action.payload.userData;
      state.status = "idle";
    });
    builder.addCase(loginDataFetch.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(loginDataFetch.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
  },
});

// Selectors

export const selectLoginStatus = (state) => state.login.status;
export const selectLoginError = (state) => state.login.error;

export const { addLogindetails, deleteDetails } = loginSlice.actions;
export const selectUserData = (state) => state.login.userData;
export const selectLoggedUser = (state) => state.login.loggedUser;

export default loginSlice.reducer;
