export class DynamicCard extends HTMLElement {
  constructor() {
    super()

    // Create shadow root
    this.attachShadow({ mode: 'open' })

    this.render()
  }

  static get observedAttributes() {
    return ['title', 'content']
  }

  attributeChangedCallback() {
    this.render()
  }

  render() {
    // Clear previous content
    this.shadowRoot.innerHTML = ''

    this.addStyles()
    this.createContent()
  }

  createContent() {
    // Get attribute values with defaults
    const title = this.getAttribute('title') || 'Default Title'
    const content = this.getAttribute('content') || 'Default content'

    // Create the card structure
    const section = document.createElement('section')

    const titleElement = document.createElement('h1')
    titleElement.textContent = title

    const contentElement = document.createElement('p')
    contentElement.textContent = content

    section.appendChild(titleElement)
    section.appendChild(contentElement)

    this.shadowRoot.appendChild(section)
  }

  addStyles() {
    // Add styles
    const style = document.createElement('style')
    style.textContent = `
      section {
        border: 2px solid #007acc;
        border-radius: 12px;
        padding: 20px;
        margin: 15px 0;
        box-shadow: 0 6px 12px rgba(0, 122, 204, 0.15);
        background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
        max-width: 450px;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        transition: transform 0.2s ease, box-shadow 0.2s ease;
      }
      
      section:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 16px rgba(0, 122, 204, 0.2);
      }
      
      h1 {
        margin: 0 0 15px 0;
        color: #007acc;
        font-size: 1.6em;
        font-weight: 600;
        border-bottom: 2px solid #007acc;
        padding-bottom: 8px;
      }
      
      p {
        margin: 0;
        color: #495057;
        line-height: 1.6;
        font-size: 1.1em;
      }
    `

    this.shadowRoot.appendChild(style)
  }
}

customElements.define('dynamic-card', DynamicCard)
