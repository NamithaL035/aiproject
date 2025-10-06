import React from 'react';
import CodeBlock from './CodeBlock';

const dataSchemaContent = `
CREATE TABLE users (
  id UUID PRIMARY KEY,
  email TEXT UNIQUE,
  created_at TIMESTAMP,
  profile JSONB
);

CREATE TABLE expenses (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  date DATE,
  amount NUMERIC,
  category TEXT,
  merchant TEXT,
  meta JSONB
);

CREATE TABLE grocery_items (
  id SERIAL PRIMARY KEY,
  canonical_name TEXT,
  variants JSONB, -- mapping of retailer SKUs/names
  nutrition JSONB
);

CREATE TABLE price_history (
  id SERIAL PRIMARY KEY,
  item_id INT REFERENCES grocery_items(id),
  source TEXT,
  price NUMERIC,
  currency TEXT,
  location TEXT,
  recorded_at TIMESTAMP
);
`;

const DataSchema: React.FC = () => {
  return (
    <div>
        <CodeBlock content={dataSchemaContent.trim()} language="sql" />
    </div>
  );
};

export default DataSchema;
