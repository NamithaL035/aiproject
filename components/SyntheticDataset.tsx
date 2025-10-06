import React from 'react';
import CodeBlock from './CodeBlock';

const csvContent = `item_id,name,unit,unit_qty,unit_price,calories,protein,fiber,perishability,category
rice_5kg,Rice 5kg,5kg,5,380,18000,360,40,0.1,staple
dal_1kg,Dal 1kg,1kg,1,120,3400,220,10,0.2,protein
milk_1l,Milk 1L,1l,1,60,640,32,0,0.7,dairy
veg_mixed_1kg,Vegetables Mixed 1kg,1kg,1,40,300,10,8,0.9,vegetable
eggs_12, Eggs (12),12pcs,12,120,1560,132,0,0.8,protein
oil_1l,Oil 1L,1l,1,220,9000,0,0,0.1,staple
snacks_pack,Snacks Pack,1pack,1,80,500,5,2,0.2,snack
atta_5kg,Atta 5kg,5kg,5,350,17000,300,35,0.1,staple`;

const jsonContent = `{
  "items": [
    {"item_id":"rice_5kg","name":"Rice 5kg","unit":"5kg","unit_qty":5,"unit_price":380.0,"nutrition":{"calories":18000,"protein":360,"fiber":40},"perishability":0.1,"category":"staple"},
    {"item_id":"dal_1kg","name":"Dal 1kg","unit":"1kg","unit_qty":1,"unit_price":120.0,"nutrition":{"calories":3400,"protein":220,"fiber":10},"perishability":0.2,"category":"protein"},
    {"item_id":"milk_1l","name":"Milk 1L","unit":"1l","unit_qty":1,"unit_price":60.0,"nutrition":{"calories":640,"protein":32,"fiber":0},"perishability":0.7,"category":"dairy"},
    {"item_id":"veg_mixed_1kg","name":"Vegetables Mixed 1kg","unit":"1kg","unit_qty":1,"unit_price":40.0,"nutrition":{"calories":300,"protein":10,"fiber":8},"perishability":0.9,"category":"vegetable"},
    {"item_id":"eggs_12","name":"Eggs (12)","unit":"12pcs","unit_qty":12,"unit_price":120.0,"nutrition":{"calories":1560,"protein":132,"fiber":0},"perishability":0.8,"category":"protein"},
    {"item_id":"oil_1l","name":"Oil 1L","unit":"1l","unit_qty":1,"unit_price":220.0,"nutrition":{"calories":9000,"protein":0,"fiber":0},"perishability":0.1,"category":"staple"},
    {"item_id":"snacks_pack","name":"Snacks Pack","unit":"1pack","unit_qty":1,"unit_price":80.0,"nutrition":{"calories":500,"protein":5,"fiber":2},"perishability":0.2,"category":"snack"},
    {"item_id":"atta_5kg","name":"Atta 5kg","unit":"5kg","unit_qty":5,"unit_price":350.0,"nutrition":{"calories":17000,"protein":300,"fiber":35},"perishability":0.1,"category":"staple"}
  ]
}`;

const SyntheticDataset: React.FC = () => {
  return (
    <div className="space-y-4">
        <p className="text-gray-300">
            This dataset is used for developing and testing the AI models, particularly the Grocery Optimizer. It contains item details including pricing and nutritional information.
        </p>
        <CodeBlock content={csvContent.trim()} language="csv" title="data/synthetic_prices.csv" />
        <CodeBlock content={jsonContent.trim()} language="json" title="data/synthetic_prices.json" />
    </div>
  );
};

export default SyntheticDataset;