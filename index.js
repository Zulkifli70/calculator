const display = document.querySelector("#display");
let firstNumber = null;
let operator = null;
let secondNumber = null;
let waitingForOperand = false;
let shouldResetDisplay = false;

function appendToDisplay(input) {
  // Reset display jika baru selesai kalkulasi
  if (shouldResetDisplay) {
    display.value = "";
    shouldResetDisplay = false;
  }

  if (waitingForOperand && input !== ".") {
    display.value = "";
    waitingForOperand = false;
  }

  if (input === ".") {
    if (waitingForOperand) {
      display.value = "0";
      waitingForOperand = false;
    }

    if (display.value.includes(".")) {
      return;
    }
  }

  display.value += input;
}

function add(firstNumber, secondNumber) {
  return firstNumber + secondNumber;
}

function subtract(firstNumber, secondNumber) {
  return firstNumber - secondNumber;
}

function multiply(firstNumber, secondNumber) {
  return firstNumber * secondNumber;
}

function divide(firstNumber, secondNumber) {
  if (secondNumber === 0) {
    return "Cannot divide by zero";
  }
  return firstNumber / secondNumber;
}

function clearDisplay() {
  display.value = "";
  firstNumber = null;
  operator = null;
  secondNumber = null;
  waitingForOperand = false;
  shouldResetDisplay = false;
}

function deleteNum() {
  display.value = display.value.slice(0, -1);
}

function operate(operator, firstNumber, secondNumber) {
  if (operator === "+") {
    return add(firstNumber, secondNumber);
  } else if (operator === "-") {
    return subtract(firstNumber, secondNumber);
  } else if (operator === "/") {
    return divide(firstNumber, secondNumber);
  } else if (operator === "*") {
    return multiply(firstNumber, secondNumber);
  } else {
    return "Error";
  }
}

function setOperator(op) {
  const inputValue = parseFloat(display.value);

  // Jika tidak ada input yang valid, jangan lakukan apa-apa
  if (isNaN(inputValue)) {
    return;
  }

  // Jika sudah ada operator dan firstNumber, lakukan kalkulasi dulu (chain operations)
  if (operator && firstNumber !== null && !waitingForOperand) {
    secondNumber = inputValue;
    const result = operate(operator, firstNumber, secondNumber);

    // Handle pembagian dengan nol
    if (typeof result === "string") {
      display.value = result;
      firstNumber = null;
      operator = null;
      shouldResetDisplay = true;
      return;
    }

    // Bulatkan hasil jika decimal terlalu panjang
    display.value = Math.round(result * 1000000000) / 1000000000;
    firstNumber = result;
  } else {
    firstNumber = inputValue;
  }

  operator = op;
  waitingForOperand = true;
}

function calculate() {
  const inputValue = parseFloat(display.value);

  // Validasi: pastikan ada operator dan firstNumber
  if (operator === null || firstNumber === null || isNaN(inputValue)) {
    return;
  }

  secondNumber = inputValue;
  const result = operate(operator, firstNumber, secondNumber);

  if (typeof result === "string") {
    display.value = result;
  } else {
    // Bulatkan hasil jika decimal terlalu panjang
    display.value = Math.round(result * 1000000000) / 1000000000;
  }

  // Reset state
  firstNumber = null;
  operator = null;
  secondNumber = null;
  waitingForOperand = false;
  shouldResetDisplay = true;
}
