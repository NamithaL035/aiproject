export interface PantryItem {
  item: string;
  qty_kg: number | string;
}

export interface OptimizerInput {
  budget: number | string;
  family_size: number | string;
  dietary_pref: string;
  meal_plan: string[];
  pantry_inventory: PantryItem[];
  region: string;
  nutrient_constraints: {
    min_calories_per_person_per_day: number | string;
  };
}

const mockResponse = {
  shopping_list: [
    { item: "rice_5kg", qty: 1, estimated_cost: 380, nutrition_score: 7.5 },
    { item: "toor_dal_1kg", qty: 2, estimated_cost: 300, nutrition_score: 8.2 },
    { item: "atta_10kg", qty: 1, estimated_cost: 450, nutrition_score: 7.0 },
    { item: "milk_1L_packet", qty: 30, estimated_cost: 1800, nutrition_score: 8.1 },
    { item: "seasonal_vegetables_weekly_box", qty: 4, estimated_cost: 2000, nutrition_score: 9.2 },
    { item: "groundnut_oil_1L", qty: 2, estimated_cost: 400, nutrition_score: 3.0 },
    { item: "paneer_200g", qty: 4, estimated_cost: 520, nutrition_score: 8.5 },
    { item: "sugar_1kg", qty: 1, estimated_cost: 50, nutrition_score: 1.0 },
    { item: "salt_1kg", qty: 1, estimated_cost: 30, nutrition_score: 0.0 },
    { item: "basic_spices_kit", qty: 1, estimated_cost: 500, nutrition_score: 2.0 },
    { item: "fruit_basket_weekly", qty: 4, estimated_cost: 1200, nutrition_score: 8.8 },
  ],
  total_cost: 7630,
  nutrition_coverage: "95% of required calories & protein",
  reason:
    "Optimized for cost-effective protein and staple coverage; avoids perishable waste given family size",
  optimizer_info: {
    solver: "OR-Tools MIP",
    objective_value: 12345,
  },
};

export const optimizeGroceryList = async (input: OptimizerInput): Promise<any> => {
  console.log("Optimizing grocery list with input:", input);
  // Simulate network delay to mimic a real API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockResponse);
    }, 2000);
  });
};