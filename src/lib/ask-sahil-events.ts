// Minimal pub/sub so the Navbar / hero CTAs can open the Ask Sahil widget
// without lifting state into a context provider.
export const ASK_SAHIL_OPEN_EVENT = "ask-sahil:open";

export function openAskSahil() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent(ASK_SAHIL_OPEN_EVENT));
  }
}
