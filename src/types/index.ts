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
  crustaceans: boolean;
  molluscs: boolean;
  eggs: boolean;
  dairy: boolean;
  soy: boolean;
  wheat: boolean;
  fish: boolean;
  coconut: boolean;
}

export interface DietaryRequirements {
  preferences: DietaryPreferences;
  intolerances: FoodIntolerances;
  allergies: FoodAllergies;
} 