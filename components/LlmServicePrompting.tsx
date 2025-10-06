import React from 'react';
import CodeBlock from './CodeBlock';

const pythonCode = `import json
from openai import OpenAI

client = OpenAI()

# Few-shot system + examples for context
SYSTEM_PROMPT = """
You are an AI-powered Grocery List Generator.
Your task: Given inputs (budget, family size, diet preference, and nutritional focus), generate a weekly grocery list.
Constraints:
- Stay within or under budget.
- Respect dietary preference (Veg, Non-Veg, Vegan).
- Ensure nutritional balance (protein, carbs, fats, fruits/vegetables).
- Output should be a structured JSON object with item, quantity, approx_cost, and category.
"""

# --- Few-shot examples ---
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

def generate_grocery_list(budget, family_size, diet, nutrition_focus):
    """
    Calls the LLM to generate a structured grocery list.
    Returns parsed Python dict.
    """
    
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
        model="gpt-4o-mini",  # or "gpt-4o" for higher quality
        messages=messages,
        temperature=0.3
    )
    
    raw_output = response.choices[0].message.content.strip()
    
    try:
        grocery_list = json.loads(raw_output)
    except json.JSONDecodeError:
        raise ValueError(f"Invalid JSON output: {raw_output}")
    
    return grocery_list


# Example run
if __name__ == "__main__":
    result = generate_grocery_list(
        budget=4000,
        family_size=4,
        diet="Vegetarian",
        nutrition_focus="High protein + balanced"
    )
    print(json.dumps(result, indent=2))
`;

const LlmServicePrompting: React.FC = () => {
  return (
    <div className="space-y-4">
        <p className="text-gray-300">
            This Python script demonstrates a robust prompting strategy for the Grocery List Generator. It uses a clear system prompt to define the AI's role and constraints, combined with few-shot examples to guide the model toward the desired structured JSON output. This approach significantly improves the reliability and consistency of the AI's responses.
        </p>
        <CodeBlock content={pythonCode.trim()} language="python" title="services/llm_generator.py" />
    </div>
  );
};

export default LlmServicePrompting;