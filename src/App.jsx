import React, { useState } from 'react';
import { generateLawResponse } from './ai/client';

export default function App() {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    
    setLoading(true);
    setResponse('');
    try {
      const result = await generateLawResponse(query);
      setResponse(result);
    } catch (err) {
      setResponse('Error fetching response. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 flex flex-col items-center p-4">
      <header className="w-full max-w-3xl py-6 text-center border-b border-gray-800 mb-6">
        <h1 className="text-2xl font-bold text-emerald-400">UAE Law AI Assistant</h1>
        <p className="text-sm text-gray-400 mt-1">Your intelligent guide to UAE legal framework</p>
      </header>

      <main className="w-full max-w-3xl flex-1 flex flex-col gap-6">
        <form onSubmit={handleSearch} className="flex gap-2">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ask a question about UAE law..."
            className="flex-1 bg-gray-900 border border-gray-800 rounded-lg px-4 py-3 text-gray-100 focus:outline-none focus:border-emerald-500"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-emerald-600 hover:bg-emerald-500 text-white font-medium px-6 py-3 rounded-lg transition disabled:opacity-50"
          >
            {loading ? 'Thinking...' : 'Ask AI'}
          </button>
        </form>

        {response && (
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 whitespace-pre-wrap leading-relaxed">
            <h2 className="text-sm font-semibold text-emerald-400 mb-2 uppercase tracking-wider">Answer:</h2>
            {response}
          </div>
        )}
      </main>
    </div>
  );
}
