import React from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Button, MenuItem, Select, Typography } from '@mui/material';
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
    <Box>
      <Typography variant="h2" component="label" id="language-select-label" sx={{ display: 'block' }}>
        {t('language.select')}
      </Typography>

      <Typography variant="body2" color="text.secondary" sx={{ mt: 0.75 }}>
        {t('language.detected')}: {languages.find(lang => lang.code === detectedLanguage)?.name || 'English'}
      </Typography>

      <Select
        fullWidth
        value={i18n.language}
        onChange={handleLanguageChange}
        inputProps={{ 'aria-labelledby': 'language-select-label' }}
        sx={{ mt: 2 }}
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

      <Box sx={{ mt: 7 }}>
        <Button variant="contained" color="primary" onClick={onNext}>
          {t('buttons.next')}
        </Button>
      </Box>
    </Box>
  );
};

export default LanguageSelector;
