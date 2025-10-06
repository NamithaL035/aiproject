import React from 'react';
import CodeBlock from './CodeBlock';

const metricsContent = `
Budget Estimator MAE ≤ 15% on holdout; CI coverage ≥ 88%.

Price Quoter MAPE ≤ 10% vs real receipts.

OCR total & date accuracy ≥ 95%.

Grocery Optimizer: nutrition coverage ≥ 90% & cost ≤ budget.

Voice intent accuracy ≥ 95%; amount extraction ≥ 98%.

User UX: onboarding completion rate ≥ 70% in pilot; retained weekly active users > 20% after 2 weeks.
`;

const EvaluationMetrics: React.FC = () => {
  return (
    <div>
      <CodeBlock content={metricsContent.trim()} language="plaintext" />
    </div>
  );
};

export default EvaluationMetrics;
