class Hangman {
    static WORDS = [
        "country",
        "recipe",
        "mud",
        "application",
        "girl",
        "success",
        "argument",
        "dad",
        "recommendation",
        "attention"
    ]

    constructor(maxNoOfGuesses = 10) {
        this.maxNoOfGuesses = maxNoOfGuesses
        this.randomWord = ''
        this.guessedAlphabets = []
        this.isFound = false
        this.counter = 0
    }

    getRandomWord() {
        const randomWord = Hangman.WORDS[Math.floor(Math.random() * Hangman.WORDS.length)]
        this.randomWord = new Word(randomWord)
    }

    resetGame() {
        this.isFound = false
        this.randomWord = ''
        this.guessedAlphabets = []
        this.counter = 0
        this.startGame()
        const previousGuessesEl = document.querySelector('.previous-guesses')
        const counterEl = document.querySelector('.counter')
        previousGuessesEl.innerHTML = ''
        counterEl.innerHTML = ''
    }

    startGame() {
        this.getRandomWord()
        const displayEl = document.querySelector('.display')
        displayEl.innerHTML = this.randomWord.display()
        const guessedAlphabetForm = document.querySelector('#alphabet-box')
        const guessedAlphabetEl = document.querySelector('#guess-alphabet')
        const previousGuessesEl = document.querySelector('.previous-guesses')
        const counterEl = document.querySelector('.counter')
        guessedAlphabetForm.onsubmit = (e) => {
            e.preventDefault()
            this.randomWord.checkLetterIsFound(guessedAlphabetEl.value)
            this.guessedAlphabets.push(guessedAlphabetEl.value)
            displayEl.innerHTML = this.randomWord.display()
            guessedAlphabetEl.value = ''
            this.counter++;
            counterEl.innerHTML = `${this.counter}/${this.maxNoOfGuesses}`
            previousGuessesEl.innerHTML = this.guessedAlphabets.join(' ')
            const wordIsFound = this.randomWord.wordIsFound()

            if (this.counter >= this.maxNoOfGuesses && !wordIsFound) {
                this.gameOver()
            }

            if (wordIsFound) {
                this.winGame()
            }
        }
    }

    gameOver() {
        alert(`you lose, the word is ${this.randomWord.value}`)
        this.resetGame()
    }

    winGame() {
        alert(`you win, the word is ${this.randomWord.value}`)
        this.resetGame()
    }
}

class Word {
    constructor(value = '') {
        this.value = value
        this.isFound = false
        this.letters = this.value
            .split('')
            .map(letter => new Letter(letter))
    }

    wordIsFound() {
        return this.letters.every(letter => letter.isFound)
    }

    checkLetterIsFound(guessedAlphabet = '') {
        this.letters.forEach(letter => letter.checkLetterIsFound(guessedAlphabet))
    }

    display() {
        return this.letters
            .map(letter => letter.isFound ? letter.value : '_')
            .join(' ')

    }
}

class Letter {
    constructor(value = '') {
        this.value = value
        this.isFound = false
    }

    checkLetterIsFound(guessedAlphabet) {
        if (guessedAlphabet === this.value) {
            this.isFound = true
        }
    }
}

const newGame = new Hangman(10)
newGame.startGame()