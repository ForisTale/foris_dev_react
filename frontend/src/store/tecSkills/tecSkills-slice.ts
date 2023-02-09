import {createSlice} from "@reduxjs/toolkit";
import defaultSkillsForRace from "../../inventory/tec/defaultSkillsForRace";
import fillSkillsToDesiredLevel from "./fillSkillsToDesiredLevel";
import generateCommands from "./generateCommands";
import {SkillsType, RacesType} from "../../inventory/tec/defaultSkillsForRace";

export type TecStateType = {
  race: RacesType,
  skills: SkillsType,
  multiplier: string,
  desiredLevel: string,
  commands: string[],
};


const initialState: TecStateType = {
    race: "Nord",
    skills: defaultSkillsForRace("Nord"),
    multiplier: "1",
    desiredLevel: "",
    commands: [],
};

const tecSkillsSlice = createSlice({
  name: "tecSkills",
  initialState,
  reducers: {
    setRace: (state, action) => {
      state.race = action.payload;
      state.skills = defaultSkillsForRace(action.payload);
      state.commands = [];
    },
    setIsMultiplierActive: (state, action) => {
      const category = action.payload.category;
      const skillName = action.payload.skillName;
      state.skills[category][skillName].multiplier = !state.skills[category][skillName].multiplier;
    },
    setSkillDefaultValue: (state, action) => {
      const category = action.payload.category;
      const skillName = action.payload.skillName;
      state.skills[category][skillName].defaultSkillLevel = action.payload.value;
    },
    setSkillDesiredValue: (state, action) => {
      const category = action.payload.category;
      const skillName = action.payload.skillName;
      state.skills[category][skillName].desiredSkillLevel = action.payload.value;
    },
    setMultiplierValue: (state, action) => {
      state.multiplier = action.payload;
    },
    setDesiredLevel: (state, action) => {
      state.desiredLevel = action.payload;
    },
    fillSkillsToDesiredLevel,
    generateCommands: (state) => {
      state.commands = generateCommands(state.race, state.skills);
    },
    resetSkills: state => {
      state.skills = defaultSkillsForRace("Nord");
      state.commands = [];
    },
  },
});

export const tecSkillsActions = tecSkillsSlice.actions;

export default tecSkillsSlice;

