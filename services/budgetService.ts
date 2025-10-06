export interface BudgetItem {
  source?: string;
  name?: string;
  month?: string;
  amount: number | string;
}

export interface BudgetInput {
  incomes: BudgetItem[];
  fixed_expenses: BudgetItem[];
  family_size: number | string;
  dietary_pref: string;
  recent_grocery: BudgetItem[];
  location: string;
}

const mockResponse = {
  grocery_budget: 8200,
  confidence_interval: [7400, 9000],
  breakdown: {
    staples: 2800,
    dairy: 1100,
    vegetables: 1800,
    protein: 1400,
    snacks: 1100, // Corrected from 100 to sum to 8200
  },
  rationale:
    "Uses 30% of disposable income after fixed costs, adjusted +5% due to local price index and recent spending trend. Confidence low because only 2 months of history.",
  model_info: {
    type: "BayesianLinear",
    version: "v1.0",
    mae_estimate_pct: 8.5,
  },
};

export const estimateBudget = async (input: BudgetInput): Promise<any> => {
  console.log("Estimating budget with input:", input);
  // Simulate network delay to mimic a real API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockResponse);
    }, 1500);
  });
};
