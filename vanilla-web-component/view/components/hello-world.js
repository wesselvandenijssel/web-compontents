export class HelloWorld extends HTMLElement {
  constructor() {
    super()

    const container = document.createElement('div')

    this.messageElement = document.createElement('p')
    this.messageElement.textContent = 'Hello World'

    const button = document.createElement('button')
    button.textContent = 'Change Message'
    button.addEventListener('click', () => this.changeMessage())

    container.appendChild(this.messageElement)
    container.appendChild(button)

    this.appendChild(container)
  }

  changeMessage() {
    this.messageElement.textContent = 'Hello Universe!'
  }
}

customElements.define('hello-world', HelloWorld)
