import { SignedCaptcha } from "../../../types";
import { id } from "../../../utils";
import * as styles from "../styling";

export const CaptchaBody = (signedCaptcha: SignedCaptcha): HTMLElement => {
  const innerWrapperDiv = document.createElement("div");
  innerWrapperDiv.id = id("captcha-wrapper");
  Object.assign(innerWrapperDiv.style, styles.innerWrapperDivStyle);

  const innerDiv = document.createElement("div");
  innerDiv.id = id("captcha-inner");
  Object.assign(innerDiv.style, styles.innerDivStyle, styles.boxShadowBold);

  innerDiv.style.backgroundImage = `url(${signedCaptcha.image})`;
  innerDiv.style.backgroundSize = "cover"; // To fit and cover the content
  innerDiv.style.backgroundPosition = "center"; // Center the background

  innerWrapperDiv.appendChild(innerDiv);

  return innerWrapperDiv;
};
