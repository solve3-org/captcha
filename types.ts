export type HandshakeIn = {
  account: string;
  network: number;
  destination: string;
};

export type HandshakeResult = HandshakeIn & {
  timestamp: number;
  signature: string;
};

export type HandshakeResultWithMessage = HandshakeResult & {
  message: string;
};

export type SignedMessage = {
  message: string;
  signature: string;
  hash: string;
};

export type Secret = HandshakeIn & {
  position: number;
  nonce: number;
  expiry: number;
};

export type RawCaptcha = {
  image: string;
  segment: string;
  posX: number;
  posY: number;
};

export type BaseCaptcha = {
  image: string;
  segment: string;
  magicToken: string; // Secret
};

export type SignedCaptcha = BaseCaptcha & {
  signature: string;
};

export type SolvedCaptcha = SignedCaptcha & {
  posX: number;
  posY: number;
};

export type ProofData = {
  account: string;
  nonce: number;
  timestamp: number;
  destination: string;
};

export type Proof = {
  s: string;
  r: string;
  v: number;
  data: ProofData;
};

export interface EIP712Domain {
  name: string;
  version: string;
  chainId: number;
  verifyingContract: string;
}

export type TypedData = {
  domain: EIP712Domain;
  message: ProofData;
  primaryType: string;
  types: any;
};

export type Positions = {
  posX: number;
  posY: number;
};

export enum ErrorCode {
  NONE,
  INVALID_INPUT,
  UNSUPPORTED_NETWORK,
  INVALID_SIGNATURE,
  INVALID_SIGNATURE_STRING,
  SESSION_EXPIRED,
  INVALID_REQUEST,
  INVALID_SOLUTION,
}