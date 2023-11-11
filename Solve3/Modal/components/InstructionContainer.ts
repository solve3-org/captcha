import * as styles from "../styling";

export const InstructionContainer = (): HTMLElement => {
  const instructionContainerDiv = document.createElement("div");
  Object.assign(
    instructionContainerDiv.style,
    styles.flexCenter,
    styles.padding5,
    styles.actionContainerStyle,
  );

  const instruction = document.createElement("div");
  instruction.textContent = "Drag image to the correct position";
  Object.assign(
    instruction.style,
    styles.brandNameSecondLine,
    styles.flexCenter,
  );

  instructionContainerDiv.appendChild(instruction);

  return instructionContainerDiv;
};
