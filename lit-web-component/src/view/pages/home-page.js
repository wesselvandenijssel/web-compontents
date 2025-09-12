import "../components/hello-lit.js";
import "../components/hello-styles.js";
import "../components/lit-attributes.js";
import "../components/lit-events";
import "../components/lit-render.js";
import "../components/col-helper";
import "../components/evaluation-form";
import "../components/countdown-timer.js";

const attrBtn = document.querySelector("#attrBtn");
const attrInput = document.querySelector("#attrInput");
const litRender = document.querySelector("lit-render");

attrBtn.addEventListener("click", () => {
  const attrValue = attrInput.value;
  litRender.setAttribute("tag-attribute", attrValue);
});

// Add event listeners for countdown timer
document.addEventListener("timer-started", (event) => {
  console.log("Timer started with duration:", event.detail.duration, "seconds");
});

document.addEventListener("timer-finished", (event) => {
  console.log("Timer finished:", event.detail.message);
  // You could add a notification or sound here
});

console.log("Home Page loaded");
