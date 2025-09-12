import { LitElement, html, css } from "lit";
import "./fieldset-cursist-info";
import "./number-range-input";

export class FieldsetCursistInfo extends LitElement {
  #internals;

  static formAssociated = true;

  static styles = css`
    :host {
      width: 100%;
      justify-items: center;
    }

    fieldset {
      border: 1px solid gray;
      display: grid;
      width: 100%;
    }

    .cursist-info {
      grid-template-columns: auto 1fr;
    }

    legend {
      font-weight: bold;
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

    input:required {
      background-color: lightgoldenrodyellow;
    }

    input:invalid {
      border-color: red;
      border-width: 0.1em;
    }
  `;

  static properties = {
    required: { type: Boolean },
    value: { type: String, reflect: true },
  };

  constructor() {
    super();
    this.#internals = this.attachInternals();

    this.required = false;
    this.value = "";
  }

  setFieldsetValue() {
    const fieldsetObject = this.fieldsetFields.reduce((acc, field) => {
      acc[field.name] = field.element.value;
      return acc;
    }, {});

    this.value = JSON.stringify(fieldsetObject);

    this.#internals.setFormValue(this.value);
    this.setFieldsetValidity();
  }

  firstUpdated() {
    this.fieldsetFields = [
      { name: "name", element: this.shadowRoot.querySelector("#name") },
      { name: "address", element: this.shadowRoot.querySelector("#address") },
      { name: "phone", element: this.shadowRoot.querySelector("#phone") },
      { name: "email", element: this.shadowRoot.querySelector("#email") },
    ];

    this.setFieldsetValue();
  }

  setFieldsetValidity() {
    const isValid = this.fieldsetFields.every((field) =>
      field.element.checkValidity(),
    );
    const firstInvalidField = this.fieldsetFields.find(
      (field) => !field.element.checkValidity(),
    );

    const message = firstInvalidField
      ? firstInvalidField.element.validationMessage
      : "";
    const focus = firstInvalidField
      ? firstInvalidField.element
      : this.shadowRoot.querySelector("fieldset");

    this.#internals.setValidity(
      isValid ? {} : { customError: true },
      message,
      focus,
    );
  }

  submitHandler(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    this.data = Object.fromEntries(formData.entries());
    this.data.cursistInfo = JSON.parse(this.data.cursistInfo);
    console.log(this.data);
  }

  render() {
    return html`
      <h1>Evaluation Form</h1>
      <form @submit=${this.submitHandler}>
        <fieldset-cursist-info
          name="cursistInfo"
          required
        ></fieldset-cursist-info>
        <fieldset class="evaluation-topics">
          <legend>Topics</legend>
          <number-range-input
            name="html"
            label="HTML"
            min="0"
            max="10"
            required
          ></number-range-input>
          <number-range-input
            name="css"
            label="CSS"
            min="0"
            max="10"
            required
          ></number-range-input>
          <number-range-input
            name="js"
            label="JavaScript"
            min="0"
            max="10"
            required
          ></number-range-input>
        </fieldset>
        <button type="submit">Save</button>
      </form>
    `;
  }
}

customElements.define("fieldset-cursist-info", FieldsetCursistInfo);
