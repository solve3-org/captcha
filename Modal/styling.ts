const maxSize = {
  width: "350px",
  height: "450px",
};

const centered = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
};

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

const boxShadow = {
  boxShadow: "0px 0px 7px rgba(0, 0, 0, 0.2)",
};

const boxShadowBold = {
  boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.5)",
};

const flexCenter = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const padding5 = {
  padding: "5px",
};

const brandLogoSize = {
  height: "30px",
  marginRight: "5px",
  marginLeft: "5px",
  // marginBottom: "5px",
  // marginTop: "5px",
};

const brandNameWrapper = {
  width: "100%",
  textAlign: "left",
  color: "lightgrey",
  marginLeft: "5px",
};

const brandNameFirstLine = {
  fontSize: "0.8rem",
  fontWeight: "bold",
  opacity: "0.8",
  letterSpacing: "0.03rem",
};

const brandNameSecondLine = {
  fontSize: "0.7rem",
  fontWeight: "600",
  opacity: "0.8",
  letterSpacing: "0.05rem",
};

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

const pointer = {
  cursor: "pointer",
};

const closeButtonStyle = {
  border: "none",
  background: "none",
};

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
  flexDirection: "column", // Change to column direction
  alignItems: "center", // Center horizontally
  justifyContent: "center", // Center vertically
};

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

const segmentImageStyle = {
  border: "1px solid rgb(255,255,255,0.4)",
  position: "absolute",
  bottom: "5px",
  left: "5px",
};

// export all
export {
  maxSize,
  centered,
  outerDivStyle,
  boxShadow,
  boxShadowBold,
  flexCenter,
  padding5,
  brandLogoSize,
  brandNameWrapper,
  brandNameFirstLine,
  brandNameSecondLine,
  brandContainerStyle,
  closeButtonStyle,
  innerWrapperDivStyle,
  innerDivStyle,
  pointer,
  segmentImageStyle,
};
