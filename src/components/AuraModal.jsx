import React, { useState } from 'react';
import { Sparkles, X, Send, LoaderCircle } from 'lucide-react';
import { callGeminiAPI } from '../services/geminiApi';

const AuraModal = ({ isOpen, onClose, weatherContext }) => {
    const [query, setQuery] = useState('');
    const [response, setResponse] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleAsk = async () => {
        if (!query.trim()) return;
        setIsLoading(true);
        setResponse('');
        const systemInstruction = "You are Aura, a friendly and helpful AI weather assistant. Your personality is a bit witty and empathetic. Your goal is to give practical advice based on the weather context provided and the user's question.";
        const prompt = `Given the current weather context: "${weatherContext}", answer the user's question: "${query}"`;
        const result = await callGeminiAPI(prompt, systemInstruction);
        setResponse(result);
        setIsLoading(false);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="glass-panel rounded-3xl p-6 w-full max-w-lg text-white border border-white/20 flex flex-col gap-4">
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-bold flex items-center gap-2"><Sparkles className="text-yellow-300 w-5 h-5"/> Ask Aura</h2>
                    <button onClick={onClose}><X /></button>
                </div>
                <div className="flex-grow bg-black/20 rounded-lg p-4 min-h-[100px]">
                    {isLoading && <LoaderCircle className="w-6 h-6 animate-spin mx-auto mt-4" />}
                    {response && <p>{response}</p>}
                    {!isLoading && !response && <p className="text-gray-400">Ask me anything about the weather... e.g., "What should I wear today?"</p>}
                </div>
                <div className="flex items-center gap-2">
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleAsk()}
                        placeholder="Type your question..."
                        className="flex-grow bg-white/10 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/50"
                        disabled={isLoading}
                    />
                    <button onClick={handleAsk} disabled={isLoading} className="bg-white/20 p-3 rounded-lg disabled:opacity-50">
                       <Send />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AuraModal;
