import '../components/hello-world.js'
import '../components/hello-attribute.js'
import '../components/point-of-interest.js'
import '../components/hello-shadowdom.js'
import '../components/lazy-developer.js'
import { HelloLifecycle } from '../components/hello-lifecycle'

// Creating an instance of the custom element
const element = new HelloLifecycle()

// Appending the element to the DOM
document.body.appendChild(element)

// Setting the value of the lifecycle attribute
element.setAttribute('lifecycle', 'changed')

// Removing the element from the DOM
document.body.removeChild(element)
