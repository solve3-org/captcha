import { EventEmitter } from "events";
import Logger from "../Logger/Logger";
import Modal from "./Modal/Modal";
import {
  ErrorCode,
  HandshakeIn,
  HandshakeResult,
  HandshakeResultWithMessage,
  Positions,
  SignedCaptcha,
} from "../types";
import { handshake, requestCaptcha, requestProof } from "./api/api";

export default class Solve3 extends EventEmitter {
  logger: Logger = new Logger(false);
  modal: Modal = new Modal();
  api: string | undefined;

  private _handshakeIn: HandshakeIn | undefined;
  private _handshakeResult: HandshakeResultWithMessage | undefined;
  private _signedHandshake: HandshakeResult | undefined;
  private _signedCaptcha: SignedCaptcha | undefined;

  constructor(_api?: string) {
    super();
    if (_api) this.api = _api;
    this.modal
      .on("dragend", (solution: Positions) => {
        this.modal.startLoading();
        this.logger.debug("solution emitted " + solution);
        this.handleSolutionEmitted(solution);
      })
      .on("refresh", () => {
        this.logger.debug("refresh");
        this.createModal();
      });
  }

  // return value needs to be signed
  public async init(handshakeIn: HandshakeIn): Promise<string> {
    this._handshakeIn = handshakeIn;

    // check if account and destination are valid addresses
    const handshakeResult: HandshakeResultWithMessage = await handshake(
      handshakeIn,
      this.api,
    );

    this._handshakeResult = handshakeResult;
    return handshakeResult.message;
  }

  public async open(signature: string) {
    if (!this._handshakeIn) {
      throw new Error("Solve3 not initialized");
    }

    if (!signature) {
      throw new Error("No Signature provided");
    }

    this._signedHandshake = {
      ...this._handshakeIn,
      timestamp: this._handshakeResult?.timestamp as number,
      signature: signature,
    };

    await this.createModal();

    this.logger.debug("open");
  }

  private async createModal() {
    if (this._signedHandshake) {
      const result = await requestCaptcha(this._signedHandshake, this.api);

      if (result === ErrorCode.SESSION_EXPIRED) {
        this.emit("expired", "Session expired");
        this.modal.sessionExpired();
        console.log("session expired");
        return;
      } else {
        this._signedCaptcha = result as SignedCaptcha;
      }
      this.modal.create(
        this._signedCaptcha,
        this._signedHandshake.account,
        this._signedHandshake.destination,
        this._signedHandshake.network,
      );
    }
  }

  private async handleSolutionEmitted(solution: Positions) {
    const proof = await requestProof(
      {
        ...this._signedCaptcha!,
        posX: solution.posX,
        posY: solution.posY,
      },
      this.api,
    );
    setTimeout(() => {
      if (
        proof === ErrorCode.SESSION_EXPIRED ||
        proof === ErrorCode.INVALID_SIGNATURE
      ) {
        this.emit("expired", "Session expired");
        this.modal.sessionExpired();
        console.log("session expired");
      } else if (!proof || proof === ErrorCode.INVALID_SOLUTION) {
        this.emit("failed", "Proof is null");
        console.log("proof is null");
        this.createModal();
      } else {
        this.emit("success", proof);
        console.log("proof: ", proof);
        this.modal.close();
      }
      this.modal.stopLoading();
    }, 1500);
  }
}
