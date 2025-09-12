/* eslint-disable max-lines-per-function */
import { LitElement, html, css } from "lit";

export class LitEvents extends LitElement {
  static styles = css`
    #keylistener {
      width: 10rem;
      height: 10rem;
      background-color: lightgray;
      margin: 1rem;
      padding: 0.5rem;
      text-align: center;
      display: grid;
      place-items: center;
    }

    form {
      display: grid;
      padding: 1rem;
      border: 1px solid #ccc;
      border-radius: 0.5rem;
      background-color: #f9f9f9;
    }

    fieldset {
      border: solid 1px #ccc;
      padding: 1rem;
      margin: 0;
    }

    label {
      display: grid;
      font-weight: bold;
    }

    input,
    select {
      border: 1px solid #ccc;
      border-radius: 0.25rem;
      margin: 0.25rem 0 1rem 0;
      padding: 0.25rem;
    }

    .phone-type {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
    }

    .gender-options {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
      gap: 1rem;
    }

    .gender-options label {
      display: grid;
      grid-template-columns: auto 1fr;
      align-items: center;
      padding-left: 1rem;
    }

    .gender-options input {
      margin-right: 0.5rem;
    }

    button {
      margin: 0.5rem;
      padding: 0.5rem;
      background-color: lightseagreen;
      border-radius: 0.5rem;
      color: white;
      cursor: pointer;
    }

    button[type="submit"] {
      background-color: lightgreen;
      color: black;
    }
  `;

  render() {
    return html`
      <h1>Lit Events</h1>
      <form @submit=${this.submitHandler}>
        <label for="student-name">Name:</label>
        <input
          type="text"
          id="student-name"
          name="student-name"
          @input=${this.inputHandler}
        />

        <div class="phone-type">
          <label for="phone">Phone:</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            @input=${this.inputHandler}
          />
          <label for="phone-type">Phone Type:</label>
          <select
            id="phone-type"
            name="phone-type"
            @change=${this.inputHandler}
          >
            <option value="home">Home</option>
            <option value="work">Work</option>
          </select>
        </div>

        <fieldset>
          <legend>Gender</legend>
          <div class="gender-options">
            <label for="male"
              ><input
                type="radio"
                id="male"
                name="gender"
                value="m"
                @change=${this.inputHandler}
              />Male</label
            >
            <label for="female"
              ><input
                type="radio"
                id="female"
                name="gender"
                value="f"
                @change=${this.inputHandler}
              />Female</label
            >
            <label for="non-binary"
              ><input
                type="radio"
                id="non-binary"
                name="gender"
                value="n"
                @change=${this.inputHandler}
              />Non-binary</label
            >
            <label for="other"
              ><input
                type="radio"
                id="other"
                name="gender"
                value="o"
                @change=${this.inputHandler}
              />Other</label
            >
            <label for="prefer-not-to-say"
              ><input
                type="radio"
                id="prefer-not-to-say"
                name="gender"
                value="-"
                @change=${this.inputHandler}
              />Prefer not to say</label
            >
          </div>
        </fieldset>

        <button type="submit">Submit</button>
      </form>

      <div
        id="keylistener"
        tabindex="0"
        @keydown=${this.keydownHandler}
        @focus=${this.focusHandler}
      >
        Use the tab key to focus on this element and then press any key.
      </div>

      <button @click=${this.buttonOneHandler}>Button 1</button>
      <button @click=${this.buttonTwoHandler}>Button 2</button>
    `;
  }

  inputHandler(event) {
    console.log("Input value: ", event.target.value);
  }

  submitHandler(event) {
    event.preventDefault();
    console.log("Form submitted");
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    console.log(data);
  }
}

customElements.define("lit-events", LitEvents);
