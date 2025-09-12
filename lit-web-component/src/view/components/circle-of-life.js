import { LitElement, html } from "lit";

const INCREMENT_VALUE = 1;
const ONE_SECOND = 1000;

export class CircleOfLife extends LitElement {
  static properties = {
    counter: {
      type: Number,
      hasChanged: (newValue, oldValue) => {
        console.info(`counter hasChanged ${oldValue} => ${newValue}`);
        return newValue !== oldValue;
      },
    },
  };

  constructor() {
    super();
    console.group("constructor");
    this.counter = 0;
    console.log(`counter=${this.counter}`);
    console.groupEnd();
  }

  connectedCallback() {
    super.connectedCallback();

    setTimeout(() => {
      console.group("setTimeout");
      this.counter += INCREMENT_VALUE;
      console.log(`counter=${this.counter}`);
      console.log(
        `output: ${this.shadowRoot.querySelector("output").textContent}`,
      );
      console.groupEnd();
    }, ONE_SECOND);

    console.group("connectedCallback");
    this.counter += INCREMENT_VALUE;
    console.log(`counter=${this.counter}`);
    console.log(
      `output: ${this.shadowRoot.querySelector("output").textContent}`,
    );
    console.groupEnd();
  }

  disconnectedCallback() {
    console.group("disconnectedCallback");
    this.counter += INCREMENT_VALUE;
    console.log(`counter=${this.counter}`);
    console.log(
      `output: ${this.shadowRoot.querySelector("output").textContent}`,
    );
    console.groupEnd();
    super.disconnectedCallback();
  }

  firstUpdated() {
    console.group("firstUpdated");
    this.counter += INCREMENT_VALUE;
    console.log(`counter=${this.counter}`);
    console.log(
      `output: ${this.shadowRoot.querySelector("output").textContent}`,
    );
    console.groupEnd();
  }

  render() {
    console.group("render");
    this.counter += INCREMENT_VALUE;
    console.log(`counter=${this.counter}`);
    console.groupEnd();
    return html`
      <h1>Circle of Life</h1>
      <p>Open the console to see the lifecycle callbacks</p>
      <p>Counter value: <output>${this.counter}</output></p>
    `;
  }
}

customElements.define("circle-of-life", CircleOfLife);
