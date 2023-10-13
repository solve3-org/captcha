import { EventEmitter } from "events";
import Logger from "../Logger/Logger";
import Modal from "../Modal/Modal";
import {
  HandshakeIn,
  HandshakeResult,
  HandshakeResultWithMessage,
  SignedCaptcha,
} from "../types";
import { handshake, requestCaptcha } from "../Modal/api/api";

export default class Solve3 extends EventEmitter {
  logger: Logger = new Logger(true);
  modal: Modal = new Modal();

  private _handshakeIn: HandshakeIn | undefined;
  private _handshakeResult: HandshakeResultWithMessage | undefined;

  constructor() {
    super();
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

    const handshakeResult: HandshakeResult = {
      ...this._handshakeIn,
      timestamp: this._handshakeResult?.timestamp as number,
      signature: signature,
    };

    // if (!HandshakeResult) {
    //   throw new Error("HandshakeResult not found");
    // }

    this.logger.debug("open");

    const signedCaptcha: SignedCaptcha = await requestCaptcha(handshakeResult);

    this.modal.create(signedCaptcha);
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