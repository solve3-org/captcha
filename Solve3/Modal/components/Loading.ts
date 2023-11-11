import { id } from "../../../utils";
import * as styles from "../styling";

export const LoadingOverlay = (): HTMLElement => {
  const styleElement = document.createElement("style");
  // Define the keyframes animation
  styleElement.textContent = `
      @keyframes solve3LoadingExpandAndContract {
        0% {
          transform: scale(1);
        }
        50% {
          transform: scale(1.2);
        }
        100% {
          transform: scale(1);
        }
      }
    `;

  // Append the <style> element to the document's <head>
  document.head.appendChild(styleElement);
  // Create the loading overlay element
  const loadingOverlay = document.createElement("div");

  // set id
  loadingOverlay.id = id("loading-overlay");
  Object.assign(
    loadingOverlay.style,
    styles.loadingOverlay,
    styles.centered,
    styles.maxSize,
  );

  // get width and height of id("outer")
  const width = document.getElementById(`${id("outer")}`)?.offsetWidth;
  const height = document.getElementById(`${id("outer")}`)?.offsetHeight;

  // set width and height
  loadingOverlay.style.width = `${width}px`;
  loadingOverlay.style.height = `${height}px`;

  // Create and style three circles
  for (let i = 0; i < 3; i++) {
    const circle = document.createElement("div");
    Object.assign(circle.style, styles.loadingCircleStyle);

    loadingOverlay.appendChild(circle);
  }

  return loadingOverlay;
};
