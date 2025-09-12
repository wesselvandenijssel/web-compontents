import { LitElement, html, css } from "lit";

export class EvaluationForm extends LitElement {
  constructor() {
    super();
    this.data = {};
  }

  static styles = css`
    form {
      display: grid;
      grid-template-columns: 1fr;
      gap: 1rem;
      margin: 1rem;
      justify-items: center;
      align-items: center;
    }

    fieldset {
      border: 1px solid gray;
      display: grid;
      width: 100%;
    }

    .cursist-info {
      grid-template-columns: auto 1fr;
    }

    .evaluation-topics {
      grid-template-columns: auto auto 1fr;
      align-items: center;
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

    input[type="number"] {
      width: 2rem;
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

    button {
      margin: 0rem 1rem;
      padding: 0.5rem 2rem;
      background-color: green;
      color: white;
      border: none;
      border-radius: 0.5rem;
      font-size: 1.5rem;
    }
  `;

  submitHandler(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    this.data = Object.fromEntries(formData.entries());
    console.log(this.data);
  }

  render() {
    return html`
      <h1>Evaluation Form</h1>
      <form @submit=${this.submitHandler}>
        <fieldset class="cursist-info">
          <legend>Cursist Information</legend>
          <label for="name">Name:</label>
          <input type="text" id="name" name="name" required />

          <label for="address">Address:</label>
          <input type="text" id="address" name="address" required />

          <label for="phone">Phone:</label>
          <input type="tel" id="phone" name="phone" required />

          <label for="email">Email:</label>
          <input type="email" id="email" name="email" required />
        </fieldset>

        <fieldset class="evaluation-topics">
          <legend>Topics</legend>
          <label for="html-value">HTML:</label>
          <input
            type="number"
            id="html-value"
            name="html"
            min="0"
            max="10"
            required
          />
          <div>
            <input
              type="range"
              id="html-slider"
              name="html"
              list="values"
              aria-label="html-slider"
              min="0"
              max="10"
              required
            />
            <datalist id="values">
              <option value="0" label="0"></option>
              <option value="1" label="1"></option>
              <option value="2" label="2"></option>
              <option value="3" label="3"></option>
              <option value="4" label="4"></option>
              <option value="5" label="5"></option>
              <option value="6" label="6"></option>
              <option value="7" label="7"></option>
              <option value="8" label="8"></option>
              <option value="9" label="9"></option>
              <option value="10" label="10"></option>
            </datalist>
          </div>

          <label for="css-value">CSS:</label>
          <input
            type="number"
            id="css-value"
            name="css"
            min="0"
            max="10"
            required
          />
          <div>
            <input
              type="range"
              id="css-slider"
              name="css"
              list="values"
              aria-label="css-slider"
              min="0"
              max="10"
              required
            />
            <datalist id="values">
              <option value="0" label="0"></option>
              <option value="1" label="1"></option>
              <option value="2" label="2"></option>
              <option value="3" label="3"></option>
              <option value="4" label="4"></option>
              <option value="5" label="5"></option>
              <option value="6" label="6"></option>
              <option value="7" label="7"></option>
              <option value="8" label="8"></option>
              <option value="9" label="9"></option>
              <option value="10" label="10"></option>
            </datalist>
          </div>

          <label for="js-value">JavaScript:</label>
          <input
            type="number"
            id="js-value"
            name="js"
            min="0"
            max="10"
            required
          />
          <div>
            <input
              type="range"
              id="js-slider"
              name="js"
              list="values"
              aria-label="js-slider"
              min="0"
              max="10"
              required
            />
            <datalist id="values">
              <option value="0" label="0"></option>
              <option value="1" label="1"></option>
              <option value="2" label="2"></option>
              <option value="3" label="3"></option>
              <option value="4" label="4"></option>
              <option value="5" label="5"></option>
              <option value="6" label="6"></option>
              <option value="7" label="7"></option>
              <option value="8" label="8"></option>
              <option value="9" label="9"></option>
              <option value="10" label="10"></option>
            </datalist>
          </div>
        </fieldset>

        <button type="submit">Save</button>
      </form>
    `;
  }
}

customElements.define("evaluation-form", EvaluationForm);
