/*-------------------------------- Constants --------------------------------*/

const randomWordURL = 'https://random-word-api.herokuapp.com/word?length=5'
const randomWords = ['CHAIR', 'CLOUD', 'WATER', 'SMILE', 'LIGHT']
const word1Container = document.getElementById('letter1-container')
const word2Container = document.getElementById('letter2-container')
const word3Container = document.getElementById('letter3-container')
const word4Container = document.getElementById('letter4-container')
const word5Container = document.getElementById('letter5-container')

/*-------------------------------- Variables --------------------------------*/

let randomWord
let randomWordArray

let firstWord = []
let secondWord = []
let thirdWord = []
let fourthWord = []
let fifthWord = []

let currentAttempt = 1
let countCorrectLetters = 0

/*------------------------ Cached Element References ------------------------*/

const randomWordElement = document.querySelector('#random-word')

const allKeys = document.querySelectorAll('.key')

const tryAgainElement = document.querySelector('.try-again-img')

const playAgainElement = document.querySelector('.play-again-img')

const firstWordLettersElements = document.querySelectorAll('.letter1')

const secondWordLettersElements = document.querySelectorAll('.letter2')

const thirdWordLettersElements = document.querySelectorAll('.letter3')

const fourthWordLettersElements = document.querySelectorAll('.letter4')

const fifthWordLettersElements = document.querySelectorAll('.letter5')
/*-------------------------------- Functions --------------------------------*/

async function fetchWord() {
  try {
    const response = await fetch(randomWordURL)
    const data = await response.json()
    console.log(data[0])

    randomWord = data[0].toUpperCase()
    randomWordElement.innerHTML = `The random word is ${randomWord}`
    randomWordArray = randomWord.split('')
    console.log(randomWordArray)
  } catch (error) {
    console.error('There is an error:', error)
  }
}

const chooseRandomWord = () => {
  randomWord = randomWords[Math.floor(Math.random() * randomWords.length)]
  randomWordElement.innerHTML = `The random word is ${randomWord}`
  randomWordArray = randomWord.split('')
}

const showTryAgain = () => {
  document.querySelector('.try-again-container').style.display = 'block'
  document.querySelector('.all-words-container').style.display = 'none'
}

const showPlayAgain = () => {
  document.querySelector('.play-again-container').style.display = 'block'
  document.querySelector('.all-words-container').style.display = 'none'
}

const compareWords = () => {
  let currentAttemptArray

  if (currentAttempt === 1) {
    currentAttemptArray = firstWord
  } else if (currentAttempt === 2) {
    currentAttemptArray = secondWord
  } else if (currentAttempt === 3) {
    currentAttemptArray = thirdWord
  } else if (currentAttempt === 4) {
    currentAttemptArray = fourthWord
  } else if (currentAttempt === 5) {
    currentAttemptArray = fifthWord
  }

  // console.log(randomWordArray)
  // console.log(currentAttemptArray)

  let htmlAttributeId

  countCorrectLetters = 0

  for (let i = 0; i < randomWordArray.length; i++) {
    htmlAttributeId = `letter${currentAttempt}-${i + 1}`

    //letter does not exist in the word
    if (randomWordArray.indexOf(currentAttemptArray[i]) === -1) {
      document.getElementById(htmlAttributeId).style.backgroundColor = '#A9A9A9'
      document.getElementById(currentAttemptArray[i]).style.backgroundColor =
        '#A9A9A9'
    }

    //exist and same index
    else if (randomWordArray[i] === currentAttemptArray[i]) {
      countCorrectLetters++
      document.getElementById(htmlAttributeId).style.backgroundColor = '#50C878'
      document.getElementById(currentAttemptArray[i]).style.backgroundColor =
        '#50C878'
    } else {
      // exist but not same index
      document.getElementById(htmlAttributeId).style.backgroundColor = '#F0E68C'
      document.getElementById(currentAttemptArray[i]).style.backgroundColor =
        '#F0E68C'
    }
  }

  //correct word is found
  if (countCorrectLetters === 5) {
    allKeys.forEach((key) => {
      key.removeEventListener('click', handleInput)
    })

    setTimeout(showPlayAgain, 1500)
  }

  //correct word is not found
  if (countCorrectLetters !== 5 && currentAttempt === 5) {
    //console.log('You lost')
    setTimeout(showTryAgain, 1500)
  }

  currentAttempt++
}

const startShaking = () => {
  if (currentAttempt === 1) {
    if (
      word1Container.classList.contains('container-horizontal-shaking') === true
    ) {
      word1Container.classList.remove('container-horizontal-shaking')
      setTimeout(() => startShaking(), 250)
    } else {
      word1Container.classList.add('container-horizontal-shaking')
    }
  } else if (currentAttempt === 2) {
    if (
      word2Container.classList.contains('container-horizontal-shaking') === true
    ) {
      word2Container.classList.remove('container-horizontal-shaking')
      setTimeout(() => startShaking(), 250)
    } else {
      word2Container.classList.add('container-horizontal-shaking')
    }
  } else if (currentAttempt === 3) {
    if (
      word3Container.classList.contains('container-horizontal-shaking') === true
    ) {
      word3Container.classList.remove('container-horizontal-shaking')
      setTimeout(() => startShaking(), 250)
    } else {
      word3Container.classList.add('container-horizontal-shaking')
    }
  } else if (currentAttempt === 4) {
    if (
      word4Container.classList.contains('container-horizontal-shaking') === true
    ) {
      word4Container.classList.remove('container-horizontal-shaking')
      setTimeout(() => startShaking(), 250)
    } else {
      word4Container.classList.add('container-horizontal-shaking')
    }
  } else if (currentAttempt === 5) {
    if (
      word5Container.classList.contains('container-horizontal-shaking') === true
    ) {
      word5Container.classList.remove('container-horizontal-shaking')
      setTimeout(() => startShaking(), 250)
    } else {
      word5Container.classList.add('container-horizontal-shaking')
    }
  }
}

const handleInput = (event) => {
  //console.log(event.target.id)

  if (event.target.id !== 'delete' && event.target.id !== 'submit') {
    if (currentAttempt === 1 && firstWord.length < 5) {
      firstWord.push(event.target.id)
      firstWordLettersElements[firstWord.length - 1].innerHTML = event.target.id
    } else if (currentAttempt === 2 && secondWord.length < 5) {
      secondWord.push(event.target.id)
      secondWordLettersElements[secondWord.length - 1].innerHTML =
        event.target.id
    } else if (currentAttempt === 3 && thirdWord.length < 5) {
      thirdWord.push(event.target.id)
      thirdWordLettersElements[thirdWord.length - 1].innerHTML = event.target.id
    } else if (currentAttempt === 4 && fourthWord.length < 5) {
      fourthWord.push(event.target.id)
      fourthWordLettersElements[fourthWord.length - 1].innerHTML =
        event.target.id
    } else if (currentAttempt === 5 && fifthWord.length < 5) {
      fifthWord.push(event.target.id)
      fifthWordLettersElements[fifthWord.length - 1].innerHTML = event.target.id
    }
  }

  if (event.target.id === 'delete') {
    if (currentAttempt === 1) {
      firstWord.pop()
      firstWordLettersElements[firstWord.length].innerHTML = ''
    } else if (currentAttempt === 2) {
      secondWord.pop()
      secondWordLettersElements[secondWord.length].innerHTML = ''
    } else if (currentAttempt === 3) {
      thirdWord.pop()
      thirdWordLettersElements[thirdWord.length].innerHTML = ''
    } else if (currentAttempt === 4) {
      fourthWord.pop()
      fourthWordLettersElements[fourthWord.length].innerHTML = ''
    } else if (currentAttempt === 5) {
      fifthWord.pop()
      fifthWordLettersElements[fifthWord.length].innerHTML = ''
    }
  }

  if (event.target.id === 'submit') {
    if (currentAttempt === 1) {
      if (firstWord.length === 5) {
        compareWords()
      } else {
        startShaking()
      }
    } else if (currentAttempt === 2) {
      if (secondWord.length === 5) {
        compareWords()
      } else {
        startShaking()
      }
    } else if (currentAttempt === 3) {
      if (thirdWord.length === 5) {
        compareWords()
      } else {
        startShaking()
      }
    } else if (currentAttempt === 4) {
      if (fourthWord.length === 5) {
        compareWords()
      } else {
        startShaking()
      }
    } else if (currentAttempt === 5) {
      if (fifthWord.length === 5) {
        compareWords()
      } else {
        startShaking()
      }
    }
  }
}

const init = () => {
  // 1- choose a random word
  fetchWord()
  //chooseRandomWord()
  console.log(randomWordArray)

  // 2- Initialize everything

  currentAttempt = 1

  firstWord = []
  secondWord = []
  thirdWord = []
  fourthWord = []
  fifthWord = []

  for (let i = 0; i < 5; i++) {
    firstWordLettersElements[i].innerHTML = ''
    secondWordLettersElements[i].innerHTML = ''
    thirdWordLettersElements[i].innerHTML = ''
    fourthWordLettersElements[i].innerHTML = ''
    fifthWordLettersElements[i].innerHTML = ''
  }

  firstWordLettersElements.forEach((element) => {
    element.style.backgroundColor = 'white'
  })

  secondWordLettersElements.forEach((element) => {
    element.style.backgroundColor = 'white'
  })

  thirdWordLettersElements.forEach((element) => {
    element.style.backgroundColor = 'white'
  })

  fourthWordLettersElements.forEach((element) => {
    element.style.backgroundColor = 'white'
  })

  fifthWordLettersElements.forEach((element) => {
    element.style.backgroundColor = 'white'
  })

  allKeys.forEach((key) => {
    key.style.backgroundColor = '#F0F0F0'
    key.addEventListener('click', handleInput)
  })

  document.querySelector('.try-again-container').style.display = 'none'
  document.querySelector('.play-again-container').style.display = 'none'
  document.querySelector('.all-words-container').style.display = 'block'
}

/*----------------------------- Event Listeners -----------------------------*/

tryAgainElement.addEventListener('click', init)
playAgainElement.addEventListener('click', init)

/*----------------------------- Extra -----------------------------*/
init()
