// What the app remembers between visits, in localStorage.
// Storage can be unavailable (private windows, blocked site data); every read and write is guarded,
// and a missing or unreadable value simply means "start fresh".
import { CATEGORIES, EMPTY_REQUIREMENTS, LANGUAGES } from './constants';
import { DietaryRequirements } from './types';

const REQUIREMENTS_KEY = 'dt-requirements';
const TARGET_LANGUAGE_KEY = 'dt-target-language';
const VISITED_KEY = 'dt-visited';

const read = (key: string): string | null => {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
};

const write = (key: string, value: string) => {
  try {
    localStorage.setItem(key, value);
  } catch {
    // not saved; the choice lasts for this visit only
  }
};

// The ticked needs from last time, laid over the current list of needs: a need added since then
// starts unticked, and one that no longer exists is dropped.
export const loadRequirements = (): DietaryRequirements => {
  let saved: any = null;
  try {
    saved = JSON.parse(read(REQUIREMENTS_KEY) ?? 'null');
  } catch {
    saved = null;
  }
  const result = JSON.parse(JSON.stringify(EMPTY_REQUIREMENTS)) as DietaryRequirements;
  if (!saved || typeof saved !== 'object') return result;
  CATEGORIES.forEach((category) => {
    const group = result[category] as unknown as Record<string, boolean>;
    Object.keys(group).forEach((key) => {
      group[key] = saved?.[category]?.[key] === true;
    });
  });
  return result;
};

export const saveRequirements = (requirements: DietaryRequirements) => {
  write(REQUIREMENTS_KEY, JSON.stringify(requirements));
};

// Set once the visitor has gone past the landing screen, so return visits can skip it.
export const hasVisited = () => read(VISITED_KEY) === 'yes';
export const markVisited = () => write(VISITED_KEY, 'yes');

// The waiter's language from last time, if the app still offers it.
export const loadTargetLanguage = (): string | null => {
  const saved = read(TARGET_LANGUAGE_KEY);
  return saved && LANGUAGES.some((lang) => lang.code === saved) ? saved : null;
};

export const saveTargetLanguage = (code: string) => {
  write(TARGET_LANGUAGE_KEY, code);
};
