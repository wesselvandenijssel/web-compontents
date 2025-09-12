import { LitElement, html, css } from "lit";

export class CountdownTimer extends LitElement {
  static properties = {
    initialTime: { type: Number },
    currentTime: { type: Number, state: true },
    isRunning: { type: Boolean, state: true },
    isFinished: { type: Boolean, state: true },
    inputValue: { type: String, state: true },
  };

  static styles = css`
    :host {
      display: block;
      padding: 20px;
      margin: 20px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      border-radius: 15px;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
      color: white;
      font-family: "Arial", sans-serif;
      max-width: 400px;
      text-align: center;
    }

    .container {
      display: flex;
      flex-direction: column;
      gap: 15px;
      align-items: center;
    }

    .input-section {
      display: flex;
      gap: 10px;
      align-items: center;
      flex-wrap: wrap;
      justify-content: center;
    }

    input {
      padding: 10px;
      border: 2px solid rgba(255, 255, 255, 0.3);
      border-radius: 8px;
      background: rgba(255, 255, 255, 0.1);
      color: white;
      font-size: 16px;
      width: 100px;
      text-align: center;
    }

    input::placeholder {
      color: rgba(255, 255, 255, 0.7);
    }

    input:focus {
      outline: none;
      border-color: rgba(255, 255, 255, 0.6);
      background: rgba(255, 255, 255, 0.2);
    }

    button {
      padding: 10px 20px;
      border: none;
      border-radius: 8px;
      background: rgba(255, 255, 255, 0.2);
      color: white;
      font-size: 16px;
      font-weight: bold;
      cursor: pointer;
      transition: all 0.3s ease;
      border: 2px solid transparent;
    }

    button:hover {
      background: rgba(255, 255, 255, 0.3);
      border-color: rgba(255, 255, 255, 0.4);
      transform: translateY(-2px);
    }

    button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
      transform: none;
    }

    .timer-display {
      font-size: 48px;
      font-weight: bold;
      margin: 20px 0;
      text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
      min-height: 60px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .message {
      font-size: 24px;
      font-weight: bold;
      color: #ffeb3b;
      text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
      animation: pulse 1s infinite;
    }

    @keyframes pulse {
      0% {
        transform: scale(1);
      }
      50% {
        transform: scale(1.05);
      }
      100% {
        transform: scale(1);
      }
    }

    .label {
      font-size: 18px;
      margin-bottom: 5px;
      opacity: 0.9;
    }

    .reset-button {
      background: rgba(255, 87, 87, 0.8);
      margin-top: 10px;
    }

    .reset-button:hover {
      background: rgba(255, 87, 87, 1);
    }
  `;

  constructor() {
    super();
    this.initialTime = 10;
    this.currentTime = 0;
    this.isRunning = false;
    this.isFinished = false;
    this.inputValue = "10";
    this.intervalId = null;
  }

  connectedCallback() {
    super.connectedCallback();
    console.log("CountdownTimer component connected to the DOM");
    if (this.currentTime === 0) {
      this.currentTime = this.initialTime;
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    console.log("CountdownTimer component disconnected from the DOM");
    this.stopTimer();
  }

  startTimer() {
    if (this.isRunning) return;

    const timeValue = parseInt(this.inputValue);
    if (isNaN(timeValue) || timeValue <= 0) {
      alert("Please enter a valid positive number");
      return;
    }

    this.currentTime = timeValue;
    this.isRunning = true;
    this.isFinished = false;

    this.intervalId = setInterval(() => {
      this.currentTime--;

      if (this.currentTime <= 0) {
        this.stopTimer();
        this.isFinished = true;
        this.dispatchEvent(
          new CustomEvent("timer-finished", {
            detail: { message: "Time's up!" },
            bubbles: true,
            composed: true,
          }),
        );
      }
    }, 1000);

    // Dispatch timer started event
    this.dispatchEvent(
      new CustomEvent("timer-started", {
        detail: { duration: timeValue },
        bubbles: true,
        composed: true,
      }),
    );
  }

  stopTimer() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    this.isRunning = false;
  }

  resetTimer() {
    this.stopTimer();
    this.currentTime = 0;
    this.isFinished = false;
    this.inputValue = "10";
  }

  handleInputChange(event) {
    this.inputValue = event.target.value;
  }

  formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
  }

  render() {
    return html`
      <div class="container">
        <div class="label">Countdown Timer</div>

        <div class="input-section">
          <input
            type="number"
            min="1"
            max="3600"
            .value=${this.inputValue}
            @input=${this.handleInputChange}
            ?disabled=${this.isRunning}
            placeholder="Seconds"
          />
          <button @click=${this.startTimer} ?disabled=${this.isRunning}>
            Start Timer
          </button>
        </div>

        <div class="timer-display">
          ${this.isFinished
            ? html`<div class="message">Time's up!</div>`
            : html`${this.formatTime(this.currentTime)}`}
        </div>

        ${this.isRunning || this.isFinished
          ? html`
              <button class="reset-button" @click=${this.resetTimer}>
                Reset
              </button>
            `
          : ""}
      </div>
    `;
  }
}

customElements.define("countdown-timer", CountdownTimer);
