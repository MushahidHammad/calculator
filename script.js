const display = document.getElementById('display');
const numberButtons = document.querySelectorAll('.number');
const operatorButtons = document.querySelectorAll('.operator');
const clearButton = document.querySelector('.clear');
const deleteButton = document.querySelector('.delete');
const equalsButton = document.querySelector('.equal');

let currentInput = '';
let previousInput = '';
let operator = null;

// Update display
function updateDisplay() {
    display.textcontent = currentInput || '0';
}

// Handle number button click
numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        currentInput += button.textContent;
        updateDisplay();
    });
});

// Clear everything
clearButton.addEventListener('click', () => {
    currentInput = '';
    previousInput = '';
    operator = null;
    updateDisplay();
});