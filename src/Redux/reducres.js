import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: {
    name: null,
    image: null,
    phoneNumber: null,
    accessToken: null,
    contacts: null,
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUser: (state, action) => {
      state.data = {
        ...state.data,
        ...action.payload,
      };
    },

    logoutUser: (state, action) => {
      state.data = {
        name: null,
        image: null,
        phoneNumber: null,
        accessToken: null,
        contacts: null,
      };
    },
  },
});

export const { updateUser, logoutUser } = userSlice.actions;

export default userSlice;
