import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@mui/material';
import { DietaryRequirements } from '../types';
import FlagIcon from './FlagIcon';

interface TranslationResultProps {
  requirements: DietaryRequirements;
  onBack: () => void;
}

const languages = [
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
  { code: 'uk', name: 'Ukrainian' },
];

interface TranslatedRequirements {
  preferences: string[];
  intolerances: string[];
  allergies: string[];
}

const TranslationResult: React.FC<TranslationResultProps> = ({
  requirements,
  onBack,
}) => {
  const { t, i18n } = useTranslation();
  const [targetLanguage, setTargetLanguage] = useState(i18n.language);
  const [translatedRequirements, setTranslatedRequirements] = useState<TranslatedRequirements>({
    preferences: [],
    intolerances: [],
    allergies: [],
  });

  useEffect(() => {
    const translateRequirements = async () => {
      await i18n.changeLanguage(targetLanguage);
      
      const translated: TranslatedRequirements = {
        preferences: [],
        intolerances: [],
        allergies: [],
      };

      // Translate preferences
      Object.entries(requirements.preferences).forEach(([key, value]) => {
        if (value) {
          translated.preferences.push(t(`dietary.preferences.${key}`));
        }
      });

      // Translate intolerances
      Object.entries(requirements.intolerances).forEach(([key, value]) => {
        if (value) {
          translated.intolerances.push(t(`dietary.intolerances.${key}`));
        }
      });

      // Translate allergies
      Object.entries(requirements.allergies).forEach(([key, value]) => {
        if (value) {
          translated.allergies.push(t(`dietary.allergies.${key}`));
        }
      });

      setTranslatedRequirements(translated);
    };

    translateRequirements();
  }, [targetLanguage, requirements, i18n, t]);

  const handleLanguageChange = (event: any) => {
    setTargetLanguage(event.target.value);
  };

  const renderRequirementsList = (items: string[], header: string) => {
    if (items.length === 0) return null;
    
    return (
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" sx={{ mb: 1 }}>
          {header}
        </Typography>
        <List>
          {items.map((item, index) => (
            <ListItem key={index}>
              <ListItemText primary={item} />
            </ListItem>
          ))}
        </List>
      </Box>
    );
  };

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', mt: 4 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          {t('language.select')}
        </Typography>

        <FormControl fullWidth sx={{ mb: 4 }}>
          <InputLabel id="target-language-label">Target Language</InputLabel>
          <Select
            labelId="target-language-label"
            value={targetLanguage}
            label="Target Language"
            onChange={handleLanguageChange}
          >
            {languages.map((language) => (
              <MenuItem key={language.code} value={language.code}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <FlagIcon code={language.code} />
                  <span>{language.name}</span>
                </Box>
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {renderRequirementsList(translatedRequirements.preferences, t('dietary.preferences.header'))}
        {translatedRequirements.preferences.length > 0 && translatedRequirements.intolerances.length > 0 && <Divider sx={{ my: 2 }} />}
        {renderRequirementsList(translatedRequirements.intolerances, t('dietary.intolerances.header'))}
        {(translatedRequirements.preferences.length > 0 || translatedRequirements.intolerances.length > 0) && translatedRequirements.allergies.length > 0 && <Divider sx={{ my: 2 }} />}
        {renderRequirementsList(translatedRequirements.allergies, t('dietary.allergies.header'))}

        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-start' }}>
          <Button variant="outlined" onClick={onBack}>
            {t('buttons.back')}
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default TranslationResult; 