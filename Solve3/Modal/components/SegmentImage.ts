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

        const dragDivHandle = DragDiv(segmentScaledWidth);
        captcha.appendChild(dragDivHandle);
        captcha.appendChild(imgElement); // Append the img element to innerDiv
        imgElement.draggable = true;

        setupDragAndDrop(emitter, scale, imgElement, dragDivHandle, captcha);
      };
    };
  }
};

const DragDiv = (size: number): HTMLDivElement => {
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
