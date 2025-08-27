import React from 'react';
import TradingAgent from './agents/TradingAgent';
import DietAgent from './agents/DietAgent';
import TravelAgent from './agents/TravelAgent';

const Dashboard = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">AI Agents Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Trading Agent</h2>
            <TradingAgent />
          </div>
        </div>
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Diet Agent</h2>
            <DietAgent />
          </div>
        </div>
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Travel Agent</h2>
            <TravelAgent />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
