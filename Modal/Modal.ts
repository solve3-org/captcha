import EventEmitter from "events";
import Logger from "../Logger/Logger";
import { SignedCaptcha } from "../types";
import { changeInnerDivColor } from "./handler";
import {
  maxSize,
  centered,
  outerDivStyle,
  flexCenter,
  padding5,
  closeButtonStyle,
  innerDivStyle,
  boxShadow,
  brandNameWrapper,
  pointer,
  brandNameSecondLine,
  innerWrapperDivStyle,
  boxShadowBold,
  brandContainerStyle,
  segmentImageStyle,
} from "./styling";

// @ts-ignore

const id = (text: string): string => {
  return `s3-solve3-modal-${text}`;
};

export default class Modal extends EventEmitter {
  logger = new Logger(true);
  modal: HTMLElement | null = null;
  emitter = this.emit.bind(this);

  constructor() {
    super();
    // inject html into the target page
    document.body.insertAdjacentHTML(
      "beforeend",
      `<div id='${id("module")}'></div>`,
    );

    // get the modal element
    this.modal = document.getElementById(`${id("module")}`);

    // listen to events
    document
      .getElementById(`${id("module")}`)!
      .addEventListener("click", (event: any) => {
        event.stopImmediatePropagation();

        const target = event.target as HTMLElement;

        switch (target.id) {
          case id("changeColor"):
            changeInnerDivColor();
            break;
          case id("close"):
            // Call your close function here
            break;
          case id("brandName"):
            // window open bank solve3.org
            window.open("https://solve3.org", "_blank");
            break;
          // Add more cases as needed for other elements
          default:
            this.logger.debug("default");
            break;
        }
      });
  }

  public create(signedCaptcha: SignedCaptcha) {
    // Create outer modal div
    const modalDiv = document.createElement("div");
    Object.assign(modalDiv.style, centered, outerDivStyle, maxSize, boxShadow);

    // Append elements to modal div
    modalDiv.appendChild(modalBody(signedCaptcha));
    // modalDiv.appendChild(control());
    modalDiv.appendChild(brandContainer());

    if (!this.modal) {
      throw new Error("Modal element not found");
    }

    this.modal!.innerHTML = modalDiv.outerHTML;

    handleSegmentImage(this.emitter, signedCaptcha);
  }
}

// ==========================

const brandContainer = (): HTMLElement => {
  // Create header with brand logo and name
  const brandContainerDiv = document.createElement("div");
  Object.assign(
    brandContainerDiv.style,
    flexCenter,
    padding5,
    brandContainerStyle,
  );

  // const closeButton = document.createElement("button");
  // Object.assign(closeButton.style, closeButtonStyle, pointer);
  // closeButton.textContent = "X";

  // brandContainerDiv.appendChild(closeButton);

  // const brandLogo = document.createElement("img");
  // Object.assign(brandLogo.style, brandLogoSize);
  // brandLogo.src = logo;
  // brandLogo.alt = "Brand Logo";

  // brandContainerDiv.appendChild(brandLogo);

  const brandName = document.createElement("div");
  Object.assign(brandName.style, brandNameWrapper, pointer);

  // const firstLine = document.createElement("div");
  // firstLine.textContent = "Contract Protection";
  // Object.assign(firstLine.style, brandNameFirstLine);

  // brandName.appendChild(firstLine);

  const secondLine = document.createElement("div");
  secondLine.id = id("brandName");
  secondLine.textContent = "Solve3.org";
  Object.assign(secondLine.style, brandNameSecondLine);

  brandName.appendChild(secondLine);

  brandContainerDiv.appendChild(brandName);

  return brandContainerDiv;
};

const modalBody = (signedCaptcha: SignedCaptcha): HTMLElement => {
  const innerWrapperDiv = document.createElement("div");
  innerWrapperDiv.id = id("captcha-wrapper");
  Object.assign(innerWrapperDiv.style, innerWrapperDivStyle);

  const innerDiv = document.createElement("div");
  innerDiv.id = id("captcha-inner");
  Object.assign(innerDiv.style, innerDivStyle, boxShadowBold);

  // Apply the Base64 image as the background of innerDiv
  innerDiv.style.backgroundImage = `url(${signedCaptcha.image})`;
  innerDiv.style.backgroundSize = "cover"; // To fit and cover the content
  innerDiv.style.backgroundPosition = "center"; // Center the background

  // Create an img element for the signedCaptcha.segment
  // const imgElement = document.createElement("img");
  // Object.assign(imgElement.style, segmentImageStyle, pointer);
  // imgElement.src = signedCaptcha.segment; // Set the src attribute to the image URL
  // imgElement.draggable = true;

  // innerDiv.appendChild(imgElement); // Append the img element to innerDiv
  innerWrapperDiv.appendChild(innerDiv);

  return innerWrapperDiv;
};

const handleSegmentImage = (
  emitter: any,
  signedCaptcha: SignedCaptcha,
): void => {
  const captcha = document.getElementById(`${id("captcha-inner")}`);
  let scale = 100;
  if (captcha) {
    const width = captcha.offsetWidth;

    const img = new Image();
    img.src = signedCaptcha.image;
    img.onload = () => {
      const imgWidth = img.width;
      scale = (width / imgWidth) * 100;

      const segmentImg = new Image();
      segmentImg.src = signedCaptcha.segment;
      segmentImg.onload = () => {
        const segmentImgWidth = segmentImg.width;
        const segmentScaledWidth = (segmentImgWidth * scale) / 100;

        const segmentImgHeight = segmentImg.height;
        const segmentScaledHeight = (segmentImgHeight * scale) / 100;

        const imgElement = createImageElement(
          segmentScaledWidth,
          segmentScaledHeight,
          signedCaptcha.segment,
        );
        captcha.appendChild(imgElement); // Append the img element to innerDiv

        // Make the imgElement draggable
        imgElement.draggable = true;

        // Set up drag-and-drop events
        setupDragAndDrop(emitter, scale, imgElement, captcha);
      };
    };
  }
};

const createImageElement = (
  width: number,
  height: number,
  src: string,
): HTMLImageElement => {
  const imgElement = document.createElement("img");
  Object.assign(imgElement.style, segmentImageStyle, pointer);
  imgElement.id = id("segmentImage");
  imgElement.src = src;
  imgElement.style.width = `${width}px`;
  imgElement.style.height = `${height}px`;

  return imgElement;
};

const setupDragAndDrop = (
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

const control = (): HTMLElement => {
  const changeColor = document.createElement("button");
  changeColor.id = id("changeColor");
  Object.assign(changeColor.style, closeButtonStyle, pointer);
  changeColor.textContent = "Change Color";

  return changeColor;
};
