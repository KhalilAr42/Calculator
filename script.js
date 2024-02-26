let firstNumber;
let secondNumber;
let operator;

let operatorPriority = {
    "+": "0",
    "-": "0",
    "*": "1",
    "/": "1",
};

const lastResultDiv = document.querySelector("#lastResult");
const buttons = document.querySelectorAll("button");

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
    if (secondNumber == 0) {
        return "awili ?";
    }
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

function isValidMathOperation(expression) {
    const pattern = /^\d+(\s*[\+\-\*\/]\s*\d+)*$/;
    return pattern.test(expression);
}

function isOperator(char) {
    return (
        char == "+" ||
        char == "-" ||
        char == "*" ||
        char == "x" ||
        char == "/" ||
        char == "%"
    );
}

function isEmpty(array) {
    return array.length === 0;
}

function isDigit(char) {
    return /\d/.test(char);
}

function convertToPostfixExpression(expression) {
    const formattedExpression = expression.replace(/\s/g, "");
    let stack = [];
    let postfixExpression = "";
    let operand = "";

    for (let i = 0; i < formattedExpression.length; i++) {
        let char = formattedExpression[i];

        if (isDigit(char)) {
            operand += char;
        } else if (isOperator(char)) {
            if (operand !== "") {
                postfixExpression += operand + " ";
                operand = "";
            }

            while (!isEmpty(stack)) {
                let lastElement = stack.length - 1;
                let operator = stack[lastElement];
                if (operatorPriority[operator] >= operatorPriority[char]) {
                    postfixExpression += stack.pop() + " ";
                } else {
                    break;
                }
            }
            stack.push(char);
        }
    }

    if (operand !== "") {
        postfixExpression += operand + " ";
    }

    while (!isEmpty(stack)) {
        postfixExpression += stack.pop() + " ";
    }

    return postfixExpression.trim();
}

function calculatePostfixExpression(expression) {
    let postfixExpression = convertToPostfixExpression(expression);
    let stack = [];
    let operand = "";
    for (let i = 0; i < postfixExpression.length; i++) {
        let char = postfixExpression[i];
        if (isDigit(char)) {
            operand += char;
        } else if (char == " ") {
            stack.push(parseInt(operand));
            operand = "";
        } else {
            let number1 = stack.pop();
            let number2 = stack.pop();
            switch (char) {
                case "+":
                    stack.push(operate(number2, "+", number1));
                    i++;
                    break;

                case "-":
                    stack.push(operate(number2, "-", number1));
                    i++;
                    break;

                case "/":
                    stack.push(operate(number2, "/", number1));
                    i++;
                    break;

                case "*":
                    stack.push(operate(number2, "*", number1));
                    i++;
                    break;

                default:
                    console.log("WTF!");
                    break;
            }
        }
    }

    return stack.pop();
}
