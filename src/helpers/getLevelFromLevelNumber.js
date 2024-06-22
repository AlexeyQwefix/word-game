import level1 from "../data/levels/1.json";
import level2 from "../data/levels/2.json";
import level3 from "../data/levels/3.json";

const getLevelFromLevelNumber = (levelNumber) => {
  let res = null;
  const realLevelNumber = levelNumber % 3;

  switch (realLevelNumber) {
    case 1:
      res = level1;
      break;
    case 2:
      res = level2;
      break;
    default:
      res = level3;
      break;
  }
  return res;
};

export default getLevelFromLevelNumber;
