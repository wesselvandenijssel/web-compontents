import '../components/hello-world.js'
import '../components/hello-attribute.js'
import '../components/point-of-interest.js'
import '../components/hello-shadowdom.js'
import { HelloLifecycle } from '../components/hello-lifecycle'

console.log('Home Page loaded')
console.log(document.querySelector('hello-shadowdom'))
console.log(document.querySelector('h1'))

// Creating an instance of the custom element
const element = new HelloLifecycle()

// Appending the element to the DOM
document.body.appendChild(element)

// Setting the value of the lifecycle attribute
element.setAttribute('lifecycle', 'changed')

// Removing the element from the DOM
document.body.removeChild(element)
