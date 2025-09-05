export class HelloAttribute extends HTMLElement {
  constructor() {
    super()
    this.propertyValue = 'World'
    this.textContent = `Hello ${this.propertyValue}`
  }

  static get observedAttributes() {
    return ['show']
  }

  attributeChangedCallback(attribute, oldValue, newValue) {
    if (attribute === 'show') {
      this.propertyValue = newValue
      this.textContent = `Hello ${this.propertyValue}`
    }
  }
}
