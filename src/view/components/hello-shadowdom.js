export class HelloShadowDOM extends HTMLElement {
  constructor() {
    super()
    this.shadowDOM = this.attachShadow({ mode: 'closed' })

    const styleElement = document.createElement('style')
    styleElement.textContent = `
      h1 {
        background-color: var(--h1-background-color, green);
        color: white;
        padding: 1rem;
      }
    `
    this.shadowDOM.appendChild(styleElement)

    const h1Element = document.createElement('h1')
    h1Element.textContent = 'Hello Shadow DOM'
    this.shadowDOM.appendChild(h1Element)
  }
}

customElements.define('hello-shadowdom', HelloShadowDOM)
