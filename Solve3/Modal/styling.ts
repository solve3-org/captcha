const maxSize = {
  width: "350px",
  maxWidth: "80vw",
};

const centered = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
};

const outerDivStyle = {
  backgroundColor: "#000000",
  background: `linear-gradient(180deg, #fefefe 50%, #dddddd 100%)`,
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
  justifyContent: "center",
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
  textAlign: "left",
  color: "lightgrey",
  marginLeft: "5px",
};

const brandNameFirstLine = {
  fontSize: "0.8rem",
  fontWeight: "bold",
  opacity: "0.9",
  letterSpacing: "0.03rem",
  color: "#222",
};

const brandNameSecondLine = {
  color: "#222",
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
  border: "1px solid rgb(255,255,255,0.6)",
  position: "absolute",
  bottom: "5px",
  left: "5px",
};

const fontLight = {
  color: "#555",
};

const menuContainer = {
  display: "flex",
  justifyContent: "flex-end",
  alignItems: "flex-end",
  marginTop: "auto",
  marginLeft: "auto",
};

const miniBtn = {
  width: "24px",
  height: "24px",
  padding: "2px",
  justifyContent: "center",
  opacity: "0.7",
  // marginLeft: "5px",
  marginRight: "2px",
  zIndex: 10000,
};

const flexStart = {
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "flex-start",
  marginTop: "auto",
  marginRight: "auto",
};

const logo = {
  display: "flex",
  justifyContent: "flex-center",
  alignItems: "flex-center",
  marginTop: "auto",
};

const w100 = {
  width: "100%",
};

const opacity75 = {
  opacity: "0.75",
};

const circle = {
  height: "34px",
  width: "34px",
  backgroundColor: "#ccc",
  borderRadius: "50%",
  display: "inline-block",
  padding: "2px",
  border: "1px solid #999",
  // shadow
  boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.3)",
};

const textAlignLeft = {
  textAlign: "left",
};

const loadingCircleStyle = {
  width: "20px",
  height: "20px",
  backgroundColor: "#adadad", // Blue color, you can change it
  borderRadius: "50%",
  margin: "0 10px", // Adjust the spacing between circles
  animation: "solve3LoadingExpandAndContract 0.5s infinite",
  animationDelay: "0.2s", // Delay each circle's animation
};

const loadingOverlay = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  position: "fixed",
  top: "0",
  left: "0",
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  zIndex: "11999",
  borderRadius: "7px",
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
  fontLight,
  menuContainer,
  miniBtn,
  flexStart,
  w100,
  opacity75,
  logo,
  circle,
  textAlignLeft,
  loadingCircleStyle,
  loadingOverlay,
};
