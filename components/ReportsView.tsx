
import React from 'react';
import OcrExtractor from './OcrExtractor';

const ReportsView: React.FC = () => {
    return (
        <div className="space-y-12">
            <h1 className="text-4xl font-extrabold text-text-primary text-center">Transactions & Reports</h1>
            
            <div className="card">
                <h3 className="text-2xl font-bold mb-2 text-text-primary">Generate a New Report</h3>
                <p className="text-text-secondary mb-6">Export your expense data for a specific period.</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
                    <div>
                        <label className="block text-sm font-semibold text-text-secondary mb-2">Report Type</label>
                        <select className="form-input appearance-none">
                            <option>Monthly Expense Summary</option>
                            <option>Category Breakdown</option>
                            <option>Tax Report</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-text-secondary mb-2">Date Range</label>
                        <input type="date" className="form-input" />
                    </div>
                    <div>
                        <button className="btn-primary w-full">
                            Export Report
                        </button>
                    </div>
                </div>
            </div>
            <OcrExtractor />
        </div>
    );
};

export default ReportsView;
