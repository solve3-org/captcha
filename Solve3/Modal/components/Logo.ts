import { convertAddressToShortString, id } from "../../../utils";
import * as styles from "../styling";
import { logo } from "../media/img";

export const Logo = () => {
  const logoContainer = document.createElement("div");
  Object.assign(logoContainer.style, styles.logo);

  const svgElement = new DOMParser()
    .parseFromString(logo, "image/svg+xml")
    .querySelector("svg");

  // create circle div
  const circle = document.createElement("div");
  Object.assign(circle.style, styles.circle, styles.flexCenter);

  if (svgElement) {
    // Apply a scale transformation to make it smaller
    svgElement.setAttribute("width", "28"); // Adjust the width as needed
    svgElement.setAttribute("height", "28"); // Adjust the height as needed

    // Create a filter element for the shadow effect
    const filter = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "filter",
    );
    filter.setAttribute("id", "shadow-filter");

    // Create a feDropShadow element for the shadow effect
    const feDropShadow = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "feDropShadow",
    );
    // feDropShadow.setAttribute("stdDeviation", "1"); // Adjust the shadow strength as needed
    // dx="0" dy="0" stdDeviation="0.5" flood-color="cyan"
    feDropShadow.setAttribute("dx", "0");
    feDropShadow.setAttribute("dy", "0");
    feDropShadow.setAttribute("stdDeviation", "0.8");
    feDropShadow.setAttribute("flood-color", "#222");
    filter.appendChild(feDropShadow);

    filter.appendChild(feDropShadow);

    // Append the filter to the SVG element
    svgElement.appendChild(filter);

    // Apply the filter to the SVG element
    svgElement.style.filter = "url(#shadow-filter)";

    // Append the transformed and shadowed SVG to your container
    circle.appendChild(svgElement);
  }

  logoContainer.appendChild(circle);

  return logoContainer;
};
