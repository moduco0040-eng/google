import React, { useState } from 'react';
import { Operator } from './types';
import CalculatorButton from './components/CalculatorButton';

const App: React.FC = () => {
  const [displayValue, setDisplayValue] = useState<string>('0');
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operator, setOperator] = useState<Operator | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState<boolean>(true);

  const calculate = (val1: number, val2: number, op: Operator): number => {
    switch (op) {
      case Operator.ADD:
        return val1 + val2;
      case Operator.SUBTRACT:
        return val1 - val2;
      case Operator.MULTIPLY:
        return val1 * val2;
      case Operator.DIVIDE:
        return val1 / val2;
      default:
        return val2;
    }
  };

  const handleNumberClick = (num: string) => {
    if (waitingForOperand) {
      setDisplayValue(num);
      setWaitingForOperand(false);
    } else {
      setDisplayValue(displayValue === '0' ? num : displayValue + num);
    }
  };

  const handleDecimalClick = () => {
    if (waitingForOperand) {
      setDisplayValue('0.');
      setWaitingForOperand(false);
      return;
    }
    if (!displayValue.includes('.')) {
      setDisplayValue(displayValue + '.');
    }
  };

  const handleOperatorClick = (op: Operator) => {
    const currentValue = parseFloat(displayValue);

    if (previousValue !== null && operator) {
      const result = calculate(previousValue, currentValue, operator);
      setDisplayValue(String(result));
      setPreviousValue(result);
    } else {
      setPreviousValue(currentValue);
    }

    setWaitingForOperand(true);
    setOperator(op);
  };
  
  const handleEqualsClick = () => {
    const currentValue = parseFloat(displayValue);
    if (previousValue !== null && operator) {
      const result = calculate(previousValue, currentValue, operator);
      setDisplayValue(String(result));
      setPreviousValue(null);
      setOperator(null);
      setWaitingForOperand(true);
    }
  };

  const handleClearClick = () => {
    setDisplayValue('0');
    setPreviousValue(null);
    setOperator(null);
    setWaitingForOperand(true);
  };

  const handleSignChange = () => {
    setDisplayValue(String(parseFloat(displayValue) * -1));
  };

  const handlePercent = () => {
    setDisplayValue(String(parseFloat(displayValue) / 100));
  };


  return (
    <div className="min-h-screen flex items-center justify-center p-4 font-sans">
      <div className="w-full max-w-xs md:max-w-sm mx-auto">
        <div className="bg-white/50 backdrop-blur-xl rounded-[2.5rem] shadow-2xl overflow-hidden border-2 border-white/30">
          <div className="p-6 text-right bg-gray-800">
            <p 
              className="text-white text-5xl md:text-6xl font-medium break-all"
              style={{ minHeight: '64px' }}
            >
              {displayValue}
            </p>
          </div>
          <div className="grid grid-cols-4 gap-2 p-4">
            {/* Row 1 */}
            <CalculatorButton onClick={handleClearClick} className="bg-indigo-400 hover:bg-indigo-500 text-white">C</CalculatorButton>
            <CalculatorButton onClick={handleSignChange} className="bg-indigo-400 hover:bg-indigo-500 text-white">+/-</CalculatorButton>
            <CalculatorButton onClick={handlePercent} className="bg-indigo-400 hover:bg-indigo-500 text-white">%</CalculatorButton>
            <CalculatorButton onClick={() => handleOperatorClick(Operator.DIVIDE)} className="bg-cyan-400 hover:bg-cyan-500 text-white">{Operator.DIVIDE}</CalculatorButton>
            
            {/* Row 2 */}
            <CalculatorButton onClick={() => handleNumberClick('7')}>7</CalculatorButton>
            <CalculatorButton onClick={() => handleNumberClick('8')}>8</CalculatorButton>
            <CalculatorButton onClick={() => handleNumberClick('9')}>9</CalculatorButton>
            <CalculatorButton onClick={() => handleOperatorClick(Operator.MULTIPLY)} className="bg-cyan-400 hover:bg-cyan-500 text-white">{Operator.MULTIPLY}</CalculatorButton>
            
            {/* Row 3 */}
            <CalculatorButton onClick={() => handleNumberClick('4')}>4</CalculatorButton>
            <CalculatorButton onClick={() => handleNumberClick('5')}>5</CalculatorButton>
            <CalculatorButton onClick={() => handleNumberClick('6')}>6</CalculatorButton>
            <CalculatorButton onClick={() => handleOperatorClick(Operator.SUBTRACT)} className="bg-cyan-400 hover:bg-cyan-500 text-white">{Operator.SUBTRACT}</CalculatorButton>

            {/* Row 4 */}
            <CalculatorButton onClick={() => handleNumberClick('1')}>1</CalculatorButton>
            <CalculatorButton onClick={() => handleNumberClick('2')}>2</CalculatorButton>
            <CalculatorButton onClick={() => handleNumberClick('3')}>3</CalculatorButton>
            <CalculatorButton onClick={() => handleOperatorClick(Operator.ADD)} className="bg-cyan-400 hover:bg-cyan-500 text-white">{Operator.ADD}</CalculatorButton>

            {/* Row 5 */}
            <CalculatorButton onClick={() => handleNumberClick('0')} className="col-span-2">0</CalculatorButton>
            <CalculatorButton onClick={handleDecimalClick}>.</CalculatorButton>
            <CalculatorButton onClick={handleEqualsClick} className="bg-rose-500 hover:bg-rose-600 text-white">=</CalculatorButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;