import React, { useState } from 'react';
import api from '../../services/api';

const TravelAgent = () => {
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');
    const [date, setDate] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSearch = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSearchResults([]);
        try {
            const response = await api.post('/agent/travel/search', {
                from_location: from,
                to_location: to,
                date: date,
                priority: "time" // Or could be "cost", "comfort" etc.
            });
            setSearchResults(response.data.results);
        } catch (err) {
            setError('Failed to fetch travel options. Please try again.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleAddToCalendar = async (result) => {
        try {
            await api.post('/agent/travel/schedule', {
                travel_details: result
            });
            alert('Successfully added to calendar!');
        } catch (err) {
            alert('Failed to add to calendar. You may need to authorize Google Calendar access first.');
            console.error(err);
        }
    };

    return (
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full">
            <h2 className="text-2xl font-bold mb-4 text-white">Travel Planner Agent</h2>
            <form onSubmit={handleSearch}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div>
                        <label htmlFor="from" className="block text-sm font-medium text-gray-300">From</label>
                        <input
                            type="text"
                            id="from"
                            value={from}
                            onChange={(e) => setFrom(e.target.value)}
                            className="mt-1 block w-full bg-gray-700 border-gray-600 text-white rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2"
                            placeholder="e.g., New York, NY"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="to" className="block text-sm font-medium text-gray-300">To</label>
                        <input
                            type="text"
                            id="to"
                            value={to}
                            onChange={(e) => setTo(e.target.value)}
                            className="mt-1 block w-full bg-gray-700 border-gray-600 text-white rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2"
                            placeholder="e.g., Los Angeles, CA"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="date" className="block text-sm font-medium text-gray-300">Date</label>
                        <input
                            type="date"
                            id="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            className="mt-1 block w-full bg-gray-700 border-gray-600 text-white rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2"
                            required
                        />
                    </div>
                </div>
                <button
                    type="submit"
                    className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    disabled={loading}
                >
                    {loading ? 'Searching...' : 'Search'}
                </button>
            </form>
            {error && <p className="mt-4 text-red-500">{error}</p>}
            <div className="mt-6">
                {searchResults.length > 0 && (
                    <div className="space-y-4">
                        <h3 className="text-xl font-semibold text-white">Search Results</h3>
                        {searchResults.map((result, index) => (
                            <div key={index} className="bg-gray-700 p-4 rounded-lg flex justify-between items-center">
                                <div>
                                    <p className="text-white"><strong>Flight:</strong> {result.flight_number}</p>
                                    <p className="text-gray-300"><strong>Departure:</strong> {new Date(result.departure_time).toLocaleString()}</p>
                                    <p className="text-gray-300"><strong>Arrival:</strong> {new Date(result.arrival_time).toLocaleString()}</p>
                                    <p className="text-white font-bold mt-2">Price: ${result.price}</p>
                                </div>
                                <button
                                    onClick={() => handleAddToCalendar(result)}
                                    className="bg-green-600 text-white py-1 px-3 rounded-md hover:bg-green-700"
                                >
                                    Add to Calendar
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default TravelAgent;
