'use client';

import { useState } from 'react';
import { processCrypto } from './actions';

export default function CryptoTestPage() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState<{ hash?: string; decrypted?: string; error?: string } | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input) return;
    setLoading(true);
    setResult(null);
    try {
      const res = await processCrypto(input);
      setResult(res);
    } catch (err: any) {
      setResult({ error: err.message || 'An error occurred' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-8 flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-8">Crypto Test Page</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-slate-900 p-6 rounded-lg border border-slate-800 shadow-xl">
        <label className="block text-sm font-medium text-slate-300 mb-2">Text to Encrypt:</label>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full p-3 rounded-md bg-slate-950 border border-slate-700 text-white mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          placeholder="Enter a string..."
          required
        />
        <button
          type="submit"
          disabled={loading || !input}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Processing...' : 'Encrypt & Decrypt'}
        </button>
      </form>

      {result && (
        <div className="w-full max-w-md mt-8 space-y-4">
          {result.error ? (
            <div className="p-4 bg-red-950/50 border border-red-900 rounded-lg text-red-400">
              <span className="font-semibold block mb-1">Error:</span> {result.error}
            </div>
          ) : (
            <>
              <div className="p-4 bg-slate-900/80 border border-slate-800 rounded-lg break-all">
                <h2 className="text-xs uppercase tracking-wider font-semibold text-slate-500 mb-2">Encrypted Hash</h2>
                <p className="font-mono text-sm text-green-400">{result.hash}</p>
              </div>
              <div className="p-4 bg-slate-900/80 border border-slate-800 rounded-lg break-all">
                <h2 className="text-xs uppercase tracking-wider font-semibold text-slate-500 mb-2">Decrypted Text</h2>
                <p className="font-mono text-sm text-blue-400">{result.decrypted}</p>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
