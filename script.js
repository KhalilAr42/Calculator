let firstNumber;
let secondNumber;
let operator;

function add(firstNumber, secondNumber) {
    return firstNumber + secondNumber;
}

function substract(firstNumber, secondNumber) {
    return firstNumber - secondNumber;
}

function multiply(firstNumber, secondNumber) {
    return firstNumber * secondNumber;
}

function divide(firstNumber, secondNumber) {
    return firstNumber / secondNumber;
}

function operate(firstNumber, operator, secondNumber) {
    switch (operator) {
        case "+":
            return add(firstNumber, secondNumber);
        case "-":
            return substract(firstNumber, secondNumber);
        case "*":
            return multiply(firstNumber, secondNumber);
        case "/":
            return divide(firstNumber, secondNumber);
        default:
            console.error(`This is not a valid operator : ${operator}`);
            break;
    }
}
