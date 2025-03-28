
⬇
Gen AI Analytics Dashboard
Project Overview
The Gen AI Analytics Dashboard is a React-based web application that provides an interactive, AI-powered analytics experience. It allows users to submit queries, receive AI-generated insights, and visualize data through an intuitive interface.
Features

🔍 AI-Powered Query Suggestions
📊 Dynamic Data Visualization
📜 Query History Tracking
🚀 Real-time Processing Feedback
📈 Interactive Line Chart Visualization

Prerequisites
Before you begin, ensure you have the following installed:

Node.js (v14.0.0 or later)
npm (v6.0.0 or later)

Technology Stack

React
Redux Toolkit
Recharts
Tailwind CSS

Installation

Clone the repository

bashCopygit clone https://github.com/your-username/gen-ai-analytics-dashboard.git
cd gen-ai-analytics-dashboard

Install dependencies

bashCopynpm install

Install additional required packages

bashCopynpm install @reduxjs/toolkit react-redux recharts tailwindcss
Configuration
Redux Setup
The project uses Redux Toolkit for state management. The main slice (querySlice) manages:

Current query
Query history
Processing state
Results
Error handling

AI Suggestions
The dashboard includes mock AI suggestions:

Sales performance by region
Customer retention rate
Monthly revenue trends
Product category analysis

Running the Application
Start the development server:
bashCopynpm run dev

Key Components
Query Input

Supports real-time AI-powered suggestions
Allows users to input business questions
Provides instant suggestion filtering

Query History

Tracks and displays previous queries
Shows timestamp for each query
Scrollable history section

Results Visualization

Uses Recharts for interactive line charts
Displays mock data visualization
Responsive design

State Management
Uses Redux Toolkit with the following actions:

setQuery: Update current query
submitQuery: Initiate query processing
processQuerySuccess: Handle successful query
processQueryFailure: Handle query errors

Customization
Extending AI Suggestions
Modify the aiSuggestions array in the code to add or remove suggestions:
javascriptCopyconst aiSuggestions = [
  'New suggestion 1',
  'New suggestion 2',
  // Add more suggestions
];
Mock Data
Replace the mockResults in handleQuerySubmit with your actual data processing logic.
Known Limitations

Currently uses mock data
Suggestions are predefined
No actual backend AI integration

Future Improvements

Integrate actual AI query processing
Add more chart types
Implement backend data fetching
Enhance error handling
Add user authentication
