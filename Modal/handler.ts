import { id } from "../utils";

export const setupDragAndDrop = (
  emitter: any,
  scalingFactor: number,
  imgElement: HTMLImageElement,
  captcha: HTMLElement,
) => {
  const captchaInner = document.getElementById(`${id("captcha-inner")}`);

  let initialX = 0;
  let initialY = 0;

  let offsetX = 0;
  let offsetY = 0;

  let isDragging = false;

  const disableScrolling = () => {
    document.body.style.overflow = "hidden";
  };

  const enableScrolling = () => {
    document.body.style.overflow = "auto";
  };

  const startDrag = (event: any) => {
    if (event.touches) {
      // For touch devices
      initialX =
        event.touches[0].clientX - imgElement.getBoundingClientRect().left;
      initialY =
        event.touches[0].clientY - imgElement.getBoundingClientRect().top;
    } else {
      // For mouse events
      initialX = event.clientX - imgElement.getBoundingClientRect().left;
      initialY = event.clientY - imgElement.getBoundingClientRect().top;
      event.preventDefault(); // Prevent default drag and drop behavior
    }
    isDragging = true;
    disableScrolling();
  };

  const doDrag = (event: any) => {
    if (isDragging) {
      if (event.touches) {
        // For touch devices
        offsetX =
          event.touches[0].clientX -
          initialX -
          captcha.getBoundingClientRect().left;
        offsetY =
          event.touches[0].clientY -
          initialY -
          captcha.getBoundingClientRect().top;
      } else {
        // For mouse events
        offsetX =
          event.clientX - initialX - captcha.getBoundingClientRect().left;
        offsetY =
          event.clientY - initialY - captcha.getBoundingClientRect().top;
      }

      // Ensure the image stays within the boundaries of the captchaInner div
      const maxX = captchaInner!.offsetWidth - imgElement.width;
      const maxY = captchaInner!.offsetHeight - imgElement.height;

      offsetX = Math.min(maxX, Math.max(0, offsetX));
      offsetY = Math.min(maxY, Math.max(0, offsetY));

      imgElement.style.left = `${offsetX}px`;
      imgElement.style.top = `${offsetY}px`;
    }
  };

  const endDrag = () => {
    if (isDragging) {
      imgElement.style.left = `${offsetX}px`;
      imgElement.style.top = `${offsetY}px`;
      isDragging = false;

      if (captchaInner) {
        const imgRect = imgElement.getBoundingClientRect();
        const captchaRect = captchaInner.getBoundingClientRect();

        const leftDistance = imgRect.left - captchaRect.left;
        const topDistance = imgRect.top - captchaRect.top;

        const posX = (leftDistance * 100) / scalingFactor;
        const posY = (topDistance * 100) / scalingFactor;

        emitter("dragend", { posX, posY });
      }

      enableScrolling();
    }
  };

  // Add event listeners for both touch and mouse events
  imgElement.addEventListener("mousedown", startDrag);
  imgElement.addEventListener("touchstart", startDrag);

  document.addEventListener("mousemove", doDrag);
  document.addEventListener("touchmove", doDrag);

  document.addEventListener("mouseup", endDrag);
  document.addEventListener("touchend", endDrag);
};
