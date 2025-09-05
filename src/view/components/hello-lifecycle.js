export class HelloLifecycle extends HTMLElement {
  static get observedAttributes() {
    console.log('ObservedAttributes')
    return ['lifecycle']
  }

  constructor() {
    super()
    console.log('Constructor: Element created')

    // Attempting to access a child element in the constructor
    this.innerHTML = '<div class="child">Child Element</div>'
    const child = this.querySelector('.child')
    console.log('Constructor: Child element', child)
    // This will log the child element
    // Trying to manipulate the child element
    if (child) {
      child.textContent = 'Updated in Constructor'
    }
  }

  connectedCallback() {
    this.textContent = 'Hello Lifecycle'
    console.log('ConnectedCallback: Element added to DOM')

    const child = this.querySelector('.child')
    console.log('ConnectedCallback: Child element', child) // This will log the child element
    if (child) {
      child.textContent = 'Updated in ConnectedCallback'
    }
  }

  disconnectedCallback() {
    console.log('DisconnectedCallback: Element removed from DOM')
  }

  attributeChangedCallback(attribute, oldValue, newValue) {
    console.log(
      `AttributeChangedCallback: ${attribute} changed from ${oldValue} to ${newValue}`,
    )
  }

  adoptedCallback() {
    console.log('AdoptedCallback: Element moved to new document')
  }
}

customElements.define('hello-lifecycle', HelloLifecycle)
