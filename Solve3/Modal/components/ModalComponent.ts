import { id } from "../../../utils";
import { CaptchaBody } from "./CaptchaBody";
import { Footer } from "./Footer";
import { HLine } from "./HLine";
import { InstructionContainer } from "./InstructionContainer";
import { UserOverview } from "./UserOverview";
import * as styles from "../styling";
import { SignedCaptcha } from "../../../types";

export const ModalComponent = (
  signedCaptcha: SignedCaptcha,
  account: string,
  destination: string,
  chain: number,
): HTMLElement => {
  const modalDiv = document.createElement("div");
  modalDiv.id = id("outer");
  Object.assign(
    modalDiv.style,
    styles.centered,
    styles.outerDivStyle,
    styles.maxSize,
    styles.boxShadow,
  );

  modalDiv.appendChild(CaptchaBody(signedCaptcha));
  modalDiv.appendChild(InstructionContainer());
  modalDiv.appendChild(UserOverview(account, destination, chain));
  modalDiv.appendChild(HLine());
  modalDiv.appendChild(Footer());

  return modalDiv;
};
