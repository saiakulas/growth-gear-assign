import React, { useState } from 'react';
import { Provider } from 'react-redux';
import { createSlice, configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

// Rest of your code remains the same

// Redux Slice for Query Management
const querySlice = createSlice({
  name: 'query',
  initialState: {
    queryHistory: [],
    currentQuery: '',
    isProcessing: false,
    results: null,
    error: null
  },
  reducers: {
    setQuery: (state, action) => {
      state.currentQuery = action.payload;
    },
    submitQuery: (state) => {
      state.isProcessing = true;
      state.error = null;
    },
    processQuerySuccess: (state, action) => {
      state.isProcessing = false;
      state.results = action.payload;
      state.queryHistory.push({
        query: state.currentQuery,
        timestamp: new Date().toLocaleString()
      });
    },
    processQueryFailure: (state, action) => {
      state.isProcessing = false;
      state.error = action.payload;
    }
  }
});

// Create Redux store
const store = configureStore({
  reducer: {
    query: querySlice.reducer
  }
});

// Export actions
export const { 
  setQuery, 
  submitQuery, 
  processQuerySuccess, 
  processQueryFailure 
} = querySlice.actions;

// Mock AI Suggestions
const aiSuggestions = [
  'Sales performance by region',
  'Customer retention rate',
  'Monthly revenue trends',
  'Product category analysis'
];

// Main Dashboard Component
const GenAIDashboard = () => {
  const dispatch = useDispatch();
  const { 
    queryHistory, 
    currentQuery, 
    isProcessing, 
    results, 
    error 
  } = useSelector((state) => state.query);
  
  const [suggestions, setSuggestions] = useState([]);

  // Simulated query processing
  const handleQuerySubmit = () => {
    dispatch(submitQuery());
    
    // Simulate AI processing with mock data
    const mockResults = {
      type: 'line',
      data: [
        { month: 'Jan', revenue: 4000 },
        { month: 'Feb', revenue: 3000 },
        { month: 'Mar', revenue: 5000 },
        { month: 'Apr', revenue: 4500 },
      ]
    };

    // Dispatch success action
    dispatch(processQuerySuccess(mockResults));
  };

  // AI-powered suggestion logic
  const handleQueryChange = (value) => {
    dispatch(setQuery(value));
    const filteredSuggestions = aiSuggestions.filter(suggestion => 
      suggestion.toLowerCase().includes(value.toLowerCase())
    );
    setSuggestions(filteredSuggestions);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Gen AI Analytics Dashboard
        </h1>

        {/* Query Input with AI Suggestions */}
        <div className="mb-4 relative">
          <input 
            type="text"
            value={currentQuery}
            onChange={(e) => handleQueryChange(e.target.value)}
            placeholder="Ask a business question..."
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {suggestions.length > 0 && (
            <div className="absolute z-10 w-full bg-white border rounded-lg mt-1 shadow-lg">
              {suggestions.map((suggestion, index) => (
                <div 
                  key={index} 
                  className="p-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleQueryChange(suggestion)}
                >
                  {suggestion}
                </div>
              ))}
            </div>
          )}
          <button 
            onClick={handleQuerySubmit}
            className="mt-2 w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
          >
            Submit Query
          </button>
        </div>

        {/* Query History */}
        <div className="mb-4">
          <h2 className="text-lg font-semibold mb-2">Query History</h2>
          <div className="bg-gray-50 p-3 rounded-lg max-h-40 overflow-y-auto">
            {queryHistory.map((item, index) => (
              <div key={index} className="border-b last:border-b-0 py-2">
                <p className="text-sm">{item.query}</p>
                <p className="text-xs text-gray-500">{item.timestamp}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Results Visualization */}
        {results && (
          <div className="mt-6">
            <h2 className="text-lg font-semibold mb-4">Query Results</h2>
            <LineChart width={600} height={300} data={results.data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="revenue" stroke="#8884d8" />
            </LineChart>
          </div>
        )}

        {/* Loading and Error States */}
        {isProcessing && (
          <div className="text-center text-blue-500 mt-4">
            Processing your query...
          </div>
        )}
        {error && (
          <div className="text-center text-red-500 mt-4">
            {error}
          </div>
        )}
      </div>
    </div>
  );
};

// Wrapper Component with Redux Provider
const App = () => {
  return (
    <Provider store={store}>
      <GenAIDashboard />
    </Provider>
  );
};

export default App;