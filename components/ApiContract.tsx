import React from 'react';
import CodeBlock from './CodeBlock';

const apiContractContent = `
POST /api/v1/estimate-budget
Req: {user, incomes, fixed_expenses, family_size, dietary_pref, recent_grocery, location}
Res: {grocery_budget, confidence_interval, breakdown, model_info, rationale}

POST /api/v1/generate-list
Req: {budget, family_size, dietary_pref, pantry_inventory, region, price_estimates}
Res: {shopping_list, total_cost, nutrition_coverage, optimizer_info, confidence}

POST /api/v1/quote
Req: {items[], location, delivery_option}
Res: {quote_total, items:[{est_price, ci, sources}], confidence_score, timestamp}

POST /api/v1/receipt-extract
Req: {image_base64, user_id}
Res: {merchant, date, items[], subtotal, tax, total, raw_ocr_text}

POST /api/v1/voice
Req: {audio_base64, language_hint, user_id}
Res: {transcript, intent, expense, confidence}

Each response must include model_version, latency_ms, explainability and confidence.
`;

const ApiContract: React.FC = () => {
  return (
    <div>
        <CodeBlock content={apiContractContent.trim()} language="yaml" />
    </div>
  );
};

export default ApiContract;
