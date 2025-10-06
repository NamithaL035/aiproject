import React from 'react';
import CodeBlock from './CodeBlock';

const SectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h2 className="text-2xl font-bold mt-8 mb-4 border-b border-gray-600 pb-2 text-cyan-400">{children}</h2>
);

const SubTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h3 className="text-xl font-semibold mt-6 mb-2 text-white">{children}</h3>
);

const MvpSkeleton: React.FC = () => {
  return (
    <div className="space-y-4 text-gray-300">
      <p>This document is a ready-to-copy <strong>project skeleton</strong> for Phase 1 (MVP) of your AI-Powered Household Expense & Grocery Budgeting app. It includes:</p>
      <ul className="list-disc list-inside pl-4 space-y-1">
        <li>Project folder layout</li>
        <li>Key files with starter code (React Native + Expo, FastAPI)</li>
        <li>Docker Compose for backend + Postgres</li>
        <li>Database DDL</li>
        <li>Example environment files and commands to run locally</li>
        <li>Minimal tests and sanity checks</li>
      </ul>
      <blockquote className="border-l-4 border-cyan-500 pl-4 text-gray-400 italic my-4">
        <strong>Goal:</strong> deliver a working MVP where users can create a profile, add manual expenses, view a basic dashboard, get a grocery budget estimate (server-side simple estimator), and obtain a basic grocery quotation from a static CSV dataset.
      </blockquote>
      
      <SubTitle>Folder layout</SubTitle>
      <CodeBlock language="plaintext" content={`household-app/
├─ backend/
│  ├─ app/
│  │  ├─ main.py
│  │  ├─ api/
│  │  │  ├─ v1/
│  │  │  │  ├─ endpoints.py
│  │  ├─ core/
│  │  │  ├─ config.py
│  │  ├─ models/
│  │  │  ├─ db.py
│  │  │  ├─ schemas.py
│  │  ├─ services/
│  │  │  ├─ estimator.py
│  │  │  ├─ quoter.py
│  │  ├─ data/
│  │  │  ├─ prices_sample.csv
│  ├─ requirements.txt
│  ├─ Dockerfile
│  ├─ docker-compose.yml
├─ mobile/
│  ├─ App.js
│  ├─ package.json
│  ├─ screens/
│  │  ├─ AuthScreen.js
│  │  ├─ DashboardScreen.js
│  │  ├─ AddExpenseScreen.js
│  │  ├─ BudgetScreen.js
│  ├─ components/
│  │  ├─ ExpenseForm.js
│  │  ├─ Chart.js
│  ├─ assets/
├─ README.md`} />

      <SectionTitle>Backend — FastAPI</SectionTitle>
      
      <SubTitle>backend/requirements.txt</SubTitle>
      <CodeBlock language="text" title="backend/requirements.txt" content={`fastapi==0.95.2
uvicorn[standard]==0.22.0
SQLAlchemy==2.0.19
alembic==1.11.1
psycopg2-binary==2.9.6
pydantic==1.10.11
python-dotenv==1.0.0
pandas==2.1.1
pytest==7.4.0
httpx==0.24.0`} />

      <SubTitle>backend/Dockerfile</SubTitle>
      <CodeBlock language="dockerfile" title="backend/Dockerfile" content={`FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY ./app /app/app
ENV PYTHONPATH=/app
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]`} />

      <SubTitle>backend/docker-compose.yml</SubTitle>
      <CodeBlock language="yaml" title="backend/docker-compose.yml" content={`version: '3.8'
services:
  db:
    image: postgres:15
    environment:
      POSTGRES_USER: appuser
      POSTGRES_PASSWORD: password
      POSTGRES_DB: household_db
    volumes:
      - db_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"

  backend:
    build: .
    volumes:
      - ./app:/app/app
    ports:
      - "8000:8000"
    environment:
      - DATABASE_URL=postgresql+psycopg2://appuser:password@db:5432/household_db
    depends_on:
      - db

volumes:
  db_data:`} />
      
      <SubTitle>backend/app/main.py</SubTitle>
      <CodeBlock language="python" title="backend/app/main.py" content={`from fastapi import FastAPI
from app.api.v1.endpoints import router as v1_router
from app.core.config import settings

app = FastAPI(title="Household Expense MVP")

app.include_router(v1_router, prefix="/api/v1")

@app.get("/health")
async def health():
    return {"status":"ok"}`} />

      <SubTitle>backend/app/core/config.py</SubTitle>
      <CodeBlock language="python" title="backend/app/core/config.py" content={`from pydantic import BaseSettings

class Settings(BaseSettings):
    DATABASE_URL: str = "sqlite:///./test.db"  # override by env in prod
    PRICE_CSV_PATH: str = "./app/data/prices_sample.csv"

    class Config:
        env_file = ".env"

settings = Settings()`} />

      <SubTitle>backend/app/models/db.py</SubTitle>
      <CodeBlock language="python" title="backend/app/models/db.py" content={`from sqlalchemy import create_engine, MetaData
from sqlalchemy.orm import sessionmaker, declarative_base
from app.core.config import settings

engine = create_engine(settings.DATABASE_URL, echo=False, future=True)
SessionLocal = sessionmaker(bind=engine, autoflush=False, autocommit=False)
Base = declarative_base()`} />
      
      <SubTitle>backend/app/models/schemas.py</SubTitle>
      <CodeBlock language="python" title="backend/app/models/schemas.py" content={`from pydantic import BaseModel
from typing import List, Optional

class Income(BaseModel):
    source: str
    amount: float

class ExpenseCreate(BaseModel):
    date: str
    amount: float
    category: str
    merchant: Optional[str] = None

class UserProfile(BaseModel):
    incomes: List[Income]
    fixed_expenses: List[ExpenseCreate]
    family_size: int
    dietary_pref: str

class BudgetEstimate(BaseModel):
    grocery_budget: float
    confidence_interval: List[float]
    breakdown: dict
    rationale: str`} />

      <SubTitle>backend/app/api/v1/endpoints.py</SubTitle>
      <CodeBlock language="python" title="backend/app/api/v1/endpoints.py" content={`from fastapi import APIRouter, Depends, HTTPException
from app.models.schemas import UserProfile, ExpenseCreate, BudgetEstimate
from app.services.estimator import estimate_budget
from app.services.quoter import quote_items

router = APIRouter()

@router.post('/estimate-budget', response_model=BudgetEstimate)
async def api_estimate_budget(profile: UserProfile):
    return estimate_budget(profile.dict())

@router.post('/add-expense')
async def api_add_expense(expense: ExpenseCreate):
    # For MVP we'll store in-memory or simple DB later
    return {"status":"ok","expense":expense}

@router.post('/quote')
async def api_quote(items: dict):
    # items = {"items": [{"item":"rice_5kg","qty":1}, ...], "location":"Bangalore"}
    res = quote_items(items)
    return res`} />
    <p>Note: in Phase 1 the `add-expense` endpoint will be a placeholder — store to a simple table or in-memory list.</p>


      <SubTitle>backend/app/services/estimator.py</SubTitle>
      <CodeBlock language="python" title="backend/app/services/estimator.py" content={`import numpy as np
from app.core.config import settings

def estimate_budget(profile: dict) -> dict:
    # Simple conservative rule-based: grocery = 30% of disposable income
    incomes = profile.get('incomes', [])
    fixed = profile.get('fixed_expenses', [])
    total_income = sum(i['amount'] for i in incomes)
    total_fixed = sum(f['amount'] for f in fixed)
    disposable = max(total_income - total_fixed, 0)
    base = disposable * 0.30
    # small adjustment based on family size
    family_size = profile.get('family_size', 1)
    adj = (family_size - 1) * 0.07 * base if family_size > 1 else 0
    estimate = base + adj
    ci = [estimate * 0.9, estimate * 1.1]
    breakdown = {
        'staples': estimate * 0.35,
        'dairy': estimate * 0.15,
        'vegetables': estimate * 0.25,
        'protein': estimate * 0.20,
        'snacks': estimate * 0.05
    }
    return {
        'grocery_budget': round(estimate, 2),
        'confidence_interval': [round(ci[0],2), round(ci[1],2)],
        'breakdown': {k: round(v,2) for k,v in breakdown.items()},
        'rationale': '30% of disposable income adjusted for family size (simple rule-based).'
    }`} />

      <SubTitle>backend/app/services/quoter.py</SubTitle>
      <CodeBlock language="python" title="backend/app/services/quoter.py" content={`import pandas as pd
from app.core.config import settings
from datetime import datetime

prices_df = pd.read_csv(settings.PRICE_CSV_PATH)

# sample CSV should have columns: item, unit, unit_price, store, location

def quote_items(payload: dict) -> dict:
    items = payload.get('items', [])
    location = payload.get('location', None)
    results = []
    total = 0.0
    for it in items:
        name = it['item']
        qty = it.get('qty', 1)
        # naive match
        row = prices_df[prices_df['item'].str.contains(name, case=False, na=False)]
        if not row.empty:
            price = float(row.iloc[0]['unit_price'])
            est = price * qty
            sources = [row.iloc[0]['store']]
        else:
            price = 100.0
            est = price * qty
            sources = ['local_default']
        total += est
        results.append({
            'item': name,
            'est_price': round(price,2),
            'qty': qty,
            'line_total': round(est,2),
            'sources': sources
        })
    return {
        'quote_total': round(total,2),
        'items': results,
        'currency': 'INR',
        'timestamp': datetime.now().isoformat(),
        'confidence_score': 0.6
    }`} />

      <SubTitle>backend/app/data/prices_sample.csv</SubTitle>
      <CodeBlock language="csv" title="backend/app/data/prices_sample.csv" content={`item,unit,unit_price,store,location
rice_5kg,5kg,380,BigBasket,Bangalore
milk_1l,1l,60,LocalKirana,Bangalore
dal_1kg,1kg,120,BigBasket,Bangalore
vegetables_mixed_kg,1kg,40,LocalKirana,Bangalore`} />

      <SectionTitle>Database DDL (simple tables)</SectionTitle>
      <p>Here's basic SQL you can run in Postgres.</p>
      <CodeBlock language="sql" content={`CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE,
  profile JSONB,
  created_at TIMESTAMP DEFAULT now()
);

CREATE TABLE expenses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  date DATE,
  amount NUMERIC,
  category TEXT,
  merchant TEXT,
  meta JSONB,
  created_at TIMESTAMP DEFAULT now()
);`} />
      <p>(If `gen_random_uuid()` is not available, install and use the `uuid-ossp` extension.)</p>

      <SectionTitle>Mobile — React Native (Expo) skeleton</SectionTitle>
      <p>Use Expo for Phase 1 speed.</p>

      <SubTitle>mobile/package.json</SubTitle>
      <CodeBlock language="json" title="mobile/package.json" content={`{
  "name": "household-mobile",
  "version": "1.0.0",
  "main": "node_modules/expo/AppEntry.js",
  "scripts": {
    "start": "expo start",
    "android": "expo start --android",
    "ios": "expo start --ios",
    "web": "expo start --web"
  },
  "dependencies": {
    "expo": "~48.0.0",
    "react": "18.2.0",
    "react-native": "0.71.0",
    "axios": "^1.4.0",
    "react-native-chart-kit": "^6.12.0",
    "@react-navigation/native": "^6.1.6",
    "@react-navigation/native-stack": "^6.9.12"
  }
}`} />

      <SubTitle>mobile/App.js</SubTitle>
      <CodeBlock language="javascript" title="mobile/App.js" content={`import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthScreen from './screens/AuthScreen';
import DashboardScreen from './screens/DashboardScreen';
import AddExpenseScreen from './screens/AddExpenseScreen';
import BudgetScreen from './screens/BudgetScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Auth">
        <Stack.Screen name="Auth" component={AuthScreen} />
        <Stack.Screen name="Dashboard" component={DashboardScreen} />
        <Stack.Screen name="AddExpense" component={AddExpenseScreen} />
        <Stack.Screen name="Budget" component={BudgetScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}`} />

      <SubTitle>mobile/screens/AuthScreen.js</SubTitle>
      <CodeBlock language="javascript" title="mobile/screens/AuthScreen.js" content={`import React from 'react';
import { View, Text, Button } from 'react-native';

export default function AuthScreen({ navigation }) {
  return (
    <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
      <Text style={{fontSize:20, marginBottom:20}}>Welcome to Household MVP</Text>
      <Button title="Go to Dashboard" onPress={() => navigation.replace('Dashboard')} />
    </View>
  );
}`} />
      
      <SubTitle>mobile/screens/DashboardScreen.js</SubTitle>
      <CodeBlock language="javascript" title="mobile/screens/DashboardScreen.js" content={`import React, {useEffect, useState} from 'react';
import {View, Text, Button, FlatList} from 'react-native';
import axios from 'axios';

export default function DashboardScreen({ navigation }){
  const [expenses, setExpenses] = useState([]);

  useEffect(()=>{
    // call backend health for sanity
    axios.get('http://10.0.2.2:8000/health')
      .then(r => console.log(r.data))
      .catch(e => console.warn(e));
  },[])

  return (
    <View style={{flex:1,padding:16}}>
      <Text style={{fontSize:22, marginBottom:16}}>Dashboard</Text>
      <Button title="Add Expense" onPress={()=>navigation.navigate('AddExpense')} />
      <Button title="Get Budget" onPress={()=>navigation.navigate('Budget')} />
      <FlatList data={expenses} renderItem={({item})=> <Text>{item.amount} - {item.category}</Text>} keyExtractor={(i,index)=>index.toString()} />
    </View>
  )
}`} />

      <SubTitle>mobile/screens/AddExpenseScreen.js</SubTitle>
      <CodeBlock language="javascript" title="mobile/screens/AddExpenseScreen.js" content={`import React, {useState} from 'react';
import {View, TextInput, Button, Text} from 'react-native';
import axios from 'axios';

export default function AddExpenseScreen({ navigation }){
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Groceries');

  const submit = async () => {
    try{
      const res = await axios.post('http://10.0.2.2:8000/api/v1/add-expense', {
        date: new Date().toISOString().slice(0,10),
        amount: parseFloat(amount),
        category
      });
      alert('Saved');
      navigation.goBack();
    }catch(e){
      console.warn(e);
      alert('Error saving');
    }
  }

  return (
    <View style={{flex:1,padding:16}}>
      <Text>Amount</Text>
      <TextInput keyboardType='numeric' value={amount} onChangeText={setAmount} style={{borderWidth:1, padding:8, marginBottom:8}} />
      <Text>Category</Text>
      <TextInput value={category} onChangeText={setCategory} style={{borderWidth:1, padding:8, marginBottom:8}} />
      <Button title="Save" onPress={submit} />
    </View>
  )
}`} />
      
      <SubTitle>mobile/screens/BudgetScreen.js</SubTitle>
      <CodeBlock language="javascript" title="mobile/screens/BudgetScreen.js" content={`import React, {useState} from 'react';
import {View, Text, Button} from 'react-native';
import axios from 'axios';

export default function BudgetScreen(){
  const [budget, setBudget] = useState(null);

  const getBudget = async () => {
    // sample payload
    const payload = {
      incomes: [{source:'salary', amount:60000}],
      fixed_expenses: [{name:'rent', amount:15000}],
      family_size: 4,
      dietary_pref: 'mixed'
    }
    try{
      const res = await axios.post('http://10.0.2.2:8000/api/v1/estimate-budget', payload);
      setBudget(res.data);
    }catch(e){
      console.warn(e);
    }
  }

  return (
    <View style={{flex:1,padding:16}}>
      <Button title="Estimate Grocery Budget" onPress={getBudget} />
      {budget && (
        <View style={{marginTop:16}}>
          <Text>Budget: ₹{budget.grocery_budget}</Text>
          <Text>CI: ₹{budget.confidence_interval[0]} - ₹{budget.confidence_interval[1]}</Text>
          <Text>Rationale: {budget.rationale}</Text>
        </View>
      )}
    </View>
  )
}`} />

      <SectionTitle>Running locally (dev flow)</SectionTitle>
      <SubTitle>1. Backend</SubTitle>
      <CodeBlock language="bash" content={`cd household-app/backend
# create .env with DATABASE_URL if desired
# start postgres + backend
docker-compose up --build
# backend will be on http://localhost:8000`} />
      <p>Note: If running the Expo Android emulator, use `10.0.2.2` to reach the host machine from the Android emulator (or your machine's IP on a physical device).</p>
      
      <SubTitle>2. Mobile</SubTitle>
      <CodeBlock language="bash" content={`cd household-app/mobile
npm install
npx expo start
# choose to run on emulator or Expo Go on phone`} />

      <SubTitle>3. Quick sanity tests</SubTitle>
      <ul className="list-disc list-inside pl-4 space-y-1">
        <li>`GET http://localhost:8000/health` should return `{"status":"ok"}`</li>
        <li>POST `/api/v1/estimate-budget` with a sample payload should return a JSON budget.</li>
        <li>From the mobile app, pressing "Estimate Grocery Budget" should fetch and display the estimate.</li>
      </ul>

      <SectionTitle>Minimal tests (pytest)</SectionTitle>
      <p>Create `backend/app/tests/test_estimator.py`</p>
      <CodeBlock language="python" title="backend/app/tests/test_estimator.py" content={`from app.services.estimator import estimate_budget

def test_estimate_basic():
    profile = {
        'incomes':[{'source':'salary','amount':50000}],
        'fixed_expenses':[{'name':'rent','amount':15000}],
        'family_size':3,
        'dietary_pref':'mixed'
    }
    res = estimate_budget(profile)
    assert 'grocery_budget' in res
    assert res['grocery_budget'] > 0`} />
    <p>Run from backend: `pytest -q`</p>

    </div>
  );
};

export default MvpSkeleton;