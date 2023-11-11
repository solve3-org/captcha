import { SignedCaptcha } from "../../../types";
import { id } from "../../../utils";
import { setupDragAndDrop } from "../handler";
import * as styles from "../styling";

const SegmentBaseImage = (
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

export const SegmentImage = (
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

        const imgElement = SegmentBaseImage(
          segmentScaledWidth,
          segmentScaledHeight,
          signedCaptcha.segment,
        );

        const dragDivHandle = DragDiv(segmentScaledWidth, segmentScaledHeight);
        captcha.appendChild(dragDivHandle);
        captcha.appendChild(imgElement); // Append the img element to innerDiv
        imgElement.draggable = true;

        setupDragAndDrop(emitter, scale, imgElement, dragDivHandle, captcha);
      };
    };
  }
};

const DragDiv = (size: number, distance: number): HTMLDivElement => {
  const width = 25;
  const center = size / 2 - width / 2 + 4;
  const dragDiv = document.createElement("div");
  dragDiv.id = id("drag-div");
  dragDiv.style.width = `25px`;
  dragDiv.style.height = `55px`;
  dragDiv.style.position = "absolute";
  dragDiv.style.left = `${center}px`;
  dragDiv.style.bottom = `-${30}px`;
  dragDiv.style.backgroundColor = "#ddd";
  dragDiv.style.borderBottomLeftRadius = "20px";
  dragDiv.style.borderBottomRightRadius = "20px";
  dragDiv.style.border = "2px solid green";
  dragDiv.style.display = "flex";
  dragDiv.style.justifyContent = "center";
  dragDiv.style.alignItems = "flex-end";
  dragDiv.style.boxShadow = "0 0 4px 0 rgba(0,0,0,0.5)";

  const outerCircle = createHandle(width); // Adjust the outer handle radius and color
  dragDiv.appendChild(outerCircle);

  function createHandle(width: number) {
    const handle = document.createElement("div");
    handle.style.width = `${width}px`;
    handle.style.height = `${width}px`;
    handle.style.display = "flex";
    handle.style.justifyContent = "center";
    handle.style.alignItems = "center";
    handle.style.flexDirection = "column";
    handle.style.paddingBottom = `${2}px`;

    const pDrag = document.createElement("div");
    const p = document.createElement("div");
    p.style.fontSize = `29px`;
    p.style.lineHeight = `30px`;
    p.style.color = "green";
    p.style.textAlign = "center";
    p.style.verticalAlign = "bottom";
    p.style.fontFamily = "sans-serif";
    p.style.marginTop = `5px`;
    p.style.fontWeight = "200";
    p.style.opacity = "0.9";
    p.innerHTML = "⊜";
    // p.innerHTML = "&#128907;";
    // p.innerHTML = "&ocir;";
    // p.innerHTML = "&#10294;";

    //     const icon = `<svg fill="green" width="29px" height="29px" viewBox="-8.5 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg">
    // <title>arrows-alt</title>
    // <path d="M13.76 18.48v0c-0.48 0-0.84 0.36-0.84 0.84v1.12l-4.4-4.4 4.4-4.4v1.12c0 0.48 0.36 0.84 0.84 0.84s0.84-0.36 0.84-0.84v-3.16c0-0.48-0.36-0.84-0.88-0.84v0h-3.16c-0.48 0-0.84 0.36-0.84 0.84s0.36 0.84 0.84 0.84h1.12l-4.4 4.4-4.4-4.4h1.16c0.48 0 0.84-0.36 0.84-0.84s-0.36-0.84-0.84-0.84h-3.16c-0.52 0-0.88 0.4-0.88 0.88v3.16c0 0.48 0.36 0.8 0.84 0.8v0c0.48 0 0.84-0.36 0.84-0.84v-1.12l4.4 4.4-4.4 4.4v-1.12c0-0.48-0.36-0.84-0.84-0.84-0.44-0.040-0.8 0.32-0.8 0.8v3.16c0 0.44 0.24 0.8 0.84 0.8h3.16c0.48 0 0.84-0.36 0.84-0.84s-0.36-0.8-0.84-0.8h-1.12l4.4-4.4 4.4 4.4h-1.12c-0.48 0-0.84 0.36-0.84 0.84s0.36 0.84 0.84 0.84h3.16c0.56 0 0.88-0.32 0.88-0.8v0-3.16c-0.040-0.48-0.44-0.84-0.88-0.84z"></path>
    // </svg>`;

    //     p.innerHTML = icon;

    handle.appendChild(pDrag);
    handle.appendChild(p);

    return handle;
  }

  dragDiv.style.opacity = "1";
  dragDiv.style.background = "linear-gradient(45deg, lightgreen, green)";
  dragDiv.style.color = "white";
  dragDiv.style.cursor = "pointer";

  return dragDiv;
};
