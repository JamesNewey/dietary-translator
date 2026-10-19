// Values shared across the app.
import { DietaryRequirements } from './types';

// The languages the app loads (src/i18n/config.ts) and offers in its language lists.
export const LANGUAGES = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Spanish' },
  { code: 'fr', name: 'French' },
  { code: 'de', name: 'German' },
  { code: 'it', name: 'Italian' },
  { code: 'pt', name: 'Portuguese' },
  { code: 'ru', name: 'Russian' },
  { code: 'zh', name: 'Chinese' },
  { code: 'ja', name: 'Japanese' },
  { code: 'ko', name: 'Korean' },
];

export type Category = keyof DietaryRequirements;

// The three groups of needs, in the order the app shows them.
export const CATEGORIES: Category[] = ['preferences', 'intolerances', 'allergies'];

// Nothing ticked. Its keys, in order, are the needs the app offers in each group.
export const EMPTY_REQUIREMENTS: DietaryRequirements = {
  preferences: {
    vegan: false,
    vegetarian: false,
    pescatarian: false,
    halal: false,
    kosher: false,
    glutenFree: false,
  },
  intolerances: {
    lactose: false,
    gluten: false,
    fructose: false,
  },
  allergies: {
    nuts: false,
    shellfish: false,
    eggs: false,
    milk: false,
    soy: false,
    wheat: false,
    fish: false,
    coconut: false,
  },
};

// The needs in one group, in order.
export const needKeys = (category: Category): string[] => Object.keys(EMPTY_REQUIREMENTS[category]);

// Page side margin, shared by the header, the steps and the landing screen.
export const PAGE_MARGIN = 'clamp(20px, 2.8vw, 40px)';

// The ease-out curve every movement uses.
export const EASE_OUT = 'cubic-bezier(0.22, 1, 0.36, 1)';

// localStorage key for the light/dark choice; shared with the static pages in public/designv2simple.
export const THEME_KEY = 'dt-theme';
