import {configureStore} from "@reduxjs/toolkit";
import importantMessagesSlice from "./importantMessages-slice";

const store = configureStore({
  reducer: {
    importantMessages: importantMessagesSlice.reducer,
  },
});

export default store;