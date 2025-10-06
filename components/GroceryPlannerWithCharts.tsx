import React from 'react';
import CodeBlock from './CodeBlock';

const groceryPlannerWithChartsCode = `import React, { useState, useCallback } from "react";
import { 
  View, 
  Text, 
  TextInput, 
  Button, 
  FlatList, 
  ActivityIndicator, 
  StyleSheet, 
  ScrollView, 
  SafeAreaView, 
  Dimensions 
} from "react-native";
import { PieChart } from "react-native-chart-kit";

// API endpoint for the Android emulator. Use 'localhost' for iOS simulator.
const API_URL = "http://10.0.2.2:8000/generate-grocery";
const screenWidth = Dimensions.get("window").width;

// Predefined colors for chart categories
const CATEGORY_COLORS = {
  "Grains": "#f94144",
  "Vegetables": "#90be6d",
  "Fruits": "#f9c74f",
  "Dairy": "#43aa8b",
  "Meat": "#f8961e",
  "Protein": "#f3722c",
  "Pulses": "#577590",
  "Plant-Based Dairy": "#4d908e",
  "Snacks": "#277da1",
  "Other": "#808080",
};

export default function GroceryPlannerWithCharts() {
  const [budget, setBudget] = useState("4000");
  const [familySize, setFamilySize] = useState("4");
  const [diet, setDiet] = useState("Vegetarian");
  const [nutritionFocus, setNutritionFocus] = useState("High protein + balanced");
  
  const [loading, setLoading] = useState(false);
  const [groceryData, setGroceryData] = useState(null);
  const [chartData, setChartData] = useState([]);
  const [error, setError] = useState("");

  const processChartData = (items) => {
    const categoryCosts = items.reduce((acc, item) => {
      acc[item.category] = (acc[item.category] || 0) + item.approx_cost;
      return acc;
    }, {});

    // Format data for react-native-chart-kit PieChart
    return Object.entries(categoryCosts).map(([name, cost]) => ({
      name,
      population: cost, // 'population' is the key used by the library for the value
      color: CATEGORY_COLORS[name] || CATEGORY_COLORS["Other"],
      legendFontColor: "#333",
      legendFontSize: 14,
    }));
  };

  const fetchGroceryList = useCallback(async () => {
    if (!budget || !familySize || !diet || !nutritionFocus) {
      setError("Please fill in all fields.");
      return;
    }
    setLoading(true);
    setError("");
    setGroceryData(null);
    setChartData([]);

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          budget: parseInt(budget),
          family_size: parseInt(familySize),
          diet,
          nutrition_focus: nutritionFocus,
        }),
      });

      if (!response.ok) throw new Error(\`HTTP error! status: \${response.status}\`);

      const result = await response.json();
      if (result.success) {
        setGroceryData(result.data);
        setChartData(processChartData(result.data.items));
      } else {
        setError(result.error || "An unknown error occurred on the server.");
      }
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to connect to the server. Is it running?");
    } finally {
      setLoading(false);
    }
  }, [budget, familySize, diet, nutritionFocus]);
  
  const currencyFormatter = (value) => new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0
    }).format(value);

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <View style={styles.itemRow}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemCost}>{currencyFormatter(item.approx_cost)}</Text>
      </View>
      <View style={styles.itemRow}>
        <Text style={styles.itemDetails}>Qty: {item.quantity}</Text>
        <Text style={styles.itemDetails}>Category: {item.category}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.header}>Grocery Planner</Text>
        
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Budget (₹):</Text>
          <TextInput value={budget} onChangeText={setBudget} keyboardType="numeric" style={styles.input} />
          <Text style={styles.label}>Family Size:</Text>
          <TextInput value={familySize} onChangeText={setFamilySize} keyboardType="numeric" style={styles.input} />
          <Text style={styles.label}>Diet Preference:</Text>
          <TextInput value={diet} onChangeText={setDiet} style={styles.input} placeholder="Vegetarian / Non-Veg / Vegan" />
          <Text style={styles.label}>Nutritional Focus:</Text>
          <TextInput value={nutritionFocus} onChangeText={setNutritionFocus} style={styles.input} placeholder="High protein, Balanced" />
        </View>

        <Button title={loading ? "Generating..." : "Generate Grocery List"} onPress={fetchGroceryList} disabled={loading} />

        {loading && <ActivityIndicator size="large" style={styles.loader} color="#0000ff" />}
        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        {groceryData && (
          <View style={styles.resultContainer}>
            <Text style={styles.resultHeader}>Your Grocery List</Text>
            <View style={styles.summaryContainer}>
              <Text style={styles.summaryText}>Budget: {currencyFormatter(groceryData.total_budget)}</Text>
              <Text style={styles.summaryText}>Estimated: {currencyFormatter(groceryData.estimated_total)}</Text>
            </View>
            <FlatList
              data={groceryData.items}
              renderItem={renderItem}
              keyExtractor={(item, index) => index.toString()}
              scrollEnabled={false} // Disable scroll for the FlatList inside a ScrollView
            />

            {chartData.length > 0 && (
              <View style={styles.chartContainer}>
                <Text style={styles.resultHeader}>Cost Breakdown</Text>
                <PieChart
                  data={chartData}
                  width={screenWidth - 75}
                  height={220}
                  chartConfig={{
                    color: (opacity = 1) => \`rgba(0, 0, 0, \${opacity})\`,
                  }}
                  accessor={"population"}
                  backgroundColor={"transparent"}
                  absolute
                />
              </View>
            )}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#f5f5f5' },
  container: { padding: 20 },
  header: { fontSize: 24, fontWeight: "bold", marginBottom: 20, textAlign: 'center' },
  inputContainer: { marginBottom: 20 },
  label: { fontSize: 16, marginBottom: 5, color: '#333' },
  input: { borderWidth: 1, borderColor: '#ccc', backgroundColor: '#fff', padding: 12, marginBottom: 15, borderRadius: 8, fontSize: 16 },
  loader: { marginTop: 20 },
  errorText: { color: "red", marginTop: 15, textAlign: 'center', fontSize: 16 },
  resultContainer: { marginTop: 30, backgroundColor: '#fff', borderRadius: 8, padding: 15, borderWidth: 1, borderColor: '#eee' },
  resultHeader: { fontSize: 20, fontWeight: 'bold', marginBottom: 10, borderBottomWidth: 1, borderBottomColor: '#eee', paddingBottom: 10 },
  summaryContainer: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15, paddingHorizontal: 5 },
  summaryText: { fontSize: 16, fontWeight: '500' },
  itemContainer: { paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: "#eee" },
  itemRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  itemName: { fontWeight: "bold", fontSize: 16 },
  itemCost: { fontWeight: 'bold', fontSize: 16, color: '#2e8b57' },
  itemDetails: { fontSize: 14, color: '#666', marginTop: 4 },
  chartContainer: {
    marginTop: 20,
    alignItems: 'center',
    borderRadius: 8,
    paddingVertical: 16,
    backgroundColor: '#fff',
    // iOS shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,
    // Android shadow
    elevation: 2,
  },
});
`;

const GroceryPlannerWithCharts: React.FC = () => {
    return (
        <div className="space-y-4 text-gray-300">
            <p>
                This component contains the full React Native code for an enhanced version of the AI Grocery Planner. It now includes a dynamic <strong>pie chart</strong> that visually represents the cost distribution across different grocery categories, offering users a more intuitive understanding of their potential spending.
            </p>
            <blockquote className="border-l-4 border-cyan-500 pl-4 text-gray-400 italic my-4">
                This enhancement uses the <code>react-native-chart-kit</code> library to render the chart, providing a clean and effective data visualization directly within the mobile experience.
            </blockquote>
      
            <CodeBlock language="javascript" title="mobile/screens/GroceryPlannerWithCharts.js" content={groceryPlannerWithChartsCode} />
        </div>
    );
};

export default GroceryPlannerWithCharts;