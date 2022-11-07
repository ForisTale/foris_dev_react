import {createSlice} from "@reduxjs/toolkit";

const importantMessagesSlice = createSlice({
  name: "importantMessages",
  initialState: [],
  reducers: {
    append: (state, messages) => {
      if(Array.isArray(messages.payload)) {
        for (const message of messages.payload) {
          state.push(message)
        }
      } else {
        state.push(messages.payload);
      }
    },
    clear: () => {
      return [];
    },
  }
});

export const importantMessagesActions = importantMessagesSlice.actions;

export default importantMessagesSlice;