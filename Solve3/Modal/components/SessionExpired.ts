import { id } from "../../../utils";
import * as styles from "../styling";

export const SessionExpired = (that: any): HTMLElement => {
  const sessionExpiredDiv = document.createElement("div");
  Object.assign(
    sessionExpiredDiv.style,
    styles.sessionExpiredDivStyle,
    styles.centered,
    styles.maxSize,
    styles.boxShadow,
  );

  // get width and height of id("outer")
  const width = document.getElementById(`${id("outer")}`)?.offsetWidth;
  const height = document.getElementById(`${id("outer")}`)?.offsetHeight;

  // set width and height
  sessionExpiredDiv.style.width = `${width}px`;
  sessionExpiredDiv.style.height = `${height}px`;

  // Create a close button
  const closeButton = document.createElement("button");
  closeButton.id = id("close");
  Object.assign(closeButton.style, styles.closeButtonStyle, styles.pointer);
  closeButton.textContent = "x";
  closeButton.style.marginTop = "10px";

  // Attach a click event to close the session expired screen
  closeButton.addEventListener("click", () => {
    that.close(); // Close the modal
    sessionExpiredDiv.remove(); // Remove the session expired div
  });

  // Create a message to inform the user about the expired session
  const message = document.createElement("div");
  message.textContent =
    "Your session has expired. Please close this modal and sign a new message.";

  // Append the message and the close button to the session expired div
  sessionExpiredDiv.appendChild(message);
  sessionExpiredDiv.appendChild(closeButton);

  return sessionExpiredDiv;
};
