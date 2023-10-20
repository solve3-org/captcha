import { id } from "../../../utils";
import * as styles from "../styling";
import { closeSvg, linkSvg, refreshSvg } from "../media/img";

export const Menu = (): HTMLElement => {
  const menuContainer = document.createElement("div");
  Object.assign(menuContainer.style, styles.menuContainer);

  const buttons = [
    {
      id: id("onRefresh"),
      svg: refreshSvg,
    },
    {
      id: id("onClose"),
      svg: closeSvg,
    },
    {
      id: id("onLink"),
      svg: linkSvg,
    },
  ];

  buttons.forEach((button) => {
    const btn = document.createElement("div");
    Object.assign(
      btn.style,
      styles.miniBtn,
      styles.flexCenter,
      styles.fontLight,
      styles.pointer,
    );
    btn.id = button.id;
    btn.innerHTML = button.svg;
    menuContainer.appendChild(btn);
  });

  return menuContainer;
};
