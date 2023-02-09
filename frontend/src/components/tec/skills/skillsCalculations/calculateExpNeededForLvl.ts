const calculateExpNeededForLvl = (baseLevel: number, desiredLevel: number) => {
  const predicted_exp = 12.5 * (baseLevel ** 2) + 62.5 * baseLevel - 75
  const target_exp = 12.5 * (desiredLevel ** 2) + 62.5 * desiredLevel - 75
  return target_exp - predicted_exp
};

export default calculateExpNeededForLvl;