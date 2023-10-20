import * as styles from "../styling";

export const HeadingContainer = (): HTMLElement => {
  const headingContainerDiv = document.createElement("div");
  Object.assign(
    headingContainerDiv.style,
    styles.flexCenter,
    styles.padding5,
    styles.actionContainerStyle,
  );

  const heading = document.createElement("div");
  heading.textContent = "Solve the captcha to execute the transaction";
  Object.assign(heading.style, styles.brandNameSecondLine, styles.flexCenter);

  headingContainerDiv.appendChild(heading);

  return headingContainerDiv;
};
