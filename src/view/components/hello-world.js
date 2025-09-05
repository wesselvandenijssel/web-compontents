export class HelloWorld extends HTMLElement {
  constructor() {
    super()
    this.textContent = 'Hello World'
  }
}

customElements.define('hello-world', HelloWorld)
