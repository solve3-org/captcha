import { EventEmitter } from "events";
import Logger from "../Logger/Logger";
import Modal from "../Modal/Modal";
import { HandshakeIn, HandshakeResult, SignedCaptcha } from "../types";
import { requestCaptcha } from "../Modal/api/api";

export default class Solve3 extends EventEmitter {
  logger: Logger = new Logger(true);
  modal: Modal = new Modal();

  private _handshakeIn: HandshakeIn | undefined;

  constructor() {
    super();
  }


  public open(HandshakeResult: HandshakeResult | undefined) {
    if(!this._handshakeIn) {
      throw new Error("Solve3 not initialized");
    }

    if(!HandshakeResult) {
      throw new Error("HandshakeResult not found");
    }

    this.logger.debug("open");
    
    const signedCaptcha: SignedCaptcha = requestCaptcha(HandshakeResult);

    this.modal.create(signedCaptcha);
  }

  // return value needs to be signed
  public init(handshakeIn: HandshakeIn): HandshakeResult {
    this._handshakeIn = handshakeIn;

    // check if account and destination are valid addresses
    const handshakeResult: HandshakeResult = {
      account: handshakeIn.account,
      network: handshakeIn.network,
      destination: handshakeIn.destination,
      timestamp: Date.now(),
      signature: "SIGNATURE",
    };

    return handshakeResult;
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