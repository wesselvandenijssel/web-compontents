import { LitElement, html } from "lit";

export class EventConsumer extends LitElement {
  static properties = {
    clickEventData: { type: String },
    submitEventData: { type: String },
    customEventData: { type: String },
  };

  constructor() {
    super();
    this.submitEventData = null;
    this.clickEventData = null;
    this.customEventData = null;
    this.clickHandler = this.clickHandler.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
    this.customEventHandler = this.customEventHandler.bind(this);
    this.scope = document;
  }

  connectedCallback() {
    super.connectedCallback();
    this.scope.addEventListener("click", this.clickHandler);
    this.scope.addEventListener("submit", this.submitHandler);
    this.scope.addEventListener("form-submitted", this.customEventHandler);
  }

  disconnectedCallback() {
    this.scope.removeEventListener("click", this.clickHandler);
    this.scope.removeEventListener("submit", this.submitHandler);
    this.scope.removeEventListener("form-submitted", this.customEventHandler);
    super.disconnectedCallback();
  }

  clickHandler(event) {
    console.log("Click event consumed!", event);

    // Use composedPath to get the target inside the shadow DOM
    // eslint-disable-next-line prefer-destructuring
    const target = event.composedPath()[0];

    this.clickEventData = JSON.stringify({
      type: event.type,
      bubbles: event.bubbles,
      cancelable: event.cancelable,
      composed: event.composed,
      detail: event.detail,
      target: target.tagName,
      textContent: target.textContent,
    });
  }

  submitHandler(event) {
    event.preventDefault();

    // Extract relevant properties from the event
    this.submitEventData = JSON.stringify({
      type: event.type,
      bubbles: event.bubbles,
      cancelable: event.cancelable,
      composed: event.composed,
      detail: event.detail,
      target: event.target.tagName,
      submitter: event.submitter?.tagName || "unknown",
    });

    const formData = new FormData(event.target);
    this.data = Object.fromEntries(formData.entries());

    const customEvent = new CustomEvent("form-submitted", {
      detail: this.data,
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(customEvent);

    console.log("Form submitted event!", event);
  }

  customEventHandler(event) {
    console.log("Custom event consumed!", event);

    // Use composedPath to get the target inside the shadow DOM
    // eslint-disable-next-line prefer-destructuring
    const target = event.composedPath()[0];

    this.customEventData = JSON.stringify({
      type: event.type,
      bubbles: event.bubbles,
      cancelable: event.cancelable,
      composed: event.composed,
      detail: event.detail,
      target: target.tagName,
      textContent: target.textContent,
    });
  }

  render() {
    return html`
      <fieldset @form-submitted="${this.customEventHandler}">
        <slot></slot>
        <legend>Event Consumer</legend>
        <p>Click event data: ${this.clickEventData || "none"}</p>
        <p>Submit event data: ${this.submitEventData || "none"}</p>
        <p>Custom event data: ${this.customEventData || "none"}</p>
      </fieldset>
    `;
  }
}

customElements.define("event-consumer", EventConsumer);
