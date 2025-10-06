
import React, { useState } from 'react';
import { extractReceiptData } from '../services/ocrService';
import ResultDisplay from './ResultDisplay';
import { SpinnerIcon } from './icons';

const OcrExtractor: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<any | null>(null);

    const handleExtract = async () => {
        setLoading(true);
        setResult(null);
        const res = await extractReceiptData({ image: 'dummy_base64_string' });
        setResult(res);
        setLoading(false);
    };

    return (
        <div className="card">
            <h3 className="text-2xl font-bold mb-2 text-text-primary">Automated Receipt Scanner</h3>
            <p className="mb-6 text-text-secondary">Submit a receipt image to our AI for automated data extraction and structuring. Try it with our sample receipt!</p>
            <button onClick={handleExtract} disabled={loading} className="btn-primary w-full flex items-center justify-center disabled:opacity-50 disabled:transform-none">
                {loading && <SpinnerIcon />}
                {loading ? 'Processing...' : 'Process Sample Receipt'}
            </button>
            {result && <div className="mt-6"><ResultDisplay data={result} /></div>}
        </div>
    );
};

export default OcrExtractor;
