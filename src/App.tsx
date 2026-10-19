import React, { useEffect, useMemo, useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTranslation } from 'react-i18next';
import './i18n/config';
import { getTheme, pageTitleSx } from './theme';
import { PAGE_MARGIN, THEME_KEY, hasAnyTicked } from './constants';
import { hasVisited, loadRequirements, markVisited, saveRequirements } from './storage';
import { trackScreen } from './analytics';
import { DietaryRequirements } from './types';
import Logo from './components/Logo';
import Landing from './components/Landing';
import ThemeToggle from './components/ThemeToggle';
import LanguageSelector from './components/LanguageSelector';
import DietaryPreferencesForm from './components/DietaryPreferencesForm';
import TranslationResult from './components/TranslationResult';

type Mode = 'light' | 'dark';

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
  const [requirements, setRequirements] = useState<DietaryRequirements>(loadRequirements);
  // step 0 is the landing screen; 1–3 are language, requirements and the card.
  // Return visits skip the landing screen, and go straight to the card if something is ticked.
  const [step, setStep] = useState(() => (hasAnyTicked(requirements) ? 3 : hasVisited() ? 1 : 0));

  // report each screen to Google Analytics as it's shown
  useEffect(() => {
    trackScreen(step);
  }, [step]);

  const handleNext = () => {
    if (step === 0) markVisited();
    setStep(step + 1);
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const handleRequirementsChange = (newRequirements: DietaryRequirements) => {
    setRequirements(newRequirements);
    saveRequirements(newRequirements);
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
            sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 3, p: PAGE_MARGIN }}
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
            <ThemeToggle dark={mode === 'dark'} onToggle={toggleMode} />
          </Box>

          <Box component="main" sx={{ maxWidth: `calc(600px + ${PAGE_MARGIN} * 2)`, px: PAGE_MARGIN, pt: '0px', pb: 15 }}>
            {/* the result page writes its own heading, in the waiter's language */}
            {step !== 3 && (
              <Typography variant="h1" sx={pageTitleSx}>
                {t('dietary.title')}
              </Typography>
            )}

            {step === 1 && (
              <LanguageSelector onNext={handleNext} onBack={handleBack} />
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
