import "../components/hello-lit.js";
import "../components/hello-styles.js";
import "../components/lit-attributes.js";
import "../components/lit-events";
import "../components/lit-render.js";
import "../components/col-helper";

const attrBtn = document.querySelector("#attrBtn");
const attrInput = document.querySelector("#attrInput");
const litRender = document.querySelector("lit-render");

attrBtn.addEventListener("click", () => {
  const attrValue = attrInput.value;
  litRender.setAttribute("tag-attribute", attrValue);
});

console.log("Home Page loaded");
