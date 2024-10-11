import React, { useState } from 'react';


const Calculator = () => {
  const [input, setInput] = useState('0');
  const [formula, setFormula] = useState('');
  const [evaluated, setEvaluated] = useState(false);
  

  const handleClear = () => {
    setInput('0');
    setFormula('');
    setEvaluated(false);
  };

  const handleNumber = (num) => {
    if (evaluated) {
      setInput(num);
      setFormula(num);
      setEvaluated(false);
    } else {
      if (input === '0' && num === '0') return;
      setInput(input === '0' ? num : input + num);
      setFormula(formula + num);
    }
  };

  const handleOperator = (operator) => {
    if (evaluated) {
      setFormula(input + operator);
      setEvaluated(false);
    } else if (formula.length === 0) {
      return;
    } else {
      const lastChar = formula[formula.length - 1];

      // If the last character is an operator, replace it with the new operator
      if (/[+\-*/]$/.test(lastChar)) {
        if (operator !== '-' || lastChar !== '-') { // Allow double negative sign
          setFormula(formula.slice(0, -1) + operator);
        }
      } else {
        setFormula(formula + operator);
      }
      setInput(operator);
    }
  };

  const handleDecimal = () => {
    if (evaluated) {
      setInput('0.');
      setFormula('0.');
      setEvaluated(false);
    } else if (!input.includes('.')) {
      setInput(input + '.');
      setFormula(formula + '.');
    }
  };

  const handleEvaluate = () => {
    try {
      const result = evaluate(formula); // Use custom evaluate function
      setInput(result.toString());
      setFormula(formula + '=' + result);
      setEvaluated(true);
    } catch (error) {
      setInput('Error');
    }
  };

  // Custom evaluation function
  const evaluate = (expression) => {
    const tokens = expression.match(/(\d+\.?\d*|[-+*/])/g);
    const numStack = [];
    const opStack = [];

    const precedence = {
      '+': 1,
      '-': 1,
      '*': 2,
      '/': 2,
    };

    const applyOperator = (operator) => {
      const b = numStack.pop();
      const a = numStack.pop();
      switch (operator) {
        case '+':
          numStack.push(a + b);
          break;
        case '-':
          numStack.push(a - b);
          break;
        case '*':
          numStack.push(a * b);
          break;
        case '/':
          numStack.push(a / b);
          break
        case '+()-':
            numStack.push(a + (-b))
          break;
        default:
          break;
      }
    };

    tokens.forEach((token) => {
      if (!isNaN(token)) {
        numStack.push(parseFloat(token));
      } else if (token in precedence) {
        while (
          opStack.length &&
          precedence[opStack[opStack.length - 1]] >= precedence[token]
        ) {
          applyOperator(opStack.pop());
        }
        opStack.push(token);
      }
    });

    while (opStack.length) {
      applyOperator(opStack.pop());
    }

    return numStack[0];
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md mx-auto">
        {/* Display Area */}
        <div className="mb-4">
          <div
            id="display"
            className="bg-black p-4 rounded-lg text-right text-xl mb-2 text-white"
          >
            {input}
          </div>
          <div className="bg-black p-4 rounded-lg text-right text-sm font-bold text-white">
            {formula}
          </div>
        </div>

        {/* Buttons */}
        <div className="grid grid-cols-4 gap-4">
          <button
            id="clear"
            className="bg-red-500 text-white p-4 col-span-2 rounded-lg text-xl hover:bg-red-700 focus:outline-none"
            onClick={handleClear}
          >
            AC
          </button>

          <button
            id="divide"
            className="bg-gray-300  text-black p-4 rounded-lg text-xl hover:bg-blue-700 focus:outline-none"
            onClick={() => handleOperator('/')}
          >
            /
          </button>
          <button
            id="multiply"
            className="bg-gray-300  text-black p-4 rounded-lg text-xl hover:bg-blue-700 focus:outline-none"
            onClick={() => handleOperator('*')}
          >
            *
          </button>

          <button
            id="seven"
            className="bg-gray-300 p-4 rounded-lg text-xl hover:bg-gray-500 focus:outline-none"
            onClick={() => handleNumber('7')}
          >
            7
          </button>
          <button
            id="eight"
            className="bg-gray-300 p-4 rounded-lg text-xl hover:bg-gray-500 focus:outline-none"
            onClick={() => handleNumber('8')}
          >
            8
          </button>
          <button
            id="nine"
            className="bg-gray-300 p-4 rounded-lg text-xl hover:bg-gray-500 focus:outline-none"
            onClick={() => handleNumber('9')}
          >
            9
          </button>
          <button
            id="subtract"
            className="bg-gray-300  text-black p-4 rounded-lg text-xl hover:bg-blue-700 focus:outline-none"
            onClick={() => handleOperator('-')}
          >
            -
          </button>

          <button
            id="four"
            className="bg-gray-300 p-4 rounded-lg text-xl hover:bg-gray-500 focus:outline-none"
            onClick={() => handleNumber('4')}
          >
            4
          </button>
          <button
            id="five"
            className="bg-gray-300 p-4 rounded-lg text-xl hover:bg-gray-500 focus:outline-none"
            onClick={() => handleNumber('5')}
          >
            5
          </button>
          <button
            id="six"
            className="bg-gray-300 p-4 rounded-lg text-xl hover:bg-gray-500 focus:outline-none"
            onClick={() => handleNumber('6')}
          >
            6
          </button>
          <button
            id="add"
            className="bg-gray-300  text-black p-4 rounded-lg text-xl hover:bg-blue-700 focus:outline-none"
            onClick={() => handleOperator('+')}
          >
            +
          </button>

          <button
            id="one"
            className="bg-gray-300 p-4 rounded-lg text-xl hover:bg-gray-500 focus:outline-none"
            onClick={() => handleNumber('1')}
          >
            1
          </button>
          <button
            id="two"
            className="bg-gray-300 p-4 rounded-lg text-xl hover:bg-gray-500 focus:outline-none"
            onClick={() => handleNumber('2')}
          >
            2
          </button>
          <button
            id="three"
            className="bg-gray-300 p-4 rounded-lg text-xl hover:bg-gray-500 focus:outline-none"
            onClick={() => handleNumber('3')}
          >
            3
          </button>

          <button
            id="equals"
            className="bg-green-500 text-white p-4 rounded-lg text-xl hover:bg-green-700 focus:outline-none row-span-2"
            onClick={handleEvaluate}
          >
            =
          </button>

          <button
            id="zero"
            className="bg-gray-300 p-4 col-span-2 rounded-lg text-xl hover:bg-gray-500 focus:outline-none"
            onClick={() => handleNumber('0')}
          >
            0
          </button>

          <button
            id="decimal"
            className="bg-gray-300 p-4 rounded-lg text-xl hover:bg-gray-500 focus:outline-none"
            onClick={handleDecimal}
          >
            .
          </button>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
