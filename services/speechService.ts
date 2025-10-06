export interface SpeechInput {
  transcript: string;
}

const defaultResponse = {
  transcript: "Paid 250 for groceries at kirana",
  intent: "add_expense",
  expense: {
    amount: 250,
    category: "Groceries",
    merchant: "unknown",
    date: "2025-09-16",
  },
  confidence: 0.92,
};

const responses: { [key: string]: any } = {
  milk: {
    transcript: "buy milk for 60 rupees",
    intent: "add_expense",
    expense: { amount: 60, category: "Groceries", merchant: "unknown", date: "2025-09-16" },
    confidence: 0.95
  },
  recharge: {
    transcript: "phone recharge kiya 500 ka",
    intent: "add_expense",
    expense: { amount: 500, category: "Bills & Utilities", merchant: "unknown", date: "2025-09-16" },
    confidence: 0.89
  }
};

export const processSpeech = async (input: SpeechInput): Promise<any> => {
  console.log("Processing speech input:", input);

  // Simulate finding a matching response or using a default
  let responseToSend;
  if (input.transcript.toLowerCase().includes('milk')) {
    responseToSend = responses.milk;
  } else if (input.transcript.toLowerCase().includes('recharge')) {
    responseToSend = responses.recharge;
  } else {
    responseToSend = defaultResponse;
  }
  
  // Update the transcript in the response to match the user's input
  responseToSend.transcript = input.transcript;

  // Simulate network delay
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(responseToSend);
    }, 1000);
  });
};
