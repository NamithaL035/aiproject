import React from 'react';
import CodeBlock from './CodeBlock';

const SubTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h3 className="text-xl font-semibold mt-6 mb-2 text-white">{children}</h3>
);

const appJsCode = `import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthScreen from './screens/AuthScreen';
import DashboardScreen from './screens/DashboardScreen';
import AddExpenseScreen from './screens/AddExpenseScreen';
import BudgetScreen from './screens/BudgetScreen';
import GroceryPlannerScreen from './screens/GroceryPlannerScreen'; // New

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Auth">
        <Stack.Screen name="Auth" component={AuthScreen} />
        <Stack.Screen name="Dashboard" component={DashboardScreen} />
        <Stack.Screen name="AddExpense" component={AddExpenseScreen} />
        <Stack.Screen name="Budget" component={BudgetScreen} />
        {/* New Screen for the AI Grocery Planner */}
        <Stack.Screen 
          name="GroceryPlanner" 
          component={GroceryPlannerScreen} 
          options={{ title: 'AI Grocery Planner' }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}`;

const dashboardScreenCode = `import React, {useEffect, useState} from 'react';
import {View, Text, Button, FlatList, StyleSheet} from 'react-native';
import axios from 'axios';

export default function DashboardScreen({ navigation }){
  const [expenses, setExpenses] = useState([]);

  useEffect(()=>{
    axios.get('http://10.0.2.2:8000/health')
      .then(r => console.log(r.data))
      .catch(e => console.warn('Backend not reachable:', e.message));
  },[])

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dashboard</Text>
      <View style={styles.buttonContainer}>
        <Button title="Add Expense" onPress={()=>navigation.navigate('AddExpense')} />
        <Button title="Get Budget" onPress={()=>navigation.navigate('Budget')} />
        {/* New Button to navigate to the Grocery Planner */}
        <Button title="AI Grocery Planner" onPress={()=>navigation.navigate('GroceryPlanner')} />
      </View>
      <FlatList 
        data={expenses} 
        renderItem={({item})=> <Text style={styles.expenseItem}>{item.amount} - {item.category}</Text>} 
        keyExtractor={(i,index)=>index.toString()} 
        ListHeaderComponent={<Text style={styles.listHeader}>Recent Expenses</Text>}
        ListEmptyComponent={<Text style={styles.emptyList}>No expenses logged yet.</Text>}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
  buttonContainer: { marginBottom: 16, gap: 8 },
  listHeader: { fontSize: 18, fontWeight: 'bold', marginTop: 10, marginBottom: 5 },
  expenseItem: { paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: '#eee' },
  emptyList: { textAlign: 'center', marginTop: 20, color: 'gray' }
});`;

const groceryPlannerScreenCode = `import React, { useState } from "react";
import { View, Text, TextInput, Button, ActivityIndicator, StyleSheet, ScrollView, SafeAreaView } from "react-native";

// This is the IP for the backend when running on an Android emulator.
// For iOS simulator, use 'localhost'. For a physical device, use your computer's LAN IP.
const API_URL = "http://10.0.2.2:8000/generate-grocery";

export default function GroceryPlannerScreen() {
  const [budget, setBudget] = useState("4000");
  const [familySize, setFamilySize] = useState("4");
  const [diet, setDiet] = useState("Vegetarian");
  const [nutritionFocus, setNutritionFocus] = useState("High protein + balanced");
  const [loading, setLoading] = useState(false);
  const [groceryData, setGroceryData] = useState(null);
  const [error, setError] = useState("");

  const fetchGroceryList = async () => {
    if (!budget || !familySize || !diet || !nutritionFocus) {
        setError("Please fill in all fields.");
        return;
    }
    setLoading(true);
    setError("");
    setGroceryData(null);

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

      if (!response.ok) {
        throw new Error(\`HTTP error! status: \${response.status}\`);
      }

      const result = await response.json();
      if (result.success) {
        setGroceryData(result.data);
      } else {
        setError(result.error || "An unknown error occurred on the server.");
      }
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to connect to the server. Is it running?");
    }
    setLoading(false);
  };
  
  const currencyFormatter = (value) => new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0
    }).format(value);

  return (
    <SafeAreaView style={styles.safeArea}>
    <ScrollView style={styles.container}>
      <Text style={styles.header}>AI Grocery Planner</Text>
      
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Budget (₹):</Text>
        <TextInput
          value={budget}
          onChangeText={setBudget}
          keyboardType="numeric"
          style={styles.input}
          placeholder="e.g., 3000"
        />

        <Text style={styles.label}>Family Size:</Text>
        <TextInput
          value={familySize}
          onChangeText={setFamilySize}
          keyboardType="numeric"
          style={styles.input}
          placeholder="e.g., 4"
        />

        <Text style={styles.label}>Diet Preference:</Text>
        <TextInput
          value={diet}
          onChangeText={setDiet}
          style={styles.input}
          placeholder="Vegetarian / Non-Veg / Vegan"
        />

        <Text style={styles.label}>Nutritional Focus:</Text>
        <TextInput
          value={nutritionFocus}
          onChangeText={setNutritionFocus}
          style={styles.input}
          placeholder="e.g., High protein, Balanced"
        />
      </View>

      <Button title={loading ? "Generating..." : "Generate Grocery List"} onPress={fetchGroceryList} disabled={loading}/>

      {loading && <ActivityIndicator size="large" style={styles.loader} color="#0000ff" />}
      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      {groceryData && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultHeader}>Your Grocery List</Text>
          <View style={styles.summaryContainer}>
            <Text style={styles.summaryText}>Budget: {currencyFormatter(groceryData.total_budget)}</Text>
            <Text style={styles.summaryText}>Estimated Cost: {currencyFormatter(groceryData.estimated_total)}</Text>
          </View>

          {groceryData.items.map((item, index) => (
             <View key={index} style={styles.itemContainer}>
                <View style={styles.itemRow}>
                    <Text style={styles.itemName}>{item.name}</Text>
                    <Text style={styles.itemCost}>{currencyFormatter(item.approx_cost)}</Text>
                </View>
                <View style={styles.itemRow}>
                    <Text style={styles.itemDetails}>Qty: {item.quantity}</Text>
                    <Text style={styles.itemDetails}>Category: {item.category}</Text>
                </View>
             </View>
          ))}
        </View>
      )}
    </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#f5f5f5' },
  container: { flex: 1, padding: 20 },
  header: { fontSize: 24, fontWeight: "bold", marginBottom: 20, textAlign: 'center' },
  inputContainer: { marginBottom: 20 },
  label: { fontSize: 16, marginBottom: 5, color: '#333' },
  input: { borderWidth: 1, borderColor: '#ccc', backgroundColor: '#fff', padding: 12, marginBottom: 15, borderRadius: 8, fontSize: 16 },
  loader: { marginTop: 20 },
  errorText: { color: "red", marginTop: 15, textAlign: 'center', fontSize: 16 },
  resultContainer: { marginTop: 30, backgroundColor: '#fff', borderRadius: 8, padding: 15, borderWidth: 1, borderColor: '#eee' },
  resultHeader: { fontSize: 20, fontWeight: 'bold', marginBottom: 10, borderBottomWidth: 1, borderBottomColor: '#eee', paddingBottom: 10 },
  summaryContainer: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 },
  summaryText: { fontSize: 16, fontWeight: '500' },
  itemContainer: { paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: "#eee" },
  itemRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  itemName: { fontWeight: "bold", fontSize: 16 },
  itemCost: { fontWeight: 'bold', fontSize: 16, color: '#2e8b57' },
  itemDetails: { fontSize: 14, color: '#666', marginTop: 4 }
});`;

const MobileApp: React.FC = () => {
    return (
        <div className="space-y-4 text-gray-300">
            <p>
                This section details the implementation of a new, interactive <strong>AI Grocery Planner</strong> screen for the React Native mobile app. This feature directly consumes the FastAPI endpoint defined in the previous section.
            </p>
            <blockquote className="border-l-4 border-cyan-500 pl-4 text-gray-400 italic my-4">
                Users can now input their budget, family size, and dietary preferences to receive a complete, AI-generated grocery list directly within the mobile application, providing instant value and showcasing a core AI capability.
            </blockquote>
      
            <SubTitle>mobile/screens/GroceryPlannerScreen.js (New)</SubTitle>
            <p>
                A new, self-contained screen that provides a user-friendly form to interact with the grocery planning AI. It handles user input, communicates with the backend, and displays the structured results in a clear, readable format.
            </p>
            <CodeBlock language="javascript" title="mobile/screens/GroceryPlannerScreen.js" content={groceryPlannerScreenCode} />

            <SubTitle>mobile/App.js (Updated)</SubTitle>
            <p>
                The main navigation stack is updated to include the new <code>GroceryPlannerScreen</code>.
            </p>
            <CodeBlock language="javascript" title="mobile/App.js" content={appJsCode} />

            <SubTitle>mobile/screens/DashboardScreen.js (Updated)</SubTitle>
            <p>
                A button is added to the main dashboard to provide a clear entry point for users to access the new AI Grocery Planner feature.
            </p>
            <CodeBlock language="javascript" title="mobile/screens/DashboardScreen.js" content={dashboardScreenCode} />
        </div>
    );
};

export default MobileApp;
