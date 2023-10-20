import EventEmitter from "events";
import Logger from "../../Logger/Logger";
import { id } from "../../utils";
import { SignedCaptcha } from "../../types";
import { SessionExpired } from "./components/SessionExpired";
import { LoadingOverlay } from "./components/Loading";
import { SegmentImage } from "./components/SegmentImage";
import { ModalComponent } from "./components/ModalComponent";

export default class Modal extends EventEmitter {
  logger = new Logger(true);
  modal: HTMLElement | null = null;
  emitter = this.emit.bind(this);

  constructor() {
    super();
    this.initialize();
  }

  // Method to close the modal
  public close() {
    document.removeEventListener("click", this.closeIfOutsideModal.bind(this));
    if (this.modal) {
      this.emitter("close");
      this.modal.remove(); // Remove the modal from the DOM
      this.modal = null; // Reset the modal reference
    }
  }

  public startLoading() {
    this.modal!.appendChild(LoadingOverlay());
  }

  public stopLoading() {
    const loadingOverlay = document.getElementById(`${id("loading-overlay")}`);
    if (loadingOverlay && this.modal) {
      this.modal.removeChild(loadingOverlay);
    }
  }

  public create(
    signedCaptcha: SignedCaptcha,
    account: string,
    destination: string,
    chain: number,
  ) {
    this.close();
    this.initialize();
    // Set the modal content
    this.modal!.innerHTML = ModalComponent(
      signedCaptcha,
      account,
      destination,
      chain,
    ).outerHTML;

    SegmentImage(this.emitter, signedCaptcha);
    this.handleEventListener(account, destination);
  }

  public sessionExpired() {
    this.modal!.appendChild(SessionExpired(this));
  }

  private initialize() {
    if (!this.modal) {
      document.body.insertAdjacentHTML(
        "beforeend",
        `<div id='${id("module")}'></div>`,
      );
      this.modal = document.getElementById(`${id("module")}`);
    }
  }

  // Method to check if the click event occurred outside the modal
  private closeIfOutsideModal(event: MouseEvent) {
    if (
      this.modal &&
      event.target !== this.modal &&
      !this.modal.contains(event.target as Node)
    ) {
      // If the click is outside the modal, close it
      this.close();
    }
  }

  private handleEventListener = (account: string, destination: string) => {
    document.addEventListener("click", this.closeIfOutsideModal.bind(this));

    const btn1 = document.getElementById(`${id("onRefresh")}`);
    if (btn1)
      btn1.addEventListener("click", () => {
        this.emitter("refresh");
      });

    const btn2 = document.getElementById(`${id("onClose")}`);
    if (btn2)
      btn2.addEventListener("click", () => {
        this.close();
      });

    const btn3 = document.getElementById(`${id("onLink")}`);
    if (btn3)
      btn3.addEventListener("click", () => {
        window.open("https://solve3.org", "_blank");
      });

    const brandName = document.getElementById(`${id("brandName")}`);
    if (brandName)
      brandName.addEventListener("click", () => {
        window.open("https://solve3.org", "_blank");
      });

    const address0 = document.getElementById(`${id("address-0")}`);
    if (address0)
      address0.addEventListener("click", () => {
        navigator.clipboard.writeText(account);
      });

    const address1 = document.getElementById(`${id("address-1")}`);
    if (address1)
      address1.addEventListener("click", () => {
        navigator.clipboard.writeText(destination);
      });
  };
}
