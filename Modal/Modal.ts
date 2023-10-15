import EventEmitter from "events";
import Logger from "../Logger/Logger";
import { SignedCaptcha } from "../types";
import { changeInnerDivColor } from "./handler";
import * as styles from "./styling";

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

    // // listen to events
    // document
    //   .getElementById(`${id("module")}`)!
    //   .addEventListener("click", (event: any) => {
    //     event.stopImmediatePropagation();

    //     const target = event.target as HTMLElement;

    //     switch (target.id) {
    //       case id("changeColor"):
    //         changeInnerDivColor();
    //         break;
    //       case id("close"):
    //         // Call your close function here
    //         break;
    //       case id("brandName"):
    //         // window open bank solve3.org
    //         window.open("https://solve3.org", "_blank");
    //         break;
    //       // Add more cases as needed for other elements
    //       default:
    //         this.logger.debug("default");
    //         break;
    //     }
    //   });
  }

  // Method to close the modal
  public close() {
    document.removeEventListener("click", this.closeIfOutsideModal.bind(this));

    if (this.modal) {
      this.emitter("close");
      this.modal.remove(); // Remove the modal from the DOM
      this.modal = null; // Reset the modal reference
    }
  }

  // Method to check if the click event occurred outside the modal
  private closeIfOutsideModal(event: MouseEvent) {
    if (
      this.modal &&
      event.target !== this.modal &&
      !this.modal.contains(event.target as Node)
    ) {
      // If the click is outside the modal, close it
      this.close();
    }
  }

  public create(signedCaptcha: SignedCaptcha) {
    // Close the previous modal if it exists
    this.close();

    document.addEventListener("click", this.closeIfOutsideModal.bind(this));

    // Create outer modal div
    const modalDiv = document.createElement("div");
    modalDiv.id = id("outer");
    Object.assign(
      modalDiv.style,
      styles.centered,
      styles.outerDivStyle,
      styles.maxSize,
      styles.boxShadow,
    );

    // Append elements to modal div
    modalDiv.appendChild(this.modalBody(signedCaptcha));
    modalDiv.appendChild(this.instructionContainer());
    modalDiv.appendChild(this.brandContainer());
    modalDiv.appendChild(this.menu());

    // If the modal element is not found, create it
    if (!this.modal) {
      document.body.insertAdjacentHTML(
        "beforeend",
        `<div id='${id("module")}'></div>`,
      );
      this.modal = document.getElementById(`${id("module")}`);
    }

    // Set the modal content
    this.modal!.innerHTML = modalDiv.outerHTML;

    this.handleSegmentImage(this.emitter, signedCaptcha);
  }

  public sessionExpired() {
    // Create an outer modal div for the session expired screen
    const sessionExpiredDiv = document.createElement("div");
    Object.assign(
      sessionExpiredDiv.style,
      styles.sessionExpiredDivStyle,
      styles.centered,
      styles.maxSize,
      styles.boxShadow,
    );

    // Create a close button
    const closeButton = document.createElement("button");
    closeButton.id = id("close");
    Object.assign(closeButton.style, styles.closeButtonStyle, styles.pointer);
    closeButton.textContent = "x";
    closeButton.style.marginTop = "10px";

    // Attach a click event to close the session expired screen
    closeButton.addEventListener("click", () => {
      this.close(); // Close the modal
      sessionExpiredDiv.remove(); // Remove the session expired div
    });

    // Create a message to inform the user about the expired session
    const message = document.createElement("div");
    message.textContent =
      "Your session has expired. Please close this modal and sign a new message.";

    // Append the message and the close button to the session expired div
    sessionExpiredDiv.appendChild(message);
    sessionExpiredDiv.appendChild(closeButton);

    // Set the session expired content
    this.modal!.appendChild(sessionExpiredDiv);
  }

  // ==========================

  instructionContainer = (): HTMLElement => {
    const instructionContainerDiv = document.createElement("div");
    Object.assign(
      instructionContainerDiv.style,
      styles.flexCenter,
      styles.padding5,
      styles.actionContainerStyle,
    );

    const instruction = document.createElement("div");
    instruction.textContent = "Drag the image to the correct position";
    Object.assign(
      instruction.style,
      styles.brandNameFirstLine,
      styles.fontDark,
      styles.flexCenter,
    );

    instructionContainerDiv.appendChild(instruction);

    return instructionContainerDiv;
  };

  brandContainer = (): HTMLElement => {
    // Create header with brand logo and name
    const brandContainerDiv = document.createElement("div");
    Object.assign(
      brandContainerDiv.style,
      styles.flexCenter,
      styles.padding5,
      styles.actionContainerStyle,
    );

    // const closeButton = document.createElement("button");
    // Object.assign(closeButton.style, closeButtonStyle, pointer);
    // closeButton.textContent = "X";

    // brandContainerDiv.appendChild(closeButton);

    const brandName = document.createElement("div");
    Object.assign(brandName.style, styles.brandNameWrapper, styles.pointer);

    // const firstLine = document.createElement("div");
    // firstLine.textContent = "Contract Protection";
    // Object.assign(firstLine.style, brandNameFirstLine);

    // brandName.appendChild(firstLine);

    const secondLine = document.createElement("div");
    secondLine.id = id("brandName");
    secondLine.textContent = "Solve3.org";
    Object.assign(secondLine.style, styles.brandNameSecondLine);

    brandName.appendChild(secondLine);

    brandContainerDiv.appendChild(brandName);

    return brandContainerDiv;
  };

  modalBody = (signedCaptcha: SignedCaptcha): HTMLElement => {
    const innerWrapperDiv = document.createElement("div");
    innerWrapperDiv.id = id("captcha-wrapper");
    Object.assign(innerWrapperDiv.style, styles.innerWrapperDivStyle);

    const innerDiv = document.createElement("div");
    innerDiv.id = id("captcha-inner");
    Object.assign(innerDiv.style, styles.innerDivStyle, styles.boxShadowBold);

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

  handleSegmentImage = (emitter: any, signedCaptcha: SignedCaptcha): void => {
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

          const imgElement = this.createImageElement(
            segmentScaledWidth,
            segmentScaledHeight,
            signedCaptcha.segment,
          );
          captcha.appendChild(imgElement); // Append the img element to innerDiv

          // Make the imgElement draggable
          imgElement.draggable = true;

          // Set up drag-and-drop events
          this.setupDragAndDrop(emitter, scale, imgElement, captcha);
        };
      };
    }
  };

  createImageElement = (
    width: number,
    height: number,
    src: string,
  ): HTMLImageElement => {
    const imgElement = document.createElement("img");
    Object.assign(imgElement.style, styles.segmentImageStyle, styles.pointer);
    imgElement.id = id("segmentImage");
    imgElement.src = src;
    imgElement.style.width = `${width}px`;
    imgElement.style.height = `${height}px`;

    return imgElement;
  };

  setupDragAndDrop = (
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

  menu = (): HTMLElement => {
    const refreshSvg = `<svg height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M10 11H7.101l.001-.009a4.956 4.956 0 0 1 .752-1.787 5.054 5.054 0 0 1 2.2-1.811c.302-.128.617-.226.938-.291a5.078 5.078 0 0 1 2.018 0 4.978 4.978 0 0 1 2.525 1.361l1.416-1.412a7.036 7.036 0 0 0-2.224-1.501 6.921 6.921 0 0 0-1.315-.408 7.079 7.079 0 0 0-2.819 0 6.94 6.94 0 0 0-1.316.409 7.04 7.04 0 0 0-3.08 2.534 6.978 6.978 0 0 0-1.054 2.505c-.028.135-.043.273-.063.41H2l4 4 4-4zm4 2h2.899l-.001.008a4.976 4.976 0 0 1-2.103 3.138 4.943 4.943 0 0 1-1.787.752 5.073 5.073 0 0 1-2.017 0 4.956 4.956 0 0 1-1.787-.752 5.072 5.072 0 0 1-.74-.61L7.05 16.95a7.032 7.032 0 0 0 2.225 1.5c.424.18.867.317 1.315.408a7.07 7.07 0 0 0 2.818 0 7.031 7.031 0 0 0 4.395-2.945 6.974 6.974 0 0 0 1.053-2.503c.027-.135.043-.273.063-.41H22l-4-4-4 4z"/></svg>`;
    const closeSvg = `<svg height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="m16.192 6.344-4.243 4.242-4.242-4.242-1.414 1.414L10.535 12l-4.242 4.242 1.414 1.414 4.242-4.242 4.243 4.242 1.414-1.414L13.364 12l4.242-4.242z"/></svg>`;
    const linkSvg = `<svg height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M18 6h2v12h-2zM4 13h8.586l-4.293 4.293 1.414 1.414L16.414 12 9.707 5.293 8.293 6.707 12.586 11H4z"/></svg>`;
    const squareContainer = document.createElement("div");
    Object.assign(squareContainer.style, styles.squareContainer);

    const square1 = document.createElement("div");
    Object.assign(
      square1.style,
      styles.square,
      styles.flexCenter,
      styles.fontDark,
      styles.pointer,
    );
    square1.id = id("onRefresh");
    square1.innerHTML = refreshSvg;
    // square1.addEventListener("click", onRefreshHandler);

    const square2 = document.createElement("div");
    Object.assign(
      square2.style,
      styles.square,
      styles.flexCenter,
      styles.fontDark,
      styles.pointer,
    );
    square2.id = id("onClose");
    square2.innerHTML = closeSvg;
    square2.addEventListener("click", () => {
      console.log("==> close");
      this.close(); // Close the modal
    });

    const square3 = document.createElement("div");
    Object.assign(
      square3.style,
      styles.square,
      styles.flexCenter,
      styles.fontDark,
      styles.pointer,
    );
    square3.id = id("onLink");
    square3.innerHTML = linkSvg;
    // square3.addEventListener("click", onLinkHandler);

    squareContainer.appendChild(square1);
    squareContainer.appendChild(square2);
    squareContainer.appendChild(square3);

    return squareContainer;
  };
}
