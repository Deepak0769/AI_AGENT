import React, { useState, useEffect } from 'react';
import API from '../../services/api';

const TradingAgent = () => {
  const [ticker, setTicker] = useState('');
  const [action, setAction] = useState('BUY');
  const [quantity, setQuantity] = useState(1);
  const [history, setHistory] = useState([]);

  const fetchHistory = async () => {
    try {
      const response = await API.get('/agent/trade/history');
      setHistory(response.data);
    } catch (error) {
      console.error('Failed to fetch trade history', error);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const handleExecute = async (e) => {
    e.preventDefault();
    try {
      await API.post('/agent/trade/execute', { ticker_symbol: ticker, action, quantity });
      fetchHistory(); // Refresh history after trade
    } catch (error) {
      console.error('Trade execution failed', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleExecute} className="space-y-4">
        <input
          type="text"
          placeholder="Ticker Symbol"
          value={ticker}
          onChange={(e) => setTicker(e.target.value)}
          className="input input-bordered w-full"
        />
        <select value={action} onChange={(e) => setAction(e.target.value)} className="select select-bordered w-full">
          <option>BUY</option>
          <option>SELL</option>
        </select>
        <input
          type="number"
          placeholder="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(parseInt(e.target.value))}
          className="input input-bordered w-full"
        />
        <button type="submit" className="btn btn-secondary w-full">Execute Trade</button>
      </form>
      <div className="mt-4">
        <h3 className="font-bold">Trade History</h3>
        <ul className="list-disc pl-5">
          {history.map((trade, index) => (
            <li key={index}>
              {trade.action} {trade.quantity} of {trade.ticker_symbol} at ${trade.price}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TradingAgent;
