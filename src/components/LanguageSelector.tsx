import React from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Button, FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import FlagIcon from './FlagIcon';

interface LanguageSelectorProps {
  onNext: () => void;
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
];

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ onNext }) => {
  const { t, i18n } = useTranslation();
  const detectedLanguage = navigator.language.split('-')[0] || 'en';

  const handleLanguageChange = (event: any) => {
    i18n.changeLanguage(event.target.value);
  };

  return (
    <Box sx={{ maxWidth: 400, mx: 'auto', mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        {t('language.select')}
      </Typography>
      
      <Typography variant="body2" color="text.secondary" gutterBottom>
        {t('language.detected')}: {languages.find(lang => lang.code === detectedLanguage)?.name || 'English'}
      </Typography>

      <FormControl fullWidth sx={{ mt: 2 }}>
        <InputLabel id="language-select-label">Language</InputLabel>
        <Select
          labelId="language-select-label"
          value={i18n.language}
          label="Language"
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

      <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          variant="contained"
          color="primary"
          onClick={onNext}
        >
          {t('buttons.next')}
        </Button>
      </Box>
    </Box>
  );
};

export default LanguageSelector; 