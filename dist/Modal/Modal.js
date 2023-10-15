"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = __importDefault(require("events"));
const Logger_1 = __importDefault(require("../Logger/Logger"));
const styles = __importStar(require("./styling"));
const img_1 = require("./media/img");
const handler_1 = require("./handler");
const utils_1 = require("../utils");
class Modal extends events_1.default {
    constructor() {
        super();
        this.logger = new Logger_1.default(true);
        this.modal = null;
        this.emitter = this.emit.bind(this);
        // ==========================
        this.instructionContainer = () => {
            const instructionContainerDiv = document.createElement("div");
            Object.assign(instructionContainerDiv.style, styles.flexCenter, styles.padding5, styles.actionContainerStyle);
            const instruction = document.createElement("div");
            instruction.textContent = "Drag the image to the correct position";
            Object.assign(instruction.style, styles.brandNameSecondLine, styles.flexCenter);
            instructionContainerDiv.appendChild(instruction);
            return instructionContainerDiv;
        };
        this.headingContainer = () => {
            const headingContainerDiv = document.createElement("div");
            Object.assign(headingContainerDiv.style, styles.flexCenter, styles.padding5, styles.actionContainerStyle);
            const heading = document.createElement("div");
            heading.textContent = "Solve the captcha to execute the transaction";
            Object.assign(heading.style, styles.brandNameSecondLine, styles.flexCenter);
            headingContainerDiv.appendChild(heading);
            return headingContainerDiv;
        };
        this.brandContainer = () => {
            // Create header with brand logo and name
            const brandContainerDiv = document.createElement("div");
            Object.assign(brandContainerDiv.style, styles.flexCenter, styles.padding5, styles.flexStart);
            const brandName = document.createElement("div");
            Object.assign(brandName.style, styles.brandNameWrapper, styles.pointer);
            const brandText = document.createElement("div");
            brandText.id = (0, utils_1.id)("brandName");
            brandText.textContent = "Solve3.org";
            Object.assign(brandText.style, styles.brandNameSecondLine);
            brandName.appendChild(brandText);
            brandContainerDiv.appendChild(brandName);
            return brandContainerDiv;
        };
        this.modalBody = (signedCaptcha) => {
            const innerWrapperDiv = document.createElement("div");
            innerWrapperDiv.id = (0, utils_1.id)("captcha-wrapper");
            Object.assign(innerWrapperDiv.style, styles.innerWrapperDivStyle);
            const innerDiv = document.createElement("div");
            innerDiv.id = (0, utils_1.id)("captcha-inner");
            Object.assign(innerDiv.style, styles.innerDivStyle, styles.boxShadowBold);
            innerDiv.style.backgroundImage = `url(${signedCaptcha.image})`;
            innerDiv.style.backgroundSize = "cover"; // To fit and cover the content
            innerDiv.style.backgroundPosition = "center"; // Center the background
            innerWrapperDiv.appendChild(innerDiv);
            return innerWrapperDiv;
        };
        this.handleSegmentImage = (emitter, signedCaptcha) => {
            const captcha = document.getElementById(`${(0, utils_1.id)("captcha-inner")}`);
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
                        const imgElement = this.createImageElement(segmentScaledWidth, segmentScaledHeight, signedCaptcha.segment);
                        captcha.appendChild(imgElement); // Append the img element to innerDiv
                        // Make the imgElement draggable
                        imgElement.draggable = true;
                        // Set up drag-and-drop events
                        (0, handler_1.setupDragAndDrop)(emitter, scale, imgElement, captcha);
                    };
                };
            }
        };
        this.createImageElement = (width, height, src) => {
            const imgElement = document.createElement("img");
            Object.assign(imgElement.style, styles.segmentImageStyle, styles.pointer);
            imgElement.id = (0, utils_1.id)("segmentImage");
            imgElement.src = src;
            imgElement.style.width = `${width}px`;
            imgElement.style.height = `${height}px`;
            return imgElement;
        };
        this.menu = () => {
            const squareContainer = document.createElement("div");
            Object.assign(squareContainer.style, styles.squareContainer);
            const square1 = document.createElement("div");
            Object.assign(square1.style, styles.square, styles.flexCenter, styles.fontLight, styles.pointer);
            square1.id = (0, utils_1.id)("onRefresh");
            square1.innerHTML = img_1.refreshSvg;
            const square2 = document.createElement("div");
            Object.assign(square2.style, styles.square, styles.flexCenter, styles.fontLight, styles.pointer);
            square2.id = (0, utils_1.id)("onClose");
            square2.innerHTML = img_1.closeSvg;
            const square3 = document.createElement("div");
            Object.assign(square3.style, styles.square, styles.flexCenter, styles.fontLight, styles.pointer);
            square3.id = (0, utils_1.id)("onLink");
            square3.innerHTML = img_1.linkSvg;
            squareContainer.appendChild(square1);
            squareContainer.appendChild(square2);
            squareContainer.appendChild(square3);
            return squareContainer;
        };
        this.logo = () => {
            const logoContainer = document.createElement("div");
            Object.assign(logoContainer.style, styles.logo);
            const svgElement = new DOMParser()
                .parseFromString(img_1.logo, "image/svg+xml")
                .querySelector("svg");
            // create circle div
            const circle = document.createElement("div");
            Object.assign(circle.style, styles.circle, styles.flexCenter);
            if (svgElement) {
                // Apply a scale transformation to make it smaller
                svgElement.setAttribute("width", "28"); // Adjust the width as needed
                svgElement.setAttribute("height", "28"); // Adjust the height as needed
                // Create a filter element for the shadow effect
                const filter = document.createElementNS("http://www.w3.org/2000/svg", "filter");
                filter.setAttribute("id", "shadow-filter");
                // Create a feDropShadow element for the shadow effect
                const feDropShadow = document.createElementNS("http://www.w3.org/2000/svg", "feDropShadow");
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
        this.userOverview = (account, destination, chainId) => {
            const tableContainer = document.createElement("div");
            tableContainer.style.width = "100%";
            Object.assign(tableContainer.style, styles.flexCenter, styles.padding5, styles.actionContainerStyle);
            const table = document.createElement("table");
            table.style.minWidth = "70%";
            table.style.borderCollapse = "collapse"; // To remove spacing between table cells
            // add styling
            Object.assign(table.style, styles.brandNameSecondLine, styles.textAlignLeft, styles.fontLight);
            const rows = [
                { label: "Your account", value: account },
                { label: "Destination", value: destination },
                { label: "Chain id", value: chainId.toString() },
            ];
            rows.forEach((rowInfo, index) => {
                const row = document.createElement("tr");
                const labelCell = document.createElement("td");
                labelCell.textContent = rowInfo.label;
                labelCell.style.padding = "2px";
                const valueCell = document.createElement("td");
                const valueText = (0, utils_1.convertAddressToShortString)(rowInfo.value);
                valueCell.style.padding = "2px";
                if (valueText.includes("0x")) {
                    // Only add copy-to-clipboard functionality if value contains "0x"
                    const valueSpan = document.createElement("span");
                    // Create an SVG element (adjust attributes as needed)
                    const svgElement = new DOMParser()
                        .parseFromString(img_1.copy, "image/svg+xml")
                        .querySelector("svg");
                    svgElement.setAttribute("width", "10");
                    svgElement.setAttribute("height", "10");
                    Object.assign(svgElement.style, styles.pointer);
                    // add id
                    svgElement.id = (0, utils_1.id)("address-" + index);
                    svgElement.style.marginTop = "3px";
                    const textSpan = document.createElement("span");
                    textSpan.textContent = valueText;
                    textSpan.style.marginRight = "3px";
                    textSpan.style.cursor = "pointer";
                    valueSpan.appendChild(textSpan);
                    valueSpan.appendChild(svgElement);
                    valueCell.appendChild(valueSpan);
                }
                else {
                    // If value doesn't contain "0x", just display it without copy functionality
                    valueCell.textContent = valueText;
                }
                row.appendChild(labelCell);
                row.appendChild(valueCell);
                table.appendChild(row);
            });
            tableContainer.appendChild(table);
            return tableContainer;
        };
        this.handleEventListener = (account, destination) => {
            const square1 = document.getElementById(`${(0, utils_1.id)("onRefresh")}`);
            if (square1)
                square1.addEventListener("click", () => {
                    this.emitter("refresh");
                });
            const square2 = document.getElementById(`${(0, utils_1.id)("onClose")}`);
            if (square2)
                square2.addEventListener("click", () => {
                    this.close();
                });
            const square3 = document.getElementById(`${(0, utils_1.id)("onLink")}`);
            if (square3)
                square3.addEventListener("click", () => {
                    window.open("https://solve3.org", "_blank");
                });
            const brandName = document.getElementById(`${(0, utils_1.id)("brandName")}`);
            if (brandName)
                brandName.addEventListener("click", () => {
                    window.open("https://solve3.org", "_blank");
                });
            const address0 = document.getElementById(`${(0, utils_1.id)("address-0")}`);
            if (address0)
                address0.addEventListener("click", () => {
                    navigator.clipboard.writeText(account);
                });
            const address1 = document.getElementById(`${(0, utils_1.id)("address-1")}`);
            if (address1)
                address1.addEventListener("click", () => {
                    navigator.clipboard.writeText(destination);
                });
        };
        // inject html into the target page
        document.body.insertAdjacentHTML("beforeend", `<div id='${(0, utils_1.id)("module")}'></div>`);
        // get the modal element
        this.modal = document.getElementById(`${(0, utils_1.id)("module")}`);
    }
    // Method to close the modal
    close() {
        document.removeEventListener("click", this.closeIfOutsideModal.bind(this));
        if (this.modal) {
            this.emitter("close");
            this.modal.remove(); // Remove the modal from the DOM
            this.modal = null; // Reset the modal reference
        }
    }
    // Method to check if the click event occurred outside the modal
    closeIfOutsideModal(event) {
        if (this.modal &&
            event.target !== this.modal &&
            !this.modal.contains(event.target)) {
            // If the click is outside the modal, close it
            this.close();
        }
    }
    create(signedCaptcha, account, destination, chain) {
        // Close the previous modal if it exists
        this.close();
        document.addEventListener("click", this.closeIfOutsideModal.bind(this));
        // Create outer modal div
        const modalDiv = document.createElement("div");
        // modalDiv.appendChild(this.headingContainer());
        modalDiv.id = (0, utils_1.id)("outer");
        Object.assign(modalDiv.style, styles.centered, styles.outerDivStyle, styles.maxSize, styles.boxShadow);
        modalDiv.appendChild(this.modalBody(signedCaptcha));
        modalDiv.appendChild(this.instructionContainer());
        modalDiv.appendChild(this.userOverview(account, destination, chain));
        const hr = document.createElement("hr");
        Object.assign(hr.style, styles.w100, styles.opacity75);
        modalDiv.appendChild(hr);
        const rowContainer = document.createElement("div");
        Object.assign(rowContainer.style);
        rowContainer.style.display = "flex";
        rowContainer.style.flexDirection = "row";
        rowContainer.appendChild(this.brandContainer());
        // rowContainer.appendChild(this.logo());
        rowContainer.appendChild(this.menu());
        modalDiv.appendChild(rowContainer);
        // If the modal element is not found, create it
        if (!this.modal) {
            document.body.insertAdjacentHTML("beforeend", `<div id='${(0, utils_1.id)("module")}'></div>`);
            this.modal = document.getElementById(`${(0, utils_1.id)("module")}`);
        }
        // Set the modal content
        this.modal.innerHTML = modalDiv.outerHTML;
        this.handleSegmentImage(this.emitter, signedCaptcha);
        this.handleEventListener(account, destination);
    }
    sessionExpired() {
        // Create an outer modal div for the session expired screen
        const sessionExpiredDiv = document.createElement("div");
        Object.assign(sessionExpiredDiv.style, styles.sessionExpiredDivStyle, styles.centered, styles.maxSize, styles.boxShadow);
        // Create a close button
        const closeButton = document.createElement("button");
        closeButton.id = (0, utils_1.id)("close");
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
        this.modal.appendChild(sessionExpiredDiv);
    }
}
exports.default = Modal;
