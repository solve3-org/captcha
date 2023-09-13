"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Logger_1 = __importDefault(require("../Logger/Logger"));
const handler_1 = require("./handler");
const styling_1 = require("./styling");
const id = (text) => {
    return `s3-solve3-modal-${text}`;
};
class Modal {
    constructor() {
        this.logger = new Logger_1.default(true);
        this.modal = null;
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
    create() {
        // Styling variables
        // Create outer modal div
        const modalDiv = document.createElement("div");
        Object.assign(modalDiv.style, styling_1.centered, styling_1.outerDivStyle, styling_1.maxSize, styling_1.boxShadow);
        // Append elements to modal div
        modalDiv.appendChild(modalBody());
        modalDiv.appendChild(control());
        modalDiv.appendChild(brandContainer());
        if (!this.modal) {
            throw new Error("Modal element not found");
        }
        this.modal.innerHTML = modalDiv.outerHTML;
    }
}
exports.default = Modal;
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
const modalBody = () => {
    // const innerDiv = document.createElement("div");
    // innerDiv.className = "s3-solve3-module-inner";
    // Object.assign(innerDiv.style, innerDivStyle, boxShadow);
    // create wrapper div
    // create inner div
    const innerWrapperDiv = document.createElement("div");
    Object.assign(innerWrapperDiv.style, styling_1.innerWrapperDivStyle);
    const innerDiv = document.createElement("div");
    innerDiv.id = id("inner");
    Object.assign(innerDiv.style, styling_1.innerDivStyle, styling_1.boxShadowBold);
    innerWrapperDiv.appendChild(innerDiv);
    return innerWrapperDiv;
};
const control = () => {
    const changeColor = document.createElement("button");
    changeColor.id = id("changeColor");
    Object.assign(changeColor.style, styling_1.closeButtonStyle, styling_1.pointer);
    changeColor.textContent = "Change Color";
    return changeColor;
};
