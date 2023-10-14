"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.segmentImageStyle = exports.pointer = exports.innerDivStyle = exports.innerWrapperDivStyle = exports.closeButtonStyle = exports.brandContainerStyle = exports.brandNameSecondLine = exports.brandNameFirstLine = exports.brandNameWrapper = exports.brandLogoSize = exports.padding5 = exports.flexCenter = exports.boxShadowBold = exports.boxShadow = exports.outerDivStyle = exports.centered = exports.maxSize = void 0;
const maxSize = {
    width: "350px",
    height: "450px",
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
    // ad33cc, 320b40, #441953
    // background: `linear-gradient(180deg, #441953 0%, #320b40 66%, #320b40 66%, #320b40 100%)`,
    backgroundColor: "rgba(50, 11, 64, 0.99)",
    background: `linear-gradient(180deg, #ad33cc 0%, #320b40 100%)`,
    // background: `linear-gradient(180deg, rgba(173, 51, 204, 0.5) 0%, rgba(50, 11, 64, 0.99) 100%)`,
    // background: "#333",
    border: "1px solid #320b40",
    borderRadius: "7px",
    padding: "5px 5px 5px 5px",
    boxSizing: "border-box",
    color: "lightgrey",
    display: "flex-box",
};
exports.outerDivStyle = outerDivStyle;
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
    // marginBottom: "5px",
    // marginTop: "5px",
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
    fontSize: "0.7rem",
    fontWeight: "600",
    opacity: "0.8",
    letterSpacing: "0.05rem",
};
exports.brandNameSecondLine = brandNameSecondLine;
const brandContainerStyle = {
    display: "flex",
    justifyContent: "flex-end",
    marginTop: "auto",
    // alignItems: "center",
    position: "absolute",
    bottom: "5px",
    left: "0",
    right: "0",
};
exports.brandContainerStyle = brandContainerStyle;
const pointer = {
    cursor: "pointer",
};
exports.pointer = pointer;
const closeButtonStyle = {
    border: "none",
    background: "none",
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
    display: "flex",
    flexDirection: "column",
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
