import { LitElement, html } from "lit";

export class MyComponent extends LitElement {
  static get properties() {
    return {
      value: { type: String },
    };
  }

  constructor() {
    super();
    this.value = "Suske";
  }

  _onInput(event) {
    this.value = event.target.value;
  }

  render() {
    return html`
      <label for="name">Name:</label>
      <input
        type="text"
        id="name"
        name="name"
        value="${this.value}"
        @input="${this._onInput}"
      />

      <p>current value: ${this.value}</p>
    `;
  }
}

customElements.define("my-component", MyComponent);
