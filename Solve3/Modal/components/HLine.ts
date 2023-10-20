import * as styles from "../styling";

export const HLine = (): HTMLElement => {
  const hr = document.createElement("hr");
  Object.assign(hr.style, styles.w100, styles.opacity75);
  return hr;
};
