import { id } from "../../../utils";
import * as styles from "../styling";

export const BrandContainer = (): HTMLElement => {
  const brandContainerDiv = document.createElement("div");
  Object.assign(
    brandContainerDiv.style,
    styles.flexCenter,
    styles.padding5,
    styles.flexStart,
  );

  const brandName = document.createElement("div");
  Object.assign(brandName.style, styles.brandNameWrapper, styles.pointer);

  const brandText = document.createElement("div");
  brandText.id = id("brandName");
  brandText.textContent = "Solve3.org";
  Object.assign(brandText.style, styles.brandNameSecondLine);

  brandName.appendChild(brandText);

  brandContainerDiv.appendChild(brandName);

  return brandContainerDiv;
};
