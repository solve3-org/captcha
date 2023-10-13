import {
  HandshakeIn,
  HandshakeResult,
  HandshakeResultWithMessage,
  SignedCaptcha,
  SolvedCaptcha,
} from "../../types";
// @ts-ignore
import dummySignedCaptcha from "./signedCaptcha.json";
import { API_URL } from "./config";

const fetchApi = async (method: string, body: any) => {
  const response = await fetch(`${API_URL}/${method}`, {
    method: "POST", // Use the appropriate HTTP method
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body), // Convert the object to JSON
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  // Parse and return the response as JSON
  return response.json();
};

export const handshake = async (
  handshakeIn: HandshakeIn,
): Promise<HandshakeResultWithMessage> => {
  return await fetchApi("handshake", handshakeIn);
};

export const requestCaptcha = async (
  handshakeResult: HandshakeResult,
): Promise<SignedCaptcha> => {
  return await fetchApi("requestCaptcha", handshakeResult);
};

export const requestProof = (solvedCaptcha: SolvedCaptcha): String => {
  console.log("requestProof");
  return "";
};
