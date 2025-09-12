// Dynamic content updater for Challenge 5

// Array of dynamic content data
const contentData = [
  {
    title: 'Technology News',
    content: 'Latest updates in the world of technology and innovation.',
  },
  {
    title: 'Sports Update',
    content: 'Current scores and highlights from major sporting events.',
  },
  {
    title: 'Weather Forecast',
    content: "Today's weather conditions and upcoming forecasts.",
  },
  {
    title: 'Stock Market',
    content: 'Current market trends and financial analysis.',
  },
  {
    title: 'Travel Tips',
    content: 'Essential advice for your next adventure and journey.',
  },
]

const alternateData = [
  {
    title: 'Breaking News',
    content: 'Important updates happening right now around the world.',
  },
  {
    title: 'Entertainment',
    content: 'Latest movies, shows, and celebrity news updates.',
  },
  {
    title: 'Health & Fitness',
    content: 'Tips for maintaining a healthy and active lifestyle.',
  },
  {
    title: 'Science Discovery',
    content: 'Recent breakthroughs in scientific research and discovery.',
  },
  {
    title: 'Food & Cooking',
    content: 'Delicious recipes and culinary inspiration for today.',
  },
]

// Function to update all dynamic cards with original content
const updateCards = () => {
  const cards = document.querySelectorAll('dynamic-card')

  cards.forEach((card, index) => {
    if (contentData[index]) {
      card.setAttribute('title', contentData[index].title)
      card.setAttribute('content', contentData[index].content)
    }
  })
}

// Function to cycle through different content sets
const cycleContent = () => {
  const cards = document.querySelectorAll('dynamic-card')

  cards.forEach((card, index) => {
    if (alternateData[index]) {
      card.setAttribute('title', alternateData[index].title)
      card.setAttribute('content', alternateData[index].content)
    }
  })
}

// Initialize dynamic content cycling
const initializeDynamicContent = () => {
  const initialDelay = 1000
  const cycleInterval = 5000

  // Initial update
  setTimeout(updateCards, initialDelay)

  // Cycle content every 5 seconds
  let isAlternate = false
  setInterval(() => {
    if (isAlternate) {
      updateCards()
    } else {
      cycleContent()
    }
    isAlternate = !isAlternate
  }, cycleInterval)
}

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', initializeDynamicContent)
