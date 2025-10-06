import React from 'react';
import CodeBlock from './CodeBlock';

const pythonCode = `from fastapi import FastAPI
from pydantic import BaseModel
from typing import Dict, Any
import json
from openai import OpenAI

# Initialize OpenAI + FastAPI
# Ensure your OPENAI_API_KEY is set as an environment variable
client = OpenAI()
app = FastAPI(title="AI Grocery Planner API", version="1.0")

# -------- Prompt Setup --------
SYSTEM_PROMPT = """
You are an AI-powered Grocery List Generator.
Your task: Given inputs (budget, family size, diet preference, and nutritional focus), generate a weekly grocery list.
Constraints:
- Stay within or under budget.
- Respect dietary preference (Veg, Non-Veg, Vegan).
- Ensure nutritional balance (protein, carbs, fats, fruits/vegetables).
- Output should be a structured JSON object with item, quantity, approx_cost, and category.
"""

FEW_SHOTS = [
    {
        "role": "user",
        "content": "Budget: ₹3000\\nFamily Size: 3\\nDiet: Vegetarian\\nNutritional Focus: Balanced weekly diet"
    },
    {
        "role": "assistant",
        "content": json.dumps({
            "total_budget": 3000,
            "estimated_total": 2850,
            "items": [
                {"name": "Rice", "quantity": "5 kg", "approx_cost": 400, "category": "Grains"},
                {"name": "Wheat Flour", "quantity": "5 kg", "approx_cost": 300, "category": "Grains"},
                {"name": "Toor Dal", "quantity": "2 kg", "approx_cost": 350, "category": "Pulses"},
                {"name": "Milk", "quantity": "14 liters", "approx_cost": 700, "category": "Dairy"},
                {"name": "Mixed Vegetables", "quantity": "7 kg", "approx_cost": 750, "category": "Vegetables"},
                {"name": "Fruits (Banana, Apple)", "quantity": "3 kg", "approx_cost": 350, "category": "Fruits"}
            ]
        }, indent=2)
    }
]

# -------- Request Schema --------
class GroceryRequest(BaseModel):
    budget: int
    family_size: int
    diet: str
    nutrition_focus: str

# -------- Core Function --------
def generate_grocery_list(budget, family_size, diet, nutrition_focus) -> Dict[str, Any]:
    user_prompt = f"""Budget: ₹{budget}
Family Size: {family_size}
Diet: {diet}
Nutritional Focus: {nutrition_focus}"""

    messages = [
        {"role": "system", "content": SYSTEM_PROMPT},
        *FEW_SHOTS,
        {"role": "user", "content": user_prompt}
    ]

    response = client.chat.completions.create(
        model="gpt-4o-mini",  # or gpt-4o for best accuracy
        messages=messages,
        temperature=0.3
    )

    raw_output = response.choices[0].message.content.strip()

    try:
        grocery_list = json.loads(raw_output)
    except json.JSONDecodeError:
        raise ValueError(f"Invalid JSON output from LLM: {raw_output}")

    return grocery_list

# -------- FastAPI Route --------
@app.post("/generate-grocery")
def generate_grocery(request: GroceryRequest):
    try:
        result = generate_grocery_list(
            budget=request.budget,
            family_size=request.family_size,
            diet=request.diet,
            nutrition_focus=request.nutrition_focus
        )
        return {"success": True, "data": result}
    except Exception as e:
        return {"success": False, "error": str(e)}

# To run:
# 1. pip install fastapi uvicorn openai
# 2. export OPENAI_API_KEY='your_key_here'
# 3. uvicorn filename:app --reload
`;

const LlmGroceryApi: React.FC = () => {
  return (
    <div className="space-y-4">
        <p className="text-gray-300">
            This Python script provides a complete, runnable FastAPI service for the AI Grocery Planner. It integrates the prompting strategy, defines the API request schema using Pydantic for data validation, and exposes a `/generate-grocery` endpoint. This is a production-ready asset for your backend team.
        </p>
        <CodeBlock content={pythonCode.trim()} language="python" title="services/llm_grocery_api.py" />
    </div>
  );
};

export default LlmGroceryApi;