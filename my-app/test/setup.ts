import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";

// Vitest runs without globals, so Testing Library can't register its own
// cleanup; unmount each test's render here.
afterEach(cleanup);

// jsdom doesn't implement modal dialogs. These stand-ins mirror the browser
// behavior our components rely on: showModal() opens the dialog, close()
// closes it and fires "close", and Escape fires a cancelable "cancel" event
// before closing the dialog.
if (!HTMLDialogElement.prototype.showModal) {
  HTMLDialogElement.prototype.showModal = function (this: HTMLDialogElement) {
    this.setAttribute("open", "");
  };

  HTMLDialogElement.prototype.close = function (this: HTMLDialogElement) {
    if (!this.hasAttribute("open")) return;
    this.removeAttribute("open");
    this.dispatchEvent(new Event("close"));
  };

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;
    const dialog = document.querySelector<HTMLDialogElement>("dialog[open]");
    if (!dialog) return;
    const cancel = new Event("cancel", { cancelable: true });
    if (dialog.dispatchEvent(cancel)) dialog.close();
  });
}
