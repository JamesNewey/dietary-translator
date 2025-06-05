import React, { useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'react-i18next';
import './i18n/config';
import LanguageSelector from './components/LanguageSelector';
import DietaryPreferencesForm from './components/DietaryPreferencesForm';
import TranslationResult from './components/TranslationResult';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#2e7d32',
    },
    secondary: {
      main: '#f57c00',
    },
  },
});

function App() {
  const { t } = useTranslation();
  const [step, setStep] = useState(1);
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
      <Container maxWidth="md">
        <Box sx={{ my: 4 }}>
          <Typography variant="h3" component="h1" gutterBottom align="center">
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
      </Container>
    </ThemeProvider>
  );
}

export default App;
