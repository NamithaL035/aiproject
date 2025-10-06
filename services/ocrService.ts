export interface OcrInput {
  image: string; // base64 encoded image
}

const mockResponse = {
  merchant: "Reliance Fresh",
  date: "2025-09-14",
  items: [
    { name: "Amul Gold Milk 1L", qty: 2, unit_price: 68, line_total: 136, confidence: 0.99 },
    { name: "Aashirvaad Atta 10kg", qty: 1, unit_price: 450, line_total: 450, confidence: 0.97 },
    { name: "India Gate Basmati Rice 5kg", qty: 1, unit_price: 750, line_total: 750, confidence: 0.98 },
    { name: "Tomato 1kg", qty: 1, unit_price: 45, line_total: 45, confidence: 0.92 },
    { name: "Onion 1kg", qty: 2, unit_price: 30, line_total: 60, confidence: 0.94 },
    { name: "Good Life Sugar 1kg", qty: 1, unit_price: 52, line_total: 52, confidence: 0.88 },
    { name: "Parle-G Gold", qty: 5, unit_price: 10, line_total: 50, confidence: 0.99 },
    { name: "Maggi 2-Min Noodles", qty: 1, unit_price: 140, line_total: 140, confidence: 0.96 },
    { name: "Cadbury Dairy Milk Silk", qty: 2, unit_price: 80, line_total: 160, confidence: 0.95 },
  ],
  subtotal: 1843,
  tax: 92.15,
  total: 1935.15,
  raw_ocr_text: `RELIANCE FRESH
#123, 1st Main, Indiranagar, Bangalore
GSTIN: 29ABCDE1234F1Z5

Date: 14-Sep-2025 Time: 12:45 PM

Bill No: 789123

ITEM QTY RATE AMOUNT
------------------------------------
Amul Gold Milk 1L 2 68.00 136.00
Aashirvaad Atta 10kg 1 450.00 450.00
India Gate Basmati 1 750.00 750.00
Tomato 1kg 1 45.00 45.00
Onion 1kg 2 30.00 60.00
Good Life Sugar 1kg 1 52.00 52.00
Parle-G Gold 5 10.00 50.00
Maggi 2-Min Noodles 1 140.00 140.00
Cadbury Dairy Milk 2 80.00 160.00
------------------------------------
SUBTOTAL 1843.00
CGST @ 2.5% 46.07
SGST @ 2.5% 46.08
------------------------------------
TOTAL 1935.15

Thank you, visit again!
`,
};


export const extractReceiptData = async (input: OcrInput): Promise<any> => {
  console.log("Extracting receipt data from image...");
  // Simulate network delay and processing time for OCR
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockResponse);
    }, 2500);
  });
};