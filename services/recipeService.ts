
export interface Recipe {
  name: string;
  steps: string;
  cost: number;
  tip: string;
}

export interface RecipeResponse {
  recipes: Recipe[];
  summary: string;
}

const vegRecipeResponse: RecipeResponse = {
  recipes: [
    {
      name: "Paneer Butter Masala",
      steps: "1. Sauté onions and tomatoes. 2. Blend into a fine paste. 3. Add paneer cubes and spices. 4. Simmer with cream.",
      cost: 250,
      tip: "A rich and creamy classic that uses up your tomatoes and onions."
    },
    {
      name: "Paneer Pulao",
      steps: "1. Sauté onions, tomatoes, and spices. 2. Add soaked rice and paneer cubes. 3. Pressure cook for 2 whistles.",
      cost: 180,
      tip: "A quick one-pot meal perfect for a weeknight."
    }
  ],
  summary: "Here are two delicious vegetarian recipes you can make."
};

const nonVegRecipeResponse: RecipeResponse = {
  recipes: [
    {
      name: "Chicken Curry",
      steps: "1. Sauté onions, ginger, and garlic. 2. Add chicken pieces and spices. 3. Add water and simmer until cooked.",
      cost: 300,
      tip: "A simple and flavorful curry. Add potatoes to make it more filling."
    },
    {
      name: "Chilli Chicken",
      steps: "1. Marinate and fry chicken pieces. 2. Sauté bell peppers and onions. 3. Mix with soy sauce, vinegar, and fried chicken.",
      cost: 350,
      tip: "A popular Indo-Chinese dish that's great as a starter or main."
    }
  ],
  summary: "Here are a couple of non-veg recipes for you."
};

const veganRecipeResponse: RecipeResponse = {
    recipes: [
        {
            name: "Tofu Stir-Fry",
            steps: "1. Press and cube tofu. 2. Stir-fry broccoli, bell peppers, and onions. 3. Add tofu and soy-ginger sauce. 4. Serve with rice.",
            cost: 220,
            tip: "A quick, healthy, and protein-packed vegan meal."
        }
    ],
    summary: "A delicious vegan stir-fry recipe for you."
}


export const generateRecipes = async (ingredients: string[], diet: string): Promise<RecipeResponse> => {
  const ingredientsStr = ingredients.join(',').toLowerCase();
  
  // Simulate network delay and logic
  return new Promise((resolve) => {
    setTimeout(() => {
        if (diet.toLowerCase() === 'non-veg' || ingredientsStr.includes('chicken')) {
            resolve(nonVegRecipeResponse);
        } else if (diet.toLowerCase() === 'vegan' || ingredientsStr.includes('tofu')) {
            resolve(veganRecipeResponse);
        } else if (diet.toLowerCase() === 'veg' && (ingredientsStr.includes('paneer') || ingredientsStr.includes('tomato'))) {
             resolve(vegRecipeResponse);
        } else {
            resolve({
                recipes: [],
                summary: "Could not find a matching recipe for the provided ingredients. Try adding more common items like 'onion', 'tomato', or 'paneer'."
            });
        }
    }, 1500);
  });
};
