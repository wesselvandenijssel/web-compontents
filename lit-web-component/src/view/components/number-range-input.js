import { LitElement, html, css } from "lit";

export class NumberRangeInput extends LitElement {
  #internals;
  static formAssociated = true;

  static styles = css`
    :host {
      display: grid;
      grid-template-columns: 1.5fr auto 10fr;
      align-items: center;
      width: 100%;
    }

    label {
      display: block;
      margin: 0.5rem;
      padding: 0.5rem;
    }

    input {
      margin: 0.5rem;
      padding: 0.5rem;
    }

    input[type="number"] {
      width: 3rem;
      font-size: 1.5rem;
    }

    input[type="range"] {
      width: 50%;
    }

    datalist {
      display: flex;
      margin: 0 0.5rem;
      padding: 0 0.5rem;
      justify-content: space-between;
      width: 50%;
    }
  `;

  static properties = {
    label: { type: String },
    min: { type: Number },
    max: { type: Number },
    required: { type: Boolean },
    value: { type: Number, reflect: true },
  };

  constructor() {
    super();
    this.#internals = this.attachInternals();

    this.required = false;
    this.min = 0;
    this.max = 10;
    this.step = 1;
    this.value = this.min;
  }

  setValue(value) {
    this.value = value;
    this.#internals.setFormValue(this.value);

    const numberInput = this.shadowRoot.querySelector("#number-input");

    const validity = numberInput.checkValidity()
      ? {}
      : {
          rangeUnderflow: this.value < this.min,
          rangeOverflow: this.value > this.max,
        };

    this.#internals.setValidity(
      validity, // Validation flags
      numberInput.validationMessage, // Browser-generated message
      numberInput, // Element to focus on
    );
  }

  firstUpdated() {
    this.shadowRoot.querySelector("#number-input").value = this.value;
    this.shadowRoot.querySelector("#range-input").value = this.value;
    this.setValue(this.value);
  }

  numberInputHandler(event) {
    const isValid = event.target.checkValidity();
    if (!isValid) {
      event.target.reportValidity();
    }

    this.setValue(event.target.value);
    this.shadowRoot.querySelector("#range-input").value = this.value;
  }

  rangeInputHandler(event) {
    this.setValue(event.target.value);
    this.shadowRoot.querySelector("#number-input").value = this.value;
  }

  render() {
    return html`
      <label for="number-input">${this.label}:</label>
      <input
        type="number"
        id="number-input"
        name="number-input"
        min="${this.min}"
        max="${this.max}"
        ?required="${this.required}"
        @input=${this.numberInputHandler}
      />
      <div>
        <input
          type="range"
          id="range-input"
          name="range-input"
          list="values"
          aria-label="${this.label}"
          min="${this.min}"
          max="${this.max}"
          ?required="${this.required}"
          @input=${this.rangeInputHandler}
        />
        <datalist id="values">
          ${Array.from({ length: this.max + this.step }).map(
            (_, index) => html`
              <option value="${index}" label="${index}"></option>
            `,
          )}
        </datalist>
      </div>
    `;
  }
}

customElements.define("number-range-input", NumberRangeInput);
