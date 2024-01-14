import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: { name: null, image: null, phoneNumber: null, accessToken: null },
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
  },
});

export const { updateUser } = userSlice.actions;

export default userSlice;
