export interface DietaryPreferences {
  vegan: boolean;
  vegetarian: boolean;
  pescatarian: boolean;
  halal: boolean;
  kosher: boolean;
  glutenFree: boolean;
}

export interface FoodIntolerances {
  lactose: boolean;
  gluten: boolean;
  fructose: boolean;
}

export interface FoodAllergies {
  nuts: boolean;
  shellfish: boolean;
  eggs: boolean;
  milk: boolean;
  soy: boolean;
  wheat: boolean;
  fish: boolean;
}

export interface DietaryRequirements {
  preferences: DietaryPreferences;
  intolerances: FoodIntolerances;
  allergies: FoodAllergies;
} 