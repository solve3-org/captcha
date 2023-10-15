const maxSize = {
  width: "350px",
};

const centered = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
};

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
  textAlign: "center",
};

const padding5 = {
  padding: "5px",
};

const brandLogoSize = {
  height: "30px",
  marginRight: "5px",
  marginLeft: "5px",
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
  color: "gray",
  fontSize: "0.7rem",
  fontWeight: "600",
  opacity: "0.8",
  letterSpacing: "0.05rem",
};

const actionContainerStyle = {
  margin: "auto",
  bottom: "5px",
  left: "0",
  right: "0",
};

const pointer = {
  cursor: "pointer",
};

const closeButtonStyle = {
  background: "none",
  color: "lightgrey",
  fontSize: "1rem",
  fontWeight: "bold",

  // Set the width and height to create a circular button
  width: "30px", // Adjust the size as needed
  height: "30px", // Adjust the size as needed
  borderRadius: "50%",
  padding: "0", // Remove padding to make it a circle
  boxSizing: "border-box",
  display: "flex",
  justifyContent: "center",
  alignItems: "center", // Center the content vertically

  // border color
  border: "2px solid lightgrey",
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

const fontDark = {
  color: "#6e6e6e",
};

const squareContainer = {
  display: "flex",
  justifyContent: "flex-end",
  alignItems: "flex-end",
  marginTop: "auto",
  marginLeft: "auto",
};

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

// export all
export {
  maxSize,
  centered,
  outerDivStyle,
  sessionExpiredDivStyle,
  boxShadow,
  boxShadowBold,
  flexCenter,
  padding5,
  brandLogoSize,
  brandNameWrapper,
  brandNameFirstLine,
  brandNameSecondLine,
  actionContainerStyle,
  closeButtonStyle,
  innerWrapperDivStyle,
  innerDivStyle,
  pointer,
  segmentImageStyle,
  fontDark,
  squareContainer,
  square,
};
