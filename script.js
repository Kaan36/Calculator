// ----------------------- Calculator class --------------------------------- //
class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.clear();
    }
    //-------------- clear all operands and operation values ------------//
    clear() {
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = undefined;
    }

    //-------------------- clear currentOperand last value from string -------------//s
    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }

    //-------------- add the operand there was clicking currently for calculation ------------//
    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return;
        // ----------- number come from button eventlistener ---------------- //

        this.currentOperand = this.currentOperand.toString() + number.toString();
        console.log(this.currentOperand)
    }

    //----------------------------- add the operand which clicked by the operand buttons and safe in operation variable,
    // also load the value from currentoperand into previousoperand and empty currentoperand -------------------------------//
    chooseOperation(operation) {
        if (this.currentOperand === '') return;
        if (this.previousOperand !== '') {
            this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    }

    //-------- compute the prev and current values with switch case detected operation -------------//
    compute() {
        let computation;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        if (isNaN(prev) || isNaN(current)) return;
        switch (this.operation) {
            case '+':
                computation = prev + current;
                break;
            case '-':
                computation = prev - current;
                break;
            case '÷':
                computation = prev / current;
                break;
            case '*':
                computation = prev * current;
                break;
            default:
                return
        }
        this.currentOperand = computation;
        this.operation = undefined;
        this.previousOperand = '';
    }

    //------------------- show the values of current- and previous Operands in the output box as text value ---------//
    updateDisplay() {
        this.currentOperandTextElement.innerText = this.currentOperand;
        if (this.operation != null) {
            this.previousOperandTextElement.innerText =
                `${this.previousOperand} ${this.operation}`;
        } else {
            this.previousOperandTextElement.innerText = '';
        }
    }
}

// ----------------------- all tags with data-attributes load into variables ----------------------- // 
const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const previousOperandTextElement = document.querySelector('[data-previous-operand]');
const currentOperandTextElement = document.querySelector('[data-current-operand]');

// ---------------- create/init class Calculator ----------------------------- // 
const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);


// -------------------------- all numberButtons added eventlistener ('click') and called with .appendNumber function inside the class--------//
numberButtons.forEach(button => {
    button.addEventListener('click', () => {

        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    })
})

// ----------------- include the innertext of operationsbutton which was clicked, for the switch case function ---------//
operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    })
})

// -------------------- click on the equal button starts the compute function and update display with result of compute() ---------//
equalsButton.addEventListener('click', button => {
    calculator.compute();
    calculator.updateDisplay();
})

// ---------------------- clear all variable values ---------------------------- //
allClearButton.addEventListener('click', button => {
    calculator.clear();
    calculator.updateDisplay();
})

// ---------------------- clear currentOperand last value  ---------------------------- //
deleteButton.addEventListener('click', button => {
    calculator.delete();
    calculator.updateDisplay();
})