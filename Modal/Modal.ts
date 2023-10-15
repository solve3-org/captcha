import EventEmitter from "events";
import Logger from "../Logger/Logger";
import { SignedCaptcha } from "../types";
import * as styles from "./styling";
import { closeSvg, copy, linkSvg, logo, refreshSvg } from "./media/img";
import { setupDragAndDrop } from "./handler";
import { convertAddressToShortString, id } from "../utils";

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

  public create(
    signedCaptcha: SignedCaptcha,
    account: string,
    destination: string,
    chain: number,
  ) {
    // Close the previous modal if it exists
    this.close();

    document.addEventListener("click", this.closeIfOutsideModal.bind(this));

    // Create outer modal div
    const modalDiv = document.createElement("div");

    // modalDiv.appendChild(this.headingContainer());

    modalDiv.id = id("outer");
    Object.assign(
      modalDiv.style,
      styles.centered,
      styles.outerDivStyle,
      styles.maxSize,
      styles.boxShadow,
    );

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
      document.body.insertAdjacentHTML(
        "beforeend",
        `<div id='${id("module")}'></div>`,
      );
      this.modal = document.getElementById(`${id("module")}`);
    }

    // Set the modal content
    this.modal!.innerHTML = modalDiv.outerHTML;

    this.handleSegmentImage(this.emitter, signedCaptcha);

    this.handleEventListener(account, destination);
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
      styles.brandNameSecondLine,
      styles.flexCenter,
    );

    instructionContainerDiv.appendChild(instruction);

    return instructionContainerDiv;
  };

  headingContainer = (): HTMLElement => {
    const headingContainerDiv = document.createElement("div");
    Object.assign(
      headingContainerDiv.style,
      styles.flexCenter,
      styles.padding5,
      styles.actionContainerStyle,
    );

    const heading = document.createElement("div");
    heading.textContent = "Solve the captcha to execute the transaction";
    Object.assign(heading.style, styles.brandNameSecondLine, styles.flexCenter);

    headingContainerDiv.appendChild(heading);

    return headingContainerDiv;
  };

  brandContainer = (): HTMLElement => {
    // Create header with brand logo and name
    const brandContainerDiv = document.createElement("div");
    Object.assign(
      brandContainerDiv.style,
      styles.flexCenter,
      styles.padding5,
      styles.flexStart,
    );

    const brandName = document.createElement("div");
    Object.assign(brandName.style, styles.brandNameWrapper, styles.pointer);

    const brandText = document.createElement("div");
    brandText.id = id("brandName");
    brandText.textContent = "Solve3.org";
    Object.assign(brandText.style, styles.brandNameSecondLine);

    brandName.appendChild(brandText);

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

    innerDiv.style.backgroundImage = `url(${signedCaptcha.image})`;
    innerDiv.style.backgroundSize = "cover"; // To fit and cover the content
    innerDiv.style.backgroundPosition = "center"; // Center the background

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
          setupDragAndDrop(emitter, scale, imgElement, captcha);
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
  menu = (): HTMLElement => {
    const squareContainer = document.createElement("div");
    Object.assign(squareContainer.style, styles.squareContainer);

    const square1 = document.createElement("div");
    Object.assign(
      square1.style,
      styles.square,
      styles.flexCenter,
      styles.fontLight,
      styles.pointer,
    );
    square1.id = id("onRefresh");
    square1.innerHTML = refreshSvg;

    const square2 = document.createElement("div");
    Object.assign(
      square2.style,
      styles.square,
      styles.flexCenter,
      styles.fontLight,
      styles.pointer,
    );
    square2.id = id("onClose");
    square2.innerHTML = closeSvg;

    const square3 = document.createElement("div");
    Object.assign(
      square3.style,
      styles.square,
      styles.flexCenter,
      styles.fontLight,
      styles.pointer,
    );
    square3.id = id("onLink");
    square3.innerHTML = linkSvg;

    squareContainer.appendChild(square1);
    squareContainer.appendChild(square2);
    squareContainer.appendChild(square3);

    return squareContainer;
  };

  logo = (): HTMLElement => {
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

  userOverview = (
    account: string,
    destination: string,
    chainId: number,
  ): HTMLElement => {
    const tableContainer = document.createElement("div");
    tableContainer.style.width = "100%";
    Object.assign(
      tableContainer.style,
      styles.flexCenter,
      styles.padding5,
      styles.actionContainerStyle,
    );

    const table = document.createElement("table");
    table.style.minWidth = "70%";
    table.style.borderCollapse = "collapse"; // To remove spacing between table cells

    // add styling
    Object.assign(
      table.style,
      styles.brandNameSecondLine,
      styles.textAlignLeft,
      styles.fontLight,
    );
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
      const valueText = convertAddressToShortString(rowInfo.value);
      valueCell.style.padding = "2px";

      if (valueText.includes("0x")) {
        // Only add copy-to-clipboard functionality if value contains "0x"
        const valueSpan = document.createElement("span");

        // Create an SVG element (adjust attributes as needed)
        const svgElement = new DOMParser()
          .parseFromString(copy, "image/svg+xml")
          .querySelector("svg");

        svgElement!.setAttribute("width", "10");
        svgElement!.setAttribute("height", "10");

        Object.assign(svgElement!.style, styles.pointer);
        // add id
        svgElement!.id = id("address-" + index);
        svgElement!.style.marginTop = "3px";

        const textSpan = document.createElement("span");
        textSpan.textContent = valueText;
        textSpan.style.marginRight = "3px";

        textSpan.style.cursor = "pointer";

        valueSpan.appendChild(textSpan);
        valueSpan.appendChild(svgElement!);

        valueCell.appendChild(valueSpan);
      } else {
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

  handleEventListener = (account: string, destination: string) => {
    const square1 = document.getElementById(`${id("onRefresh")}`);
    if (square1)
      square1.addEventListener("click", () => {
        this.emitter("refresh");
      });

    const square2 = document.getElementById(`${id("onClose")}`);
    if (square2)
      square2.addEventListener("click", () => {
        this.close();
      });

    const square3 = document.getElementById(`${id("onLink")}`);
    if (square3)
      square3.addEventListener("click", () => {
        window.open("https://solve3.org", "_blank");
      });

    const brandName = document.getElementById(`${id("brandName")}`);
    if (brandName)
      brandName.addEventListener("click", () => {
        window.open("https://solve3.org", "_blank");
      });

    const address0 = document.getElementById(`${id("address-0")}`);
    if (address0)
      address0.addEventListener("click", () => {
        navigator.clipboard.writeText(account);
      });

    const address1 = document.getElementById(`${id("address-1")}`);
    if (address1)
      address1.addEventListener("click", () => {
        navigator.clipboard.writeText(destination);
      });
  };
}
