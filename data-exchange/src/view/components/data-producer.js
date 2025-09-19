import { LitElement, html } from "lit";

export class EventProducer extends LitElement {
  static properties = {
    clickEventData: { type: String },
    submitEventData: { type: String },
    data: { type: Object },
  };

  constructor() {
    super();
    this.submitEventData = null;
    this.clickEventData = null;
    this.data = {};
    this.clickHandler = this.clickHandler.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener("click", this.clickHandler);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener("click", this.clickHandler);
  }

  clickHandler(event) {
    // Extract relevant properties from the event
    this.clickEventData = JSON.stringify({
      type: event.type,
      bubbles: event.bubbles,
      cancelable: event.cancelable,
      composed: event.composed,
      detail: event.detail,
      target: event.target.tagName,
    });

    console.log("Event produced!", event);
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

    console.log("Form submitted event!", event);
  }

  render() {
    return html`
      <fieldset>
        <legend>Event Producer</legend>

        <form @submit=${this.submitHandler}>
          <label for="message">Message:</label>
          <input type="text" id="message" name="message" />

          <button type="submit">Send message</button>
        </form>
        <p>Click event: ${this.clickEventData}</p>
        <p>Submit event: ${this.submitEventData}</p>
      </fieldset>
    `;
  }
}

customElements.define("event-producer", EventProducer);
