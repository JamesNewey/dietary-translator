import React, { useMemo, useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTranslation } from 'react-i18next';
import './i18n/config';
import { getTheme } from './theme';
import Logo from './components/Logo';
import Landing from './components/Landing';
import LanguageSelector from './components/LanguageSelector';
import DietaryPreferencesForm from './components/DietaryPreferencesForm';
import TranslationResult from './components/TranslationResult';

type Mode = 'light' | 'dark';

// Shared with the static pages in public/designv2simple, so a choice made there carries over.
const THEME_KEY = 'dt-theme';

const readSavedMode = (): Mode | null => {
  try {
    const saved = localStorage.getItem(THEME_KEY);
    return saved === 'light' || saved === 'dark' ? saved : null;
  } catch {
    return null;
  }
};

function App() {
  const { t } = useTranslation();
  const systemDark = useMediaQuery('(prefers-color-scheme: dark)');
  const [savedMode, setSavedMode] = useState<Mode | null>(readSavedMode);
  const mode: Mode = savedMode ?? (systemDark ? 'dark' : 'light');
  const theme = useMemo(() => getTheme(mode), [mode]);

  const toggleMode = () => {
    const next: Mode = mode === 'dark' ? 'light' : 'dark';
    setSavedMode(next);
    try {
      localStorage.setItem(THEME_KEY, next);
    } catch {
      // storage can be unavailable (private windows); the choice then lasts for this visit only
    }
  };
  // step 0 is the landing screen; 1–3 are language, requirements and the card
  const [step, setStep] = useState(0);
  const [requirements, setRequirements] = useState({
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
  });

  const handleNext = () => {
    setStep(step + 1);
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const handleRequirementsChange = (newRequirements: any) => {
    setRequirements(newRequirements);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {step === 0 ? (
        <Landing onStart={handleNext} darkMode={mode === 'dark'} onToggleMode={toggleMode} />
      ) : (
        <>
          <Box
            component="header"
            sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 3, p: 'clamp(20px, 2.8vw, 40px)' }}
          >
            <Box
              component="button"
              type="button"
              onClick={() => setStep(0)}
              aria-label="Dietary Translator, back to the start"
              sx={{
                display: 'inline-flex', alignItems: 'center', gap: 1.5, p: 0, border: 0, bgcolor: 'transparent', cursor: 'pointer',
                color: 'text.primary', font: 'inherit', fontWeight: 500,
                '&:focus-visible': { outline: (th) => `2px solid ${th.palette.primary.main}`, outlineOffset: 3 },
              }}
            >
              <Logo />
              <span>Dietary Translator</span>
            </Box>
            <Button variant="text" onClick={toggleMode} aria-pressed={mode === 'dark'} sx={{ minHeight: 0, p: '6px 0', typography: 'body2', fontWeight: 500 }}>
              {mode === 'dark' ? t('landing.lightMode') : t('landing.darkMode')}
            </Button>
          </Box>

          <Box component="main" sx={{ maxWidth: 'calc(600px + clamp(20px, 2.8vw, 40px) * 2)', px: 'clamp(20px, 2.8vw, 40px)', pt: 'clamp(40px, 8vw, 120px)', pb: 15 }}>
            <Typography variant="h1" sx={{ mb: 6 }}>
              {t('dietary.title')}
            </Typography>

            {step === 1 && (
              <LanguageSelector onNext={handleNext} />
            )}

            {step === 2 && (
              <DietaryPreferencesForm
                requirements={requirements}
                onChange={handleRequirementsChange}
                onNext={handleNext}
                onBack={handleBack}
              />
            )}

            {step === 3 && (
              <TranslationResult
                requirements={requirements}
                onBack={handleBack}
              />
            )}
          </Box>
        </>
      )}
    </ThemeProvider>
  );
}

export default App;
