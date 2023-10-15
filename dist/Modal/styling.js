"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.square = exports.squareContainer = exports.fontDark = exports.segmentImageStyle = exports.pointer = exports.innerDivStyle = exports.innerWrapperDivStyle = exports.closeButtonStyle = exports.actionContainerStyle = exports.brandNameSecondLine = exports.brandNameFirstLine = exports.brandNameWrapper = exports.brandLogoSize = exports.padding5 = exports.flexCenter = exports.boxShadowBold = exports.boxShadow = exports.sessionExpiredDivStyle = exports.outerDivStyle = exports.centered = exports.maxSize = void 0;
const maxSize = {
    width: "350px",
};
exports.maxSize = maxSize;
const centered = {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
};
exports.centered = centered;
const outerDivStyle = {
    backgroundColor: "#000000",
    background: `linear-gradient(180deg, #f9f9f9 50%, #adadad 100%)`,
    border: "1px solid #320b40",
    borderRadius: "7px",
    padding: "5px 5px 5px 5px",
    boxSizing: "border-box",
    color: "lightgrey",
    display: "flex",
    flexDirection: "column",
};
exports.outerDivStyle = outerDivStyle;
const sessionExpiredDivStyle = {
    background: "rgba(0, 0, 0, 0.4)",
    width: "100%",
    height: "100%",
    color: "white",
    zIndex: 10001,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "7px",
};
exports.sessionExpiredDivStyle = sessionExpiredDivStyle;
const boxShadow = {
    boxShadow: "0px 0px 7px rgba(0, 0, 0, 0.2)",
};
exports.boxShadow = boxShadow;
const boxShadowBold = {
    boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.5)",
};
exports.boxShadowBold = boxShadowBold;
const flexCenter = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    textAlign: "center",
};
exports.flexCenter = flexCenter;
const padding5 = {
    padding: "5px",
};
exports.padding5 = padding5;
const brandLogoSize = {
    height: "30px",
    marginRight: "5px",
    marginLeft: "5px",
};
exports.brandLogoSize = brandLogoSize;
const brandNameWrapper = {
    width: "100%",
    textAlign: "left",
    color: "lightgrey",
    marginLeft: "5px",
};
exports.brandNameWrapper = brandNameWrapper;
const brandNameFirstLine = {
    fontSize: "0.8rem",
    fontWeight: "bold",
    opacity: "0.8",
    letterSpacing: "0.03rem",
};
exports.brandNameFirstLine = brandNameFirstLine;
const brandNameSecondLine = {
    color: "gray",
    fontSize: "0.7rem",
    fontWeight: "600",
    opacity: "0.8",
    letterSpacing: "0.05rem",
};
exports.brandNameSecondLine = brandNameSecondLine;
const actionContainerStyle = {
    margin: "auto",
    bottom: "5px",
    left: "0",
    right: "0",
};
exports.actionContainerStyle = actionContainerStyle;
const pointer = {
    cursor: "pointer",
};
exports.pointer = pointer;
const closeButtonStyle = {
    background: "none",
    color: "lightgrey",
    fontSize: "1rem",
    fontWeight: "bold",
    // Set the width and height to create a circular button
    width: "30px",
    height: "30px",
    borderRadius: "50%",
    padding: "0",
    boxSizing: "border-box",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    // border color
    border: "2px solid lightgrey",
};
exports.closeButtonStyle = closeButtonStyle;
const innerWrapperDivStyle = {
    width: "100%",
    // height: "80%",
    aspectRatio: "1 / 1",
    resize: "none",
    border: "none",
    outline: "none",
    padding: "5px",
    boxSizing: "border-box",
    alignItems: "center",
    justifyContent: "center", // Center vertically
};
exports.innerWrapperDivStyle = innerWrapperDivStyle;
// captcha image
const innerDivStyle = {
    width: "100%",
    height: "100%",
    resize: "none",
    border: "none",
    outline: "none",
    padding: "5px",
    boxSizing: "border-box",
    background: "lightgrey",
    borderRadius: "5px",
    position: "relative",
};
exports.innerDivStyle = innerDivStyle;
const segmentImageStyle = {
    border: "1px solid rgb(255,255,255,0.4)",
    position: "absolute",
    bottom: "5px",
    left: "5px",
};
exports.segmentImageStyle = segmentImageStyle;
const fontDark = {
    color: "#6e6e6e",
};
exports.fontDark = fontDark;
const squareContainer = {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    marginTop: "auto",
    marginLeft: "auto",
};
exports.squareContainer = squareContainer;
const square = {
    width: "20px",
    height: "20px",
    padding: "2px",
    justifyContent: "center",
    opacity: "0.7",
    // marginLeft: "5px",
    marginRight: "2px",
    zIndex: 10000,
};
exports.square = square;
