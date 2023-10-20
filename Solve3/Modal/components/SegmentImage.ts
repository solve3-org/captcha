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
        captcha.appendChild(imgElement); // Append the img element to innerDiv

        // Make the imgElement draggable
        imgElement.draggable = true;

        // Set up drag-and-drop events
        setupDragAndDrop(emitter, scale, imgElement, captcha);
      };
    };
  }
};
