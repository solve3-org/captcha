import { EventEmitter } from "events";
import Logger from "../Logger/Logger";
import Modal from "../Modal/Modal";
import {
  HandshakeIn,
  HandshakeResult,
  HandshakeResultWithMessage,
  Positions,
  SignedCaptcha,
  SolvedCaptcha,
} from "../types";
import { handshake, requestCaptcha, requestProof } from "../Modal/api/api";

export default class Solve3 extends EventEmitter {
  logger: Logger = new Logger(true);
  modal: Modal = new Modal();

  private _handshakeIn: HandshakeIn | undefined;
  private _handshakeResult: HandshakeResultWithMessage | undefined;
  private _signedHandshake: HandshakeResult | undefined;
  private _signedCaptcha: SignedCaptcha | undefined;

  constructor() {
    super();
    this.modal.on("dragend", (solution: Positions) => {
      console.log("solution emitted", solution);
      this.handleSolutionEmitted(solution);
    });
  }

  // return value needs to be signed
  public async init(handshakeIn: HandshakeIn): Promise<string> {
    this._handshakeIn = handshakeIn;

    // check if account and destination are valid addresses
    const handshakeResult: HandshakeResultWithMessage = await handshake(
      handshakeIn,
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
      this._signedCaptcha = await requestCaptcha(this._signedHandshake);

      this.modal.create(this._signedCaptcha);
    }
  }

  private async handleSolutionEmitted(solution: Positions) {
    const proof = await requestProof({
      ...this._signedCaptcha!,
      posX: solution.posX,
      posY: solution.posY,
    });
    if (proof) {
      this.emit("success", proof);
      console.log("proof: ", proof);
    } else {
      this.emit("failed", "Proof is null");
      console.log("proof is null");
      this.createModal();
    }
  }
}

// const openPopup = async () => {
//   solve3
//     .on("success", async (message) => {
//       sendTx(message);
//     })
//     .on("error", async (err) => {
//       console.log("error: ", err);
//     });

//   const handshake = await solve3.init({
//     account: account,
//     contract: "0xa70783A4EA4fEE1C121864146049736D11105755",
//     network: "mumbai",
//   });
//   console.log("address: ", props.address);
//   console.log("handshake: ", handshake);
//   web3.eth.sign(handshake, account).then((msg) => {
//     solve3.open(msg);
//   });
// };
