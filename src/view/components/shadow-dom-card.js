export class ShadowDomCard extends HTMLElement {
  constructor() {
    super()
    
    // Create shadow root
    this.attachShadow({ mode: 'open' })
    
    this.createCardStructure()
    this.addStyles()
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
  
  addStyles() {
    // Create styles for the card
    const style = document.createElement('style')
    style.textContent = `
      section {
        border: 1px solid #ddd;
        border-radius: 8px;
        padding: 20px;
        margin: 20px 0;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        background-color: #fff;
        max-width: 400px;
        font-family: Arial, sans-serif;
      }
      
      h1 {
        margin: 0 0 15px 0;
        color: #333;
        font-size: 1.5em;
        font-weight: bold;
      }
      
      p {
        margin: 0;
        color: #666;
        line-height: 1.5;
      }
    `
    
    // Append styles to shadow root
    this.shadowRoot.appendChild(style)
  }
}

customElements.define('shadow-dom-card', ShadowDomCard)
