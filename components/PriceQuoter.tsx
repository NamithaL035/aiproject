
import React, { useState } from 'react';
import { quotePrices, QuoterInput } from '../services/quoterService';
import ResultDisplay from './ResultDisplay';
import { SpinnerIcon } from './icons';

const PriceQuoter: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<any | null>(null);

    const handleQuote = async () => {
        setLoading(true);
        setResult(null);
        const dummyInput: QuoterInput = {
            items: [{ item: 'rice_5kg', qty: 1 }, { item: 'milk_1l', qty: 5 }],
            location: 'Bangalore',
            delivery_option: 'instant'
        };
        const res = await quotePrices(dummyInput);
        setResult(res);
        setLoading(false);
    };

    return (
        <div>
            <h3 className="text-xl font-bold mb-2 text-text-primary">Price Quotation Service</h3>
            <p className="mb-6 text-text-secondary text-sm">Query real-time price estimates for a list of items from aggregated data sources.</p>
            <button onClick={handleQuote} disabled={loading} className="btn-primary w-full flex items-center justify-center disabled:opacity-50 disabled:transform-none">
                 {loading && <SpinnerIcon />}
                {loading ? 'Querying...' : 'Execute Quote'}
            </button>
            {result && <div className="mt-6"><ResultDisplay data={result} /></div>}
        </div>
    );
};

export default PriceQuoter;
