import removeValidDrops from "./removeValidDrops";
import resetSelectedPiece from "./resetSelectedPiece";
import changePlayerTurn from "./changePlayerTurn";

const resetSettings = (): any => {
  removeValidDrops();
  resetSelectedPiece();
  changePlayerTurn();
};

export default resetSettings();