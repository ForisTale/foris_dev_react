import classes from "./Multiplier.module.css";
import {useSelector, useDispatch} from "react-redux";
import {tecSkillsActions} from "../../../store/tecSkills/tecSkills-slice";
import React from "react";
import {RootStateType} from "../../../store";


const Multiplier = () => {
  const multiplier = useSelector((state: RootStateType) => state.tecSkills.multiplier);
  const dispatch = useDispatch();

  const multiplierHandle = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(tecSkillsActions.setMultiplierValue(event.target.value));
  };

  return (
    <>
      <label>Multiplier: <input
        className={classes.multiplier}
        id={"multiplier"}
        type={"number"}
        step={"0.1"}
        value={multiplier}
        onChange={multiplierHandle}
      /></label>
    </>
  );
};

export default Multiplier;