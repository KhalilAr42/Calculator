let firstNumber;
let secondNumber;
let operator;

let operatorPriority = {
    "+": "0",
    "-": "0",
    "*": "1",
    x: "1",
    "÷": "1",
};

const lastResultDiv = document.querySelector("#lastResult");
const currentResult = document.querySelector("#currentResult");
const buttons = document.querySelectorAll("button");

function handleButtonClick(text) {
    let expression = lastResultDiv.textContent;
    let lastChar = lastResultDiv.textContent.at(-1);

    let userStartsWithClearButtons = isEmpty(expression) && (text == "AC" || text == "C");
    let userStartsWithOperator = isEmpty(expression) && isOperator(text);
    let userStartWithDot = isEmpty(expression) && text == ".";
    let userClickOnClearButton = text === "AC";
    let userClickOnRemoveButton = text === "C";
    let userClickOnPercentageButton = text === "%";
    let userClickOnEqualButton = text === "=";
    let userTriesToAddOperatorInSpecificConditions = isOperator(text) && text !== "%" && (lastChar === "." || isOperator(lastChar));
    let userTriesToEnterInvalidDot =
        text == "." &&
        (isOperator(lastChar) ||
            lastChar === "." ||
            expression
                .split(/[x+\/%\-\÷]/)
                .slice(-1)[0]
                .includes("."));
    let userEntersOnlyText = expression.match(/^\d*\.?\d*$/);
    let userEntersOnlyTextfollowedByOneOperator = expression.match(/^\d*\.?\d+[x+\/\-\÷]$/);

    if (userEntersOnlyTextfollowedByOneOperator && userClickOnEqualButton) {
        updateResult(expression.slice(0, -1));
        return;
    }
    if (userStartsWithOperator) {
        return;
    }

    if (userStartWithDot) {
        return;
    }

    if (userStartsWithClearButtons) {
        return;
    }

    if (userTriesToAddOperatorInSpecificConditions) {
        lastResultDiv.textContent = lastResultDiv.textContent.slice(0, -1) + text;
        return;
    }

    if (userClickOnClearButton) {
        clearCalculator();
        return;
    }

    if (userClickOnRemoveButton) {
        removeLastChar();
        return;
    }

    //if the user want to calculate the pourcentage (weird shit:p)
    if (userClickOnPercentageButton) {
        if (lastResultDiv.textContent.slice(0, -1).match(/[x+\/%\-]/)) {
            if ((currentResult.textContent = isOperator(lastChar))) {
                currentResult.textContent = calculatePostfixExpression(lastResultDiv.textContent.slice(0, -1)) / 100;
                lastResultDiv.textContent = currentResult.textContent;
            } else {
                currentResult.textContent = calculatePostfixExpression(lastResultDiv.textContent) / 100;
                lastResultDiv.textContent = currentResult.textContent;
            }
        } else {
            currentResult.textContent = (parseFloat(lastResultDiv.textContent) / 100).toFixed(2);
            lastResultDiv.textContent = currentResult.textContent;
        }
    }

    if (userTriesToEnterInvalidDot) {
        return;
    }

    if (userEntersOnlyText && userClickOnEqualButton) {
        currentResult.textContent = lastResultDiv.textContent;
        return;
    }

    if (userClickOnEqualButton && isOperator(lastChar)) {
        updateResult(calculatePostfixExpression(lastResultDiv.textContent.slice(0, -1)));
        return;
    }

    if (userClickOnEqualButton && !isOperator(lastChar)) {
        updateResult(calculatePostfixExpression(lastResultDiv.textContent));
        return;
    }

    //anything else just append the text to the display
    lastResultDiv.textContent += text;
}

function isFloat(n) {
    return Number(n) === n && n % 1 !== 0;
}

function clearCalculator() {
    lastResultDiv.textContent = "";
    currentResult.textContent = "";
}

function removeLastChar() {
    lastResultDiv.textContent = lastResultDiv.textContent.slice(0, -1);
}

function generateRandomFunnyAngryEmoji() {
    let array = ["ಠ益ಠ", "ಠ_ಠ", "ಥ﹏ಥ", "ಥ_ಥ", "(⊙︿⊙)"];
    let randomIndex = Math.floor(Math.random() * 5);
    return array[randomIndex];
}

function updateResult(result) {
    if (isFloat(result)) {
        lastResultDiv.textContent = result.toFixed(2);
        currentResult.textContent = result.toFixed(2);
    } else if (result == "awili ?" || isNaN(result)) {
        currentResult.textContent = generateRandomFunnyAngryEmoji();
    } else {
        lastResultDiv.textContent = result;
        currentResult.textContent = result;
    }
}

buttons.forEach((button) => {
    button.addEventListener("click", () => {
        handleButtonClick(button.textContent);
    });
});

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
        case "÷":
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
    return char == "+" || char == "-" || char == "*" || char == "x" || char == "/" || char == "÷" || char == "%";
}

function isEmpty(array) {
    return array.length === 0;
}

function isDigit(char) {
    return /\d|\./.test(char);
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
            stack.push(parseFloat(operand));
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

                case "÷":
                    stack.push(operate(number2, "÷", number1));
                    i++;
                    break;

                case "x":
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
