import Logger from "../Logger/Logger";

const logger = new Logger(true);


const changeInnerDivColor = () => {
  logger.debug("changeInnerDivColor()");
  const innerDiv: HTMLElement | null = document.getElementById(
    "s3-solve3-modal-inner",
  );

  logger.debug("changeInnerDivColor()" + " innerDiv");

  if (!innerDiv) {
    throw new Error("Inner div not found");
  }

  if (innerDiv.style.background === "darkgrey") {
    logger.debug(
      "changeInnerDivColor()" + " innerDiv.style.background: red -> blue",
    );
    innerDiv.style.background = "lightgrey";
  } else {
    logger.debug(
      "changeInnerDivColor()" + " innerDiv.style.background: blue -> red",
    );
    innerDiv.style.background = "darkgrey";
  }
};

// export
export { changeInnerDivColor };