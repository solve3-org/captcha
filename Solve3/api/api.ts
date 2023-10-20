import {
  ErrorCode,
  HandshakeIn,
  HandshakeResult,
  HandshakeResultWithMessage,
  SignedCaptcha,
  SolvedCaptcha,
} from "../../types";
// @ts-ignore
import { API_URL } from "./config";

const fetchApi = async (method: string, body: any) => {
  const response = await fetch(`${API_URL}/${method}`, {
    method: "POST", // Use the appropriate HTTP method
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body), // Convert the object to JSON
  });

  // Parse and return the response as JSON
  return response.json();
};

export const handshake = async (
  handshakeIn: HandshakeIn,
): Promise<HandshakeResultWithMessage> => {
  const result = await fetchApi("handshake", handshakeIn);
  if (result.error) {
    throw new Error(result.errors[0].msg);
  }
  return result;
};

export const requestCaptcha = async (
  handshakeResult: HandshakeResult,
): Promise<SignedCaptcha | ErrorCode> => {
  const result = await fetchApi("requestCaptcha", handshakeResult);
  if (result.error) {
    if (result.error.code === ErrorCode.SESSION_EXPIRED) {
      return result.error.code;
    }
    throw new Error(result.error.message);
  }
  return result;
};

export const requestProof = async (
  solvedCaptcha: SolvedCaptcha,
): Promise<String | ErrorCode> => {
  const result = await fetchApi("requestProof", solvedCaptcha);
  if (result.error) {
    if (result.error.code === ErrorCode.SESSION_EXPIRED) {
      return result.error.code;
    }
    return ErrorCode.INVALID_SOLUTION;
  }
  return result;
};
