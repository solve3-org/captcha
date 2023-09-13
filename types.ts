export type HandshakeIn = {
  account: string;
  network: string;
  destination: string;
};

export type HandshakeResult = HandshakeIn & {
  timestamp: number;
  signature: string;
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
  position: number;
  magicToken: string; // Secret
};

export type SignedCaptcha = BaseCaptcha & {
  signature: string;
};

export type SolvedCaptcha = SignedCaptcha & {
  solution: number;
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
