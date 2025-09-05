export class ShadowDomCard extends HTMLElement {
  constructor() {
    super()

    // Create shadow root
    this.attachShadow({ mode: 'open' })

    this.createCardStructure()
  }

  createCardStructure() {
    // Create the card structure
    const section = document.createElement('section')

    const title = document.createElement('h1')
    title.textContent = 'Card Title'

    const content = document.createElement('p')
    content.textContent = 'Card Content'

    section.appendChild(title)
    section.appendChild(content)

    this.shadowRoot.appendChild(section)
  }
}

customElements.define('shadow-dom-card', ShadowDomCard)
