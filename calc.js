
class Calculator {
    constructor(previousoperandTextElement, currentoperandTextElement) {
        this.previousoperandTextElement = previousoperandTextElement
        this.currentoperandTextElement = currentoperandTextElement
        this.clear()
    }

    clear() {
        this.previousoperand = ''
        this.currentoperand = ''
        this.operation = undefined 


    }

    delete() {
        this.currentoperand = this.currentoperand.toString().slice(0, -1)
    }

    chooseOperation(operation) {
        if (this.currentoperand === '')return
        if(this.currentoperand !== ''){
            this.compute()
        }
         this.operation = operation
         this.previousoperand = this.currentoperand
         this.currentoperand = ''
    }

    appendNumber(number) {
        if (number === '.' && this.currentoperand.includes('.')) return
        this.currentoperand = this.currentoperand.toString() + number.toString()
    }

    compute() {
        let computation
        const prev = parseFloat(this.previousoperand)
        const curr = parseFloat(this.currentoperand)
        if(isNaN(prev) || isNaN(curr))return
        switch (this.operation) {
            case '+':
                computation = prev + curr
                break
            
            case '-':
                computation = prev - curr
                break

            case 'x':
                computation = prev * curr
                break

            case '÷':
                computation = prev / curr
                break
            
            default:
                return

        }
        this.currentoperand = computation
        this.operation = undefined
        this.previousoperand = ''

    }

    getdisplaynumber(number) {
        const stringnumber = number.toString()
        const integerDigits = parseFloat(stringnumber.split('.')[0])
        const decimalDigits = stringnumber.split('.')[1]
        let integerDisplay
        if (isNaN(integerDigits)) {
            integerDisplay = ''
        }
        else { 
            integerDisplay = integerDigits.toLocaleString('en', {maximumFractionDigits: 0})
        }
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`

        } else {
            return integerDisplay
        }
    }

    updateDisplay() {
        this.currentoperandTextElement.innerText = this.getdisplaynumber(this.currentoperand)
        if (this.operation != null) {
            this.previousoperandTextElement.innerText = `${this.getdisplaynumber(this.previousoperand)} ${this.operation}` 
        }
        else {
            this.previousoperandTextElement.innerText = ''
        }
    }
 }


const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allclearButton = document.querySelector('[data-allclear]')
const previousoperandTextElement = document.querySelector('[data-previous-operand]')
const currentoperandTextElement = document.querySelector('[data-current-operand]')

const calculator = new Calculator(previousoperandTextElement, currentoperandTextElement)

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })

})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })

})

equalsButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
})

allclearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
})

deleteButton.addEventListener('click', button => { 
    calculator.delete()
    calculator.updateDisplay()
})



