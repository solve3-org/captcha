import { BrandContainer } from "./BrandContainer";
import { Menu } from "./Menu";

export const Footer = (): HTMLElement => {
  const footer = document.createElement("div");
  Object.assign(footer.style);

  footer.style.display = "flex";
  footer.style.flexDirection = "row";
  footer.appendChild(BrandContainer());
  // footer.appendChild(this.logo());
  footer.appendChild(Menu());

  return footer;
};
