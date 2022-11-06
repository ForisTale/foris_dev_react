import {createSlice} from "@reduxjs/toolkit";

const importantMessagesSlice = createSlice({
  name: "importantMessages",
  initialState: [],
  reducers: {
    append(state, message) {
      state.push(message.payload);
    },
    clear(state) {
      state = [];
    },
  }
});

export const importantMessagesActions = importantMessagesSlice.actions;

export default importantMessagesSlice;