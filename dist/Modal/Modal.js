"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = __importDefault(require("events"));
const Logger_1 = __importDefault(require("../Logger/Logger"));
const handler_1 = require("./handler");
const styling_1 = require("./styling");
// @ts-ignore
const id = (text) => {
    return `s3-solve3-modal-${text}`;
};
class Modal extends events_1.default {
    constructor() {
        super();
        this.logger = new Logger_1.default(true);
        this.modal = null;
        this.emitter = this.emit.bind(this);
        // inject html into the target page
        document.body.insertAdjacentHTML("beforeend", `<div id='${id("module")}'></div>`);
        // get the modal element
        this.modal = document.getElementById(`${id("module")}`);
        // listen to events
        document
            .getElementById(`${id("module")}`)
            .addEventListener("click", (event) => {
            event.stopImmediatePropagation();
            const target = event.target;
            switch (target.id) {
                case id("changeColor"):
                    (0, handler_1.changeInnerDivColor)();
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
    create(signedCaptcha) {
        // Create outer modal div
        const modalDiv = document.createElement("div");
        Object.assign(modalDiv.style, styling_1.centered, styling_1.outerDivStyle, styling_1.maxSize, styling_1.boxShadow);
        // Append elements to modal div
        modalDiv.appendChild(modalBody(signedCaptcha));
        // modalDiv.appendChild(control());
        modalDiv.appendChild(brandContainer());
        if (!this.modal) {
            throw new Error("Modal element not found");
        }
        this.modal.innerHTML = modalDiv.outerHTML;
        handleSegmentImage(this.emitter, signedCaptcha);
    }
}
exports.default = Modal;
// ==========================
const brandContainer = () => {
    // Create header with brand logo and name
    const brandContainerDiv = document.createElement("div");
    Object.assign(brandContainerDiv.style, styling_1.flexCenter, styling_1.padding5, styling_1.brandContainerStyle);
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
    Object.assign(brandName.style, styling_1.brandNameWrapper, styling_1.pointer);
    // const firstLine = document.createElement("div");
    // firstLine.textContent = "Contract Protection";
    // Object.assign(firstLine.style, brandNameFirstLine);
    // brandName.appendChild(firstLine);
    const secondLine = document.createElement("div");
    secondLine.id = id("brandName");
    secondLine.textContent = "Solve3.org";
    Object.assign(secondLine.style, styling_1.brandNameSecondLine);
    brandName.appendChild(secondLine);
    brandContainerDiv.appendChild(brandName);
    return brandContainerDiv;
};
const modalBody = (signedCaptcha) => {
    const innerWrapperDiv = document.createElement("div");
    innerWrapperDiv.id = id("captcha-wrapper");
    Object.assign(innerWrapperDiv.style, styling_1.innerWrapperDivStyle);
    const innerDiv = document.createElement("div");
    innerDiv.id = id("captcha-inner");
    Object.assign(innerDiv.style, styling_1.innerDivStyle, styling_1.boxShadowBold);
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
const handleSegmentImage = (emitter, signedCaptcha) => {
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
                const imgElement = createImageElement(segmentScaledWidth, segmentScaledHeight, signedCaptcha.segment);
                captcha.appendChild(imgElement); // Append the img element to innerDiv
                // Make the imgElement draggable
                imgElement.draggable = true;
                // Set up drag-and-drop events
                setupDragAndDrop(emitter, scale, imgElement, captcha);
            };
        };
    }
};
const createImageElement = (width, height, src) => {
    const imgElement = document.createElement("img");
    Object.assign(imgElement.style, styling_1.segmentImageStyle, styling_1.pointer);
    imgElement.id = id("segmentImage");
    imgElement.src = src;
    imgElement.style.width = `${width}px`;
    imgElement.style.height = `${height}px`;
    return imgElement;
};
const setupDragAndDrop = (emitter, scalingFactor, imgElement, captcha) => {
    const captchaInner = document.getElementById(`${id("captcha-inner")}`);
    let initialX = 0;
    let initialY = 0;
    let previousX = 0;
    let previousY = 0;
    imgElement.addEventListener("dragstart", (event) => {
        if (event.dataTransfer) {
            initialX = event.clientX - imgElement.getBoundingClientRect().left;
            initialY = event.clientY - imgElement.getBoundingClientRect().top;
        }
    });
    let offsetX = 0;
    let offsetY = 0;
    imgElement.addEventListener("drag", (event) => {
        previousX = offsetX;
        previousY = offsetY;
        offsetX = event.clientX - initialX - captcha.getBoundingClientRect().left;
        offsetY = event.clientY - initialY - captcha.getBoundingClientRect().top;
        imgElement.style.left = `${offsetX}px`;
        imgElement.style.top = `${offsetY}px`;
    });
    imgElement.addEventListener("dragend", () => {
        imgElement.style.left = `${previousX}px`;
        imgElement.style.top = `${previousY}px`;
        if (captchaInner) {
            const imgRect = imgElement.getBoundingClientRect();
            const captchaRect = captchaInner.getBoundingClientRect();
            const leftDistance = imgRect.left - captchaRect.left;
            const topDistance = imgRect.top - captchaRect.top;
            const posX = (leftDistance * 100) / scalingFactor;
            const posY = (topDistance * 100) / scalingFactor;
            emitter("dragend", { posX, posY });
        }
    });
};
const control = () => {
    const changeColor = document.createElement("button");
    changeColor.id = id("changeColor");
    Object.assign(changeColor.style, styling_1.closeButtonStyle, styling_1.pointer);
    changeColor.textContent = "Change Color";
    return changeColor;
};
