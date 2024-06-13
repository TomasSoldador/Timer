import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './globals.css';

function App() {

  const calculateMillisecondsLeft = () => {
    const targetDate = new Date('2024-07-15T00:00:00');
    const now = new Date();
    const difference = targetDate - now;

    return difference > 0 ? difference : 0;
  };
  
  const calculateDaysLeft = () => {
    const millisecondsLeft = calculateMillisecondsLeft();
    const days = Math.floor(millisecondsLeft / (24 * 60 * 60 * 1000));
    return days;
  };

  const [millisecondsLeft, setMillisecondsLeft] = useState(calculateMillisecondsLeft());
  const [daysLeft, setDaysLeft] = useState(calculateDaysLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      const msLeft = calculateMillisecondsLeft();
      setMillisecondsLeft(msLeft);
      setDaysLeft(calculateDaysLeft());
      document.title = `${msLeft} ms restantes`;
    }, 1);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-black text-white">
      <div className="text-center p-8 bg-orange-600 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold mb-4">Contagem Regressiva</h1>
        <p className="text-xl mb-8">para 15/07/2024</p>
        {millisecondsLeft > 0 ? (
          <div className="countdown-info">
            <div className="countdown-days text-3xl font-semibold mb-4">{daysLeft} <span className="text-xl font-normal">dias</span></div>
            <div className="countdown-milliseconds text-2xl">{millisecondsLeft} <span className="text-xl font-normal">milissegundos</span></div>
          </div>
        ) : (
          <div className="text-3xl font-semibold">É HOJE!</div>
        )}
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
    <App />
);
