import { LitElement, html, css } from "lit";

export class LitAttributes extends LitElement {
  static styles = css`
    :host {
      display: block;
      padding: 1rem;
      border: 1px solid #ccc;
      border-radius: 4px;
      margin-top: 1rem;
    }
  `;

  static properties = {
    name: { type: String },
    customerId: {
      type: Number,
      attribute: "customer-id",
    },
    dateOfBirth: {
      type: Date,
      attribute: "date-of-birth",
      converter: {
        fromAttribute(value) {
          return new Date(value);
        },
      },
    },
    online: { type: Boolean },
  };

  render() {
    return html`
      <h1>Lit Attributes</h1>
      <p>
        Below you see a list of attributes that were passed to this component:
      </p>
      <ul>
        <li>${this.name} - ${typeof this.name}</li>
        <li>${this.customerId} - ${typeof this.customerId}</li>
        <li>${this.dateOfBirth} - ${this.dateOfBirth instanceof Date}</li>
        <li>${this.online} - ${typeof this.online}</li>
      </ul>
    `;
  }

  constructor() {
    super();
    this.online = false;
  }
}

customElements.define("lit-attributes", LitAttributes);
