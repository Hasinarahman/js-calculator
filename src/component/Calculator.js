import React, { useState } from 'react';

const Calculator = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');

  // Function to handle button clicks
  const handleClick = (value) => {
    if (value === '=') {
      try {
        setResult(eval(input)); // Evaluate the input expression
      } catch (error) {
        setResult('Error');
      }
    } else if (value === 'AC') {
      setInput(''); // Clear all input
      setResult(''); // Clear result
    } else if (value === 'C') {
      setInput(input.slice(0, -1)); // Delete the last character
    } else {
      setInput(input + value); // Add clicked value to input
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg max-w-md mx-auto">
      {/* Display Area */}
      <div className="mb-4">
        <div className="bg-gray-200 p-4 rounded-lg text-right text-xl mb-2">
          {input || '0'}
        </div>
        <div className="bg-gray-400 p-4 rounded-lg text-right text-2xl font-bold">
          {result || '0'}
        </div>
      </div>

      {/* Buttons */}
      <div className="grid grid-cols-4 gap-4">
        {/* Number and Operator Buttons */}
        {['7', '8', '9', '/', '4', '5', '6', '*', '1', '2', '3', '-', '0', '.', '=', '+'].map((button) => (
          <button
            key={button}
            className="bg-blue-500 text-white p-4 rounded-lg text-xl hover:bg-blue-700 focus:outline-none"
            onClick={() => handleClick(button)}
          >
            {button}
          </button>
        ))}

        {/* Clear and Delete buttons */}
        <button
          className="bg-red-500 text-white p-4 col-span-2 rounded-lg text-xl hover:bg-red-700 focus:outline-none"
          onClick={() => handleClick('AC')}
        >
          AC
        </button>
        <button
          className="bg-yellow-500 text-white p-4 rounded-lg text-xl hover:bg-yellow-700 focus:outline-none"
          onClick={() => handleClick('C')}
        >
          C
        </button>
      </div>
    </div>
  );
};

export default Calculator;
