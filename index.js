const calculator = document.querySelector('.calculator');
const display = document.querySelector('.display');
const keys = calculator.querySelector('.calculator-keys');
var isNegative = false;
var isClean = true;

keys.addEventListener(
    'click',
    element => {

      if (element.target.matches('button')) {
        const key = element.target;
        const previousKeyType = calculator.dataset.previousKeyType;
        const action = key.dataset.action;
        const keyContent = key.textContent;
        const displayNum = display.textContent;

        if (action === 'calculate') {

          // Example usage:
          let expr1 = "1+2*3-4/5^6";
          let expr2 = "((((1+2)*3)-4)/5)^6";
          let expr3 = "(1/999 999 999.999)×999 999 999.999";
          let expr4 = "sin(2)-cos(2)";
          let expr5 = "1-(1^-26)";
          let expr6 = "-1*-1";
          
          append(expr2);
          calculate();
          console.log(displayValue)

        }
          
      }
    })

// Global variable to hold the input expression
let displayValue = '';

// Append a value to the display
function append(value) {
  displayValue += value;
}

// Clear the display
function clearDisplay() {
  displayValue = '';
}

// Delete the last character
function deleteLast() {
  displayValue = displayValue.slice(0, -1);
}

// Evaluate the expression without using eval()
function calculate() {
  try {
      const tokens = tokenize(displayValue);
      const postfix = infixToPostfix(tokens);
      const result = evaluatePostfix(postfix);
      displayValue = result.toString();
  } catch (error) {
      displayValue = 'Error';
  }
}

// Tokenize the input expression
function tokenize(expression) {

  const regex = /(\d+(\.\d+)?|[+\-*/^()!]|sin|cos|tan|log|sqrt|exp)/g;
  const tokens = expression.match(regex);

  if (tokens) {

      const processedTokens = [];
      tokens.forEach((token, i) => {

          if ( // negative numbers
              token === '-' &&
              (i === 0 || tokens[i - 1] === '(' || isOperator(tokens[i - 1]))
          ) {
              // Negative sign followed by a number
              processedTokens.push('-' + tokens[i + 1]);
              tokens.splice(i + 1, 1); // Skip the next token since it's merged

          } else {

              processedTokens.push(token);

          }
      });
      return processedTokens;
  }
  return [];
}

// Convert infix to postfix using Shunting Yard Algorithm
function infixToPostfix(tokens) {
    const precedence = {
        '+': 1,
        '-': 1,
        '*': 2,
        '/': 2,
        '^': 3,
        sin: 4,
        cos: 4,
        tan: 4,
        log: 4,
        sqrt: 4,
        exp: 4,
        '!': 4,
    };
    const associativity = {
        '+': 'L',
        '-': 'L',
        '*': 'L',
        '/': 'L',
        '^': 'R',
    };
    const output = [];
    const operators = [];

    tokens.forEach(token => {
      if (!isNaN(token)) { 
        // token is a number.

        output.push(parseFloat(token));

      } else if (token === '(') {

        operators.push(token);

      } else if (token === ')') {

        // Pop operators to the output until '(' is found
        while (operators.length && operators[operators.length - 1] !== '(') {
            output.push(operators.pop());
        }
        operators.pop(); // Remove '('

      } else { 
        // token is an operator or function

        while (
          operators.length &&
          operators[operators.length - 1] !== '(' &&
          (precedence[operators[operators.length - 1]] > precedence[token] ||
            (precedence[operators[operators.length - 1]] === precedence[token] &&
              associativity[token] === 'L'
            )
          )
        ) {
            output.push(operators.pop());
        }
        operators.push(token);

      }
    });

    // Pop any remaining operators to the output
    while (operators.length) {
        output.push(operators.pop());
    }

    return output;
}

// Evaluate postfix expression
function evaluatePostfix(postfix) {
  const stack = [];

  postfix.forEach(token => {

    if (typeof token === 'number') {
      stack.push(token);
    } else {

      if (isOperator(token)) {

        const b = stack.pop();
        const a = stack.pop();
        switch (token) {
          case '+':
              stack.push(a + b);
              break;
          case '-':
              stack.push(a - b);
              break;
          case '*':
              stack.push(a * b);
              break;
          case '/':
              stack.push(a / b);
              break;
          case '^':
              stack.push(Math.pow(a, b));
              break;
        }

      } else if (['sin', 'cos', 'tan', 'log', 'sqrt', 'exp', '!'].includes(token)) {
        
        const a = stack.pop();
        switch (token) {
          case 'sin':
              stack.push(Math.sin(a));
              break;
          case 'cos':
              stack.push(Math.cos(a));
              break;
          case 'tan':
              stack.push(Math.tan(a));
              break;
          case 'log':
              stack.push(Math.log(a));
              break;
          case 'sqrt':
              stack.push(Math.sqrt(a));
              break;
          case 'exp':
              stack.push(Math.exp(a));
              break;
          case '!':
              stack.push(factorial(a));
              break;
        }

      }

    }

  });

  return stack[0];
}

// --------------------------- Helper Functions -----------------------------
function isOperator(token) {

  return ['+', '-', '*', '/', '^'].includes(token);

}

function factorial(n) {

  if (n < 0) 
    return NaN; // Factorial of negative numbers is undefined
  if (n === 0 || n === 1) 
    return 1;

  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }

  return result;

}

/* ------------------ Shunting Yard Algorithm Psuedocode ---------------------
- While there are tokens to be read:
-  Read a token
-  If it's a number add it to queue
-  If it's an operator
-    While there's an operator on the top of the stack with greater precedence:
-      Pop operators from the stack onto the output queue
-    Push the current operator onto the stack
-  If it's a left bracket push it onto the stack
-  If it's a right bracket 
-    While there's not a left bracket at the top of the stack:
-      Pop operators from the stack onto the output queue.
-    Pop the left bracket from the stack and discard it
- While there are operators on the stack, pop them to the queue
*/