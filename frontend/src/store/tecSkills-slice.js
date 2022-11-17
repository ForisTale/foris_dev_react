import {createSlice} from "@reduxjs/toolkit";
import baseSkillsForRace from "../inventory/tec/baseSkillsForRace";
import fillSkillsToDesiredLevel from "./fillSkillsToDesiredLevel";

const tecSkillsSlice = createSlice({
  name: "tecSkills",
  initialState: {
    race: "Nord",
    skills: baseSkillsForRace("Nord"),
    multiplier: "1",
    desiredLevel: "",
  },
  reducers: {
    setRace: (state, action) => {
      state.race = action.payload;
      state.skills = baseSkillsForRace(action.payload);
    },
    setIsMultiplierActive: (state, action) => {
      const category = action.payload.category;
      const skillName = action.payload.name;
      state.skills[category][skillName].multiplier = !state.skills[category][skillName].multiplier;
    },
    setSkillDefaultValue: (state, action) => {
      const category = action.payload.category;
      const skillName = action.payload.name;
      state.skills[category][skillName].default_value = action.payload.value;
    },
    setSkillDesiredValue: (state, action) => {
      const category = action.payload.category;
      const skillName = action.payload.name;
      state.skills[category][skillName].desired_value = action.payload.value;
    },
    setMultiplierValue: (state, action) => {
      state.multiplier = action.payload;
    },
    setDesiredLevel: (state, action) => {
      state.desiredLevel = action.payload;
    },
    fillSkillsToDesiredLevel,
  },
});

export const tecSkillsActions = tecSkillsSlice.actions;

export default tecSkillsSlice;

