
import React, { useState } from 'react';
import { processSpeech } from '../services/speechService';
import ResultDisplay from './ResultDisplay';
import { SpinnerIcon } from './icons';

const SpeechIntent: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<any | null>(null);
    const [transcript, setTranscript] = useState('buy milk for 60 rupees');

    const handleProcess = async () => {
        setLoading(true);
        setResult(null);
        const res = await processSpeech({ transcript });
        setResult(res);
        setLoading(false);
    };

    return (
        <div className="card">
            <h3 className="text-2xl font-bold mb-2 text-text-primary">Voice Command Parser</h3>
            <p className="mb-6 text-text-secondary">Simulate processing a voice command transcript to extract user intent and entities. Type a command below and see the AI work.</p>
            <div className="space-y-4">
                <input type="text" value={transcript} onChange={e => setTranscript(e.target.value)} className="form-input" />
                <button onClick={handleProcess} disabled={loading} className="btn-primary w-full flex items-center justify-center disabled:opacity-50 disabled:transform-none">
                    {loading && <SpinnerIcon />}
                    {loading ? 'Processing...' : 'Process Transcript'}
                </button>
            </div>
            {result && <div className="mt-6"><ResultDisplay data={result} /></div>}
        </div>
    );
};

export default SpeechIntent;
