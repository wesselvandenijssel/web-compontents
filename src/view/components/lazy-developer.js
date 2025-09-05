export class LazyDeveloper extends HTMLElement {
  constructor() {
    super()
    this.render()
  }

  static get observedAttributes() {
    return ['nr']
  }

  attributeChangedCallback(name) {
    if (name === 'nr') {
      this.render()
    }
  }

  render() {
    // Get the nr attribute value, default to 1 if not provided or invalid
    const defaultValue = 1
    const increment = 1
    const nr = parseInt(this.getAttribute('nr'), 10) || defaultValue

    // Clear previous content
    this.innerHTML = ''

    const container = document.createElement('div')

    // Generate the message nr times
    for (let index = 0; index < nr; index += increment) {
      const line = document.createElement('p')
      line.textContent = `I'm a lazy developer, therefore I will write a custom element to print this line ${nr} times.`
      container.appendChild(line)
    }

    this.appendChild(container)
  }
}

customElements.define('lazy-developer', LazyDeveloper)
