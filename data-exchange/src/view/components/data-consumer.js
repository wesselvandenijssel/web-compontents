import { LitElement, html } from "lit";

export default class DataConsumer extends LitElement {
  static get properties() {
    return {
      data: { type: Object },
    };
  }

  constructor() {
    super();
    this.data = {};
  }

  changeData() {
    this.data = {
      message: "Data changed from Data Consumer!",
      timestamp: new Date(),
      author: "Consumer",
    };
  }

  render() {
    console.log(JSON.stringify(this.data));
    return html`
      <section>
        <h2>Data Consumer</h2>
        ${JSON.stringify(this.data) === "{}"
          ? html`<p>No data received yet.</p>`
          : html`
            <p>Received Data:
              <p>Message: ${this.data.message}</p>
              <p>Timestamp (
                type: ${typeof this.data.timestamp}, 
                Date Object: ${this.data.timestamp instanceof Date}):
                ${this.data.timestamp.toLocaleDateString("nl-NL")}
              </p>
              <p>Author: ${this.data.author}</p>
            </p>
            `}
        <button @click=${this.changeData}>Change Data</button>
      </section>
    `;
  }
}

customElements.define("data-consumer", DataConsumer);
