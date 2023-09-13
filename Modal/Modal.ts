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

export default class Modal {
  logger = new Logger(true);
  modal: HTMLElement | null = null;

  constructor() {
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
      .addEventListener("click", (event) => {
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
    // Styling variables

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

    createSegmentImage(signedCaptcha);
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
  Object.assign(innerWrapperDiv.style, innerWrapperDivStyle);

  const innerDiv = document.createElement("div");
  innerDiv.id = id("captcha");
  Object.assign(innerDiv.style, innerDivStyle, boxShadowBold);

  // Apply the Base64 image as the background of innerDiv
  innerDiv.style.backgroundImage = `url(${signedCaptcha.image})`;
  innerDiv.style.backgroundSize = "cover"; // To fit and cover the content
  innerDiv.style.backgroundPosition = "center"; // Center the background

  // Create an img element for the signedCaptcha.segment
  // const imgElement = document.createElement("img");
  // Object.assign(imgElement.style, segmentImageStyle, pointer);
  // imgElement.src = signedCaptcha.segment; // Set the src attribute to the image URL

  // innerDiv.appendChild(imgElement); // Append the img element to innerDiv
  innerWrapperDiv.appendChild(innerDiv);

  return innerWrapperDiv;
};

const createSegmentImage = (signedCaptcha: SignedCaptcha): void => {
  const captcha = document.getElementById(`${id("captcha")}`)!;
  if (captcha) {
    const width = captcha.offsetWidth;

    const img = new Image();
    img.src = signedCaptcha.image;
    const imgWidth = img.width;
    const scale = (width / imgWidth);

    const segmentImg = new Image();
    segmentImg.src = signedCaptcha.segment;
    const segmentImgWidth = segmentImg.width;
    const segmentScaledWidth = segmentImgWidth * scale;

    const segmentImgHeight = segmentImg.height;
    const segmentScaledHeight = segmentImgHeight * scale;


    // append child to captcha element
    const imgElement = document.createElement("img");
    Object.assign(imgElement.style, segmentImageStyle, pointer);
    imgElement.id = id("segmentImage");
    imgElement.src = signedCaptcha.segment; // Set the src attribute to the image URL
    imgElement.style.width = `${segmentScaledWidth}px`;
    imgElement.style.height = `${segmentScaledHeight}px`;

    captcha.appendChild(imgElement); // Append the img element to innerDiv
  }
};

const control = (): HTMLElement => {
  const changeColor = document.createElement("button");
  changeColor.id = id("changeColor");
  Object.assign(changeColor.style, closeButtonStyle, pointer);
  changeColor.textContent = "Change Color";

  return changeColor;
};
