import {configureStore} from "@reduxjs/toolkit";
import importantMessagesSlice from "./importantMessages-slice";
import tecSkillsSlice from "./tecSkills/tecSkills-slice";

const store = configureStore({
  reducer: {
    importantMessages: importantMessagesSlice.reducer,
    tecSkills: tecSkillsSlice.reducer,
  },
});

export default store;