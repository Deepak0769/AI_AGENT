import React, { useState } from 'react';
import API from '../../services/api';

const DietAgent = () => {
  const [goal, setGoal] = useState('weight loss');
  const [preferences, setPreferences] = useState([]);
  const [allergies, setAllergies] = useState([]);
  const [recommendation, setRecommendation] = useState(null);

  const handleGetRecommendation = async (e) => {
    e.preventDefault();
    try {
      const response = await API.post('/agent/diet/recommend', { goal, preferences, allergies });
      setRecommendation(response.data);
    } catch (error) {
      console.error('Failed to get recommendation', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleGetRecommendation} className="space-y-4">
        <select value={goal} onChange={(e) => setGoal(e.target.value)} className="select select-bordered w-full">
          <option value="weight loss">Weight Loss</option>
          <option value="muscle gain">Muscle Gain</option>
        </select>
        {/* Add checkboxes for preferences and allergies here */}
        <button type="submit" className="btn btn-secondary w-full">Get Recommendation</button>
      </form>
      {recommendation && (
        <div className="mt-4">
          <h3 className="font-bold">{recommendation.plan_name}</h3>
          <ul className="list-disc pl-5">
            {recommendation.meals.map((meal, index) => (
              <li key={index}>
                <strong>{meal.meal}:</strong> {meal.description}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DietAgent;
