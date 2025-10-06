export interface QuoterItem {
  item: string;
  qty: number | string;
}

export interface QuoterInput {
  items: QuoterItem[];
  location: string;
  delivery_option: string;
}

const mockResponse = {
  quote_total: 685,
  items: [
    {
      item: "rice_5kg",
      est_price: 380,
      ci: [360, 400],
      sources: ["BigBasket(₹399)", "local_kirana_avg(₹370)"],
    },
    {
      item: "milk_1l",
      est_price: 305, // 61 * 5
      ci: [295, 315],
      sources: ["Zepto(₹62)", "Blinkit(₹60)", "local_dairy_avg(₹61)"],
    },
  ],
  currency: "INR",
  timestamp: new Date().toISOString(),
  confidence_score: 0.86,
  notes:
    "Prices aggregated from BigBasket API, local crowdsourced entries, and historical averages. Local kirana estimate weighted more for non-branded items.",
};

export const quotePrices = async (input: QuoterInput): Promise<any> => {
  console.log("Quoting prices with input:", input);
  // Simulate network delay to mimic a real API call
  return new Promise((resolve) => {
    setTimeout(() => {
      // We can add logic here to make the mock response more dynamic if needed
      resolve(mockResponse);
    }, 1200);
  });
};
