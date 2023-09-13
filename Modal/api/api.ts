import { HandshakeIn, HandshakeResult, SignedCaptcha, SolvedCaptcha } from "../../types"
// @ts-ignore
import dummySignedCaptcha from "./signedCaptcha.json";

export const handshake = (handshakeIn: HandshakeIn): HandshakeResult | undefined => {
  console.log("handshake")
  return;
}

export const requestCaptcha = (HandshakeResult: HandshakeResult): SignedCaptcha => {
  console.log("requestCaptcha")

  const signedCaptcha: SignedCaptcha = JSON.parse(
    JSON.stringify(dummySignedCaptcha),
  );

  console.log(signedCaptcha.signature)

  return signedCaptcha;
}

export const requestProof = (solvedCaptcha: SolvedCaptcha): String => {
  console.log("requestProof")
  return "";
}