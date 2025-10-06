export interface PastSpend {
  month: string;
  grocery: number | string;
}

export interface PersonalizationInput {
  user_id: string;
  past_6_months: PastSpend[];
  brands_preference: string[];
  pantry: string[];
  budget: number | string;
}

const mockResponse = {
  recommendations: [
    {
      type: "brand_switch",
      from: "Aashirvaad Select Atta 5kg",
      to: "Local Mill Fresh Atta 5kg",
      expected_saving: 120,
      confidence: 0.8,
      why: "Comparable quality, 15% cheaper in local stores based on price tracking.",
    },
    {
      type: "bulk_buy",
      item: "Groundnut Oil",
      suggestion: "Buy 5L can instead of 1L pouch",
      expected_saving: 85,
      confidence: 0.95,
      why: "5L can offers a 20% lower price per litre and is a pantry staple.",
    },
    {
      type: "behavioral_nudge",
      suggestion: "Reduce impulse buys on snacks and beverages",
      expected_saving: 245,
      confidence: 0.7,
      why: "Analysis shows 15% of your grocery spend is on high-margin, low-nutrition items.",
    },
  ],
  estimated_monthly_savings: 450,
  explainability:
    "Switching staples to quality generics and buying larger packs of non-perishables reduces unit cost. Avoiding high-margin branded snacks offers significant savings.",
};

export const getRecommendations = async (input: PersonalizationInput): Promise<any> => {
  console.log("Getting personalization recommendations with input:", input);
  // Simulate network delay to mimic a real API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockResponse);
    }, 1800);
  });
};
