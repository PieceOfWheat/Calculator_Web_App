const calculator = document.querySelector('.calculator');
const display = document.querySelector('.display');
const keys = calculator.querySelector('.calculator-keys');
var isNegative = false;
var isClean = true;

keys.addEventListener('click', element => {

  if (element.target.matches('button')) {

    const key = element.target;
    const previousKeyType = calculator.dataset.previousKeyType;
    const action = key.dataset.action;
    const keyContent = key.textContent;
    const displayNum = display.textContent;

    // Auxilary functions
    function clearCalculator() {

      calculator.dataset.firstValue = undefined;
      calculator.dataset.modValue = undefined;
      calculator.dataset.operator = undefined;
      display.textContent = '0';
      isClean = true;
      isNegative = false;
      calculator.dataset.previousKeyType = 'clear';

    }

    // check if its a NUMBER key.
    if (!action) {

      console.log('');
      console.log('NUMBER key was pressed');
      if (previousKeyType === 'calculate') {
        
        clearCalculator();
        
      }
      
      calculator.dataset.previousKeyType = 'number';

      if (
        display.textContent === '0' || 
        previousKeyType === 'operator' && isNegative == false 
      ) {

        display.textContent = keyContent;
        
      } else {
        
        display.textContent = displayNum + keyContent;
        isNegative = false;
        
      }

    } else {

      console.log('');
      console.log('NON-NUMBER key was pressed');

      // check for clear key.
      if (action === 'clear') {
        clearCalculator();
        console.log('Calculator was cleared.')
      }
      
      // check if key press is valid.
      else if (
        (!previousKeyType || previousKeyType === 'clear' || previousKeyType === 'operator') &&
        (action !== 'subtract' && action !== 'sin' && action !== 'cos' && action !== 'tan')
      ) {
        
        document.activeElement.blur();
        
      // check which key was pressed.
      } else {

        // check for negative number initial input.
        if (
          (!previousKeyType || previousKeyType === 'clear') && 
          action === 'subtract'
        ) {

          isNegative = true;
          display.textContent = '-';

        }

        // Operator (+ - * /)
        if (
          action === 'add' ||
          action === 'subtract' ||
          action === 'multiply' ||
          action === 'divide' 
        ) {

          var firstValue = calculator.dataset.firstValue;
          const lastOperator = calculator.dataset.operator;
          console.log(lastOperator)
          
          if (
            firstValue && 
            !isClean &&
            (
              previousKeyType !== 'operator' || 
              lastOperator === 'sin' || 
              lastOperator === 'cos' || 
              lastOperator === 'tan'
            ) && 
            previousKeyType !== 'calculate' &&
            previousKeyType !== 'clear'
          ) {
            
            const secondValue = displayNum;
            firstValue = calculate(firstValue, action, secondValue);
            display.textContent = firstValue;
            calculator.dataset.firstValue = firstValue;
            
          } else {
            calculator.dataset.firstValue = displayNum;
          }
          
          calculator.dataset.operator = action;
          calculator.dataset.previousKeyType = 'operator';
          isClean = false;
          
        }

        // Decimal
        else if (action === 'decimal-point') {
    
          calculator.dataset.previousKeyType = 'decimal';
    
          if (!displayNum.includes('.'))
            display.textContent = displayNum + '.';
          else if (previousKeyType === 'operator')
            display.textContent = '0.';
    
        }

        // Sin
        else if (action === 'sin') {
          var firstValue;
          calculator.dataset.firstValue = firstValue = Math.sin(parseFloat(display.textContent));
          display.textContent = round(firstValue);

          document.activeElement.blur();
          calculator.dataset.operator = action;
          calculator.dataset.previousKeyType = 'calculate';
    
        }

        // Cos
        else if (action === 'cos') {
          var firstValue;
          calculator.dataset.firstValue = firstValue = Math.cos(parseFloat(display.textContent));
          display.textContent = round(firstValue);

          document.activeElement.blur();
          calculator.dataset.operator = action;
          calculator.dataset.previousKeyType = 'calculate';
    
        }

        // Tan
        else if (action === 'tan') {
          console.log('TAN was pressed')
          var firstValue;
          calculator.dataset.firstValue = firstValue = Math.tan(parseFloat(display.textContent));
          display.textContent = round(firstValue);

          document.activeElement.blur();
          calculator.dataset.operator = action;
          calculator.dataset.previousKeyType = 'calculate';
    
        }

        // log10
        else if (action === 'log10') {
          console.log('LOG10 was pressed')
          var firstValue;
          calculator.dataset.firstValue = firstValue = Math.log10(parseFloat(display.textContent));
          display.textContent = round(firstValue);

          document.activeElement.blur();
          calculator.dataset.operator = action;
          calculator.dataset.previousKeyType = 'calculate';
    
        }

        
        // ln
        else if (action === 'ln') {
          console.log('ln was pressed')
          var firstValue;
          calculator.dataset.firstValue = firstValue = Math.log(parseFloat(display.textContent));
          display.textContent = round(firstValue);

          document.activeElement.blur();
          calculator.dataset.operator = action;
          calculator.dataset.previousKeyType = 'calculate';
    
        }
        
        // exp
        else if (action === 'exp') {
          console.log('EXP was pressed')
          var firstValue;
          calculator.dataset.firstValue = firstValue = Math.exp(parseFloat(display.textContent));
          display.textContent = round(firstValue);

          document.activeElement.blur();
          calculator.dataset.operator = action;
          calculator.dataset.previousKeyType = 'calculate';
    
        }

        // square-root
        else if (action === 'square-root') {
          console.log('SQRT was pressed')
          var firstValue;
          calculator.dataset.firstValue = firstValue = Math.sqrt(parseFloat(display.textContent));
          display.textContent = round(firstValue);

          document.activeElement.blur();
          calculator.dataset.operator = action;
          calculator.dataset.previousKeyType = 'calculate';
    
        }

        // squared
        else if (action === 'squared') {
          console.log('SQRD was pressed')
          var firstValue;
          calculator.dataset.firstValue = firstValue = Math.pow(parseFloat(display.textContent), 2);
          display.textContent = round(firstValue);

          document.activeElement.blur();
          calculator.dataset.operator = action;
          calculator.dataset.previousKeyType = 'calculate';
    
        }

        // cubed
        else if (action === 'cubed') {
          console.log('CUBED was pressed')
          var firstValue;
          calculator.dataset.firstValue = firstValue = Math.pow(parseFloat(display.textContent), 3);
          display.textContent = round(firstValue);

          document.activeElement.blur();
          calculator.dataset.operator = action;
          calculator.dataset.previousKeyType = 'calculate';
    
        }
        
        // percent
        else if (action === 'percent') {
          console.log('PERCENT was pressed')
          var firstValue;
          calculator.dataset.firstValue = firstValue = parseFloat(display.textContent) / 100;
          display.textContent = round(firstValue);

          document.activeElement.blur();
          calculator.dataset.operator = action;
          calculator.dataset.previousKeyType = 'calculate';
    
        }
        
        // factorial
        else if (action === 'factorial') {
          console.log('FACTORIAL was pressed')
          var firstValue;
          calculator.dataset.firstValue = firstValue = factorial(parseFloat(display.textContent));
          display.textContent = round(firstValue);

          document.activeElement.blur();
          calculator.dataset.operator = action;
          calculator.dataset.previousKeyType = 'calculate';
    
        }
        
        // pi
        else if (action === 'pi') {
          console.log('PI was pressed')
          var firstValue;
          calculator.dataset.firstValue = firstValue = Math.PI * parseFloat(display.textContent);
          display.textContent = round(firstValue);

          document.activeElement.blur();
          calculator.dataset.operator = action;
          calculator.dataset.previousKeyType = 'calculate';
    
        }

        // Clear
        else if (action === 'clear-entry') {

          if (previousKeyType === 'calculate'){
            
            clearCalculator();
            
          } else {
            
            display.textContent = '0';
            calculator.dataset.previousKeyType = 'clear-entry';

          }

        }

        // Calculate
        else if (action === 'calculate') {

          console.log('Calculate key was pressed.')
          
          let firstValue = calculator.dataset.firstValue;
          let secondValue = displayNum;
          const operator = calculator.dataset.operator;

          if (previousKeyType === 'operator') {

            display.textContent = firstValue;

          } else if (previousKeyType === 'calculate') {

            firstValue = displayNum;
            secondValue = calculator.dataset.modValue;
            display.textContent = calculate(firstValue, operator, secondValue);

          } else if (isNegative) {

            display.textContent = displayNum;

          } else {

            if (firstValue)
              display.textContent = calculate(firstValue, operator, secondValue);
            else
              display.textContent = displayNum;

          }

          calculator.dataset.previousKeyType = 'calculate';
          calculator.dataset.modValue = secondValue;

        }

      }
    }
  }
  
})


// Auxilliary functions
function calculate(value1=0, operator, value2=0) {

  // preprocessing
  n1 = parseFloat(value1);
  n2 = parseFloat(value2);

  // calculation
  switch (operator) {

    case 'add':
      return round(n1 + n2);
      break;
    
    case 'subtract':
      return round(n1 - n2);
      break;
    
    case 'multiply':
      console.log(round(n1*n2));
      return round(n1 * n2);
      break;
    
    case 'divide':
      return round(n1 / n2);
      break;
    
    default:
      return n1;
  }

}

function round(x) {

  const factor = Math.pow(10, 10);
  return Math.round(x * factor) / factor;

}

function factorial(x) {
  let result = 1;
  for (let i = 1; i <= x; i++) {
    result *= i;
  }
  return result;
}


/* edge cases:
  - After pressing calculate, and then pressing only 1 number, following by calculate again,
    the answer show's NaN instead of the first value. (previous key !== operator || undifined)
*/ 