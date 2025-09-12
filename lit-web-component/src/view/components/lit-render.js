import { LitElement, html, css } from "lit";

export class LitRender extends LitElement {
  #privateProperty;

  static properties = {
    tagAttribute: { type: String, attribute: "tag-attribute", reflect: true },
    reactiveProperty: { type: String, attribute: false },
    requiredInput: { type: Boolean, attribute: false },
    arrayList: { type: Array, attribute: false },
  };

  static styles = css`
    fieldset {
      display: grid;
      gap: 1rem;
      grid-template-columns: 1fr 1fr;
      align-content: center;
      align-items: stretch;
    }

    input output {
      border: 1px solid #333;
      padding: 1rem;
      display: grid;
      align-items: center;
    }

    input[required] {
      border: 2px solid orange;
    }

    .required {
      font-weight: bold;
      color: orangered;
    }

    legend {
      font-weight: bold;
    }

    label {
      display: inline-block;
      margin-bottom: 0.5rem;
    }

    button[type="submit"] {
      margin: 1rem;
      padding: 1rem;
      background-color: yellowgreen;
      color: black;
      border: none;
      border-radius: 0.5rem;
      cursor: pointer;
    }
  `;

  constructor() {
    super();
    this.#privateProperty = "initial value";
    this.tagAttribute = "initial value";
    this.reactiveProperty = "initial value";
    this.requiredInput = false;
    this.arrayList = [];
  }

  // eslint-disable-next-line max-lines-per-function
  render() {
    return html`
      <h1>Lit Render</h1>

      <form>
        ...

        <fieldset>
          <legend>Tag Attribute</legend>

          <fieldset class="input">
            <legend>Input</legend>
            <slot></slot>
          </fieldset>
          <fieldset class="output">
            <legend>Output</legend>
            <p>${this.tagAttribute}</p>
          </fieldset>
        </fieldset>

        <button type="submit">Submit Exercise</button>
      </form>
    `;
  }

  updatedRequired(event) {
    this.requiredInput = event.target.id === "fields_required";
    console.log(this.requiredInput);
  }

  updateArrayList() {
    const arrayItem = this.shadowRoot.querySelector("#arrayItem");
    this.arrayList = [...this.arrayList, arrayItem.value];
    arrayItem.value = "";
    console.log(this.arrayList);
  }
}

customElements.define("lit-render", LitRender);
