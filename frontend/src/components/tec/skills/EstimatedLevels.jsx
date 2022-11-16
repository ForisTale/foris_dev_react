import calculateDefaultLevel from "./calculateDefaultLevel";
import {useSelector} from "react-redux";
import {useEffect, useState} from "react";

const EstimatedLevels = () => {
  const race = useSelector(state => state.tecSkills.race);
  const skills = useSelector(state => state.tecSkills.skills);
  const [baseLevel, setBaseLevel] = useState(1);

  useEffect(() => {
    setBaseLevel(calculateDefaultLevel(race, skills));
  }, [race, skills])


  return (
    <>
      <h6 id={"base_level"}>Base level: {baseLevel}</h6>
      <h6 id={"estimated_desired_level"}>Estimated desired level: 1</h6>
    </>
  );
};

export default EstimatedLevels;