import {createSlice, PayloadAction} from "@reduxjs/toolkit";

type ImportantMessagesType = string[];

const initialState: ImportantMessagesType = [];

const importantMessagesSlice = createSlice({
  name: "importantMessages",
  initialState,
  reducers: {
    append: (state, messages:PayloadAction<string | string[]>) => {
      if(Array.isArray(messages.payload)) {
        for (const message of messages.payload) {
          state.push(message)
        }
      } else {
        state.push(messages.payload);
      }
    },
    clear: () => {
      return initialState;
    },
  }
});

export const importantMessagesActions = importantMessagesSlice.actions;

export default importantMessagesSlice;