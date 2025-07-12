// Get reference
const equationDisplay = document.getElementById('equation');
const display = document.getElementById('display');
const numberButtons = document.querySelectorAll('.number');
const operatorButtons = document.querySelectorAll('.operator');
const clearButton = document.querySelector('.clear');
const deleteButton = document.querySelector('.delete');
const equalsButton = document.querySelector('.equals');

let currentInput = '';
let previousInput = '';
let operator = null;

// Update the display
function updateDisplay() {
  display.textContent = currentInput || '0';

  if (previousInput && operator) {
    equationDisplay.textContent = `${previousInput} ${operator}`;
  } else {
    equationDisplay.textContent = '';
  }
}


// Basic operations
function operate(a, b, operator) {
    a = parseFloat(a);
    b = parseFloat(b);
    if (operator === '+') return a + b;
    if (operator === '-') return a - b;
    if (operator === 'x') return a * b;
    if (operator === '÷') {
        if (b === 0) return 'Error';
        return a / b;
    }
    return b;
}

// Handle number button clicks
numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.textContent;
        if (value === '.' && currentInput.includes('.')) return;
        currentInput += value;
        updateDisplay();
    });
});

// Handle operator button clicks
operatorButtons.forEach(button => {
  button.addEventListener('click', () => {
    const op = button.textContent;

    // Remove 'active' class from all operator buttons
    operatorButtons.forEach(btn => btn.classList.remove('active'));

    // Add 'active' to the currently clicked operator
    button.classList.add('active');

    if (currentInput === '' && previousInput !== '') {
      operator = op;
      return;
    }

    if (previousInput !== '' && currentInput !== '') {
      currentInput = operate(previousInput, currentInput, operator).toString();
      updateDisplay();
    }

    operator = op;
    previousInput = currentInput;
    currentInput = '';
  });
});

// Handle delete
deleteButton.addEventListener('click', () => {
    currentInput = currentInput.slice(0, -1);
    updateDisplay();
});

document.addEventListener('keydown', (e) => {
  const key = e.key;

  // Digits 0-9 and .
  if (!isNaN(key) || key === '.') {
    if (key === '.' && currentInput.includes('.')) return;
    currentInput += key;
    updateDisplay();
  }

  // Operators
  if (['+', '-', '*', '/'].includes(key)) {
    if (currentInput === '') return;
    if (previousInput !== '') {
      currentInput = operate(previousInput, currentInput, operator).toString();
      updateDisplay();
    }

    // Convert * and / to symbols used in buttons
    operator = key === '*' ? '×' : key === '/' ? '÷' : key;
    previousInput = currentInput;
    currentInput = '';
  }

  // Enter or =
  if (key === 'Enter' || key === '=') {
    if (currentInput === '' || previousInput === '' || !operator) return;
    currentInput = operate(previousInput, currentInput, operator).toString();
    operator = null;
    previousInput = '';
    updateDisplay();
  }

  // Backspace
  if (key === 'Backspace') {
    currentInput = currentInput.slice(0, -1);
    updateDisplay();
  }

  // Escape (clear)
  if (key === 'Escape') {
    currentInput = '';
    previousInput = '';
    operator = null;
    updateDisplay();
  }
});
