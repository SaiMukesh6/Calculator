const display = document.getElementById('display');
let firstOperand = null;
let operator = null;
let awaitingSecond = false;

function updateDisplay(value) {
  display.textContent = value;
}

function inputDigit(digit) {
  if (awaitingSecond) {
    updateDisplay(digit);
    awaitingSecond = false;
  } else {
    updateDisplay(display.textContent === '0' ? digit : display.textContent + digit);
  }
}

function inputDecimal() {
  if (awaitingSecond) {
    updateDisplay('0.');
    awaitingSecond = false;
  } else if (!display.textContent.includes('.')) {
    updateDisplay(display.textContent + '.');
  }
}

function handleOperator(nextOperator) {
  const currentValue = parseFloat(display.textContent);
  if (operator && !awaitingSecond) {
    const result = calculate(firstOperand, currentValue, operator);
    updateDisplay(result);
    firstOperand = result;
  } else {
    firstOperand = currentValue;
  }
  operator = nextOperator;
  awaitingSecond = true;
}

function calculate(a, b, op) {
  switch (op) {
    case 'add': return a + b;
    case 'subtract': return a - b;
    case 'multiply': return a * b;
    case 'divide': return b === 0 ? 'Error' : a / b;
    default: return b;
  }
}

function clearAll() {
  updateDisplay('0');
  firstOperand = null;
  operator = null;
  awaitingSecond = false;
}

function backspace() {
  if (!awaitingSecond) {
    const text = display.textContent.slice(0, -1) || '0';
    updateDisplay(text);
  }
}

document.querySelector('.keys').addEventListener('click', (e) => {
  const target = e.target;
  const digit = target.dataset.digit;
  const action = target.dataset.action;

  if (digit !== undefined) {
    if (digit === '.') inputDecimal();
    else inputDigit(digit);
    return;
  }

  switch (action) {
    case 'add':
    case 'subtract':
    case 'multiply':
    case 'divide':
      handleOperator(action);
      break;
    case 'calculate':
      if (operator !== null) {
        const result = calculate(firstOperand, parseFloat(display.textContent), operator);
        updateDisplay(result);
        firstOperand = null;
        operator = null;
      }
      break;
    case 'clear':
      clearAll();
      break;
    case 'backspace':
      backspace();
      break;
  }
});
