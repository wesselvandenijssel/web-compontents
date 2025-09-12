import { LitElement, html, css } from "lit";
import { when } from "lit/directives/when.js";
import { ifDefined } from "lit/directives/if-defined.js";
import "@material/web/switch/switch";
import "./circle-of-life";

export class ColHelper extends LitElement {
  static styles = css`
    nav {
      width: 50%;
      margin: 1rem;
      padding: 1rem;
      border: 1px solid gray;
      display: grid;
      align-items: center;
      vertical-align: middle;
      grid-template-columns: 1fr auto;
      gap: 1rem;
    }
  `;

  static properties = {
    showCol: { type: Boolean },
    counterValue: { type: Number, state: true },
  };

  constructor() {
    super();
    this.showCol = false;
    this.counterValue = null;
  }

  switchUpdateHandler(event) {
    this.showCol = event.target.selected;
    console.log(`------------------------------------`);
  }

  updateCounterAttribute() {
    const counterValue = this.shadowRoot.querySelector("#colCounter").value;
    if (counterValue) {
      this.counterValue = counterValue;
    } else {
      this.counterValue = null;
    }
  }

  render() {
    return html`
      <nav>
        <label for="colSwitch">
          Remove/Add the Circle of Life component to the DOM
        </label>
        <md-switch
          id="colSwitch"
          @input=${this.switchUpdateHandler}
        ></md-switch>
        <input type="number" id="colCounter" />
        <button @click=${this.updateCounterAttribute}>Set Value</button>
      </nav>

      ${when(
        this.showCol,
        () =>
          html`<circle-of-life
            counter=${ifDefined(this.counterValue)}
          ></circle-of-life>`,
        () => html``,
      )}
    `;
  }
}

customElements.define("col-helper", ColHelper);
