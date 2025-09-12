import { LitElement, html, css } from "lit";

export class HelloLit extends LitElement {
  static styles = css`
    h1 {
      color: blue;
    }
  `;

  constructor() {
    super();
    this.message = "Lit";
  }

  render() {
    return html`<h1>Hello ${this.message}!</h1>`;
  }
}

customElements.define("hello-lit", HelloLit);
