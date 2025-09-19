import { rxJSDataService } from "../../service/rxjs-data-service";

import { LitElement, html } from "lit";

class RxJSDataObserver extends LitElement {
  static properties = {
    data: { type: Array },
  };

  constructor() {
    super();
    this.data = [];
    this.observer = {
      next: (data) => {
        this.data = data;
      },
      error: (err) => {
        console.error("Error:", err);
      },
      complete: () => {
        console.log("Completed");
      },
    };
  }

  connectedCallback() {
    super.connectedCallback();
    this.subscription = rxJSDataService.serviceData$.subscribe(this.observer);
  }
  disconnectedCallback() {
    this.subscription.unsubscribe();
    super.disconnectedCallback();
  }
  render() {
    return html`
      <div>
        <h2>RxJS Data Observer</h2>
        <ul>
          ${this.data.map((item) => html`<li>${item}</li>`)}
        </ul>
      </div>
    `;
  }
}
customElements.define("rxjs-data-observer", RxJSDataObserver);
