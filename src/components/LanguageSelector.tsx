import React from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Button, MenuItem, Select, Typography } from '@mui/material';
import FlagIcon from './FlagIcon';
import { LANGUAGES } from '../constants';

interface LanguageSelectorProps {
  onNext: () => void;
  onBack: () => void;
}


const LanguageSelector: React.FC<LanguageSelectorProps> = ({ onNext, onBack }) => {
  const { t, i18n } = useTranslation();

  const handleLanguageChange = (event: any) => {
    i18n.changeLanguage(event.target.value);
  };

  return (
    <Box>
      <Typography variant="h2" component="label" id="language-select-label" sx={{ display: 'block' }}>
        {t('language.yours')}
      </Typography>

      <Select
        fullWidth
        value={i18n.language}
        onChange={handleLanguageChange}
        inputProps={{ 'aria-labelledby': 'language-select-label' }}
        sx={{ mt: 2 }}
      >
        {LANGUAGES.map((language) => (
          <MenuItem key={language.code} value={language.code}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <FlagIcon code={language.code} />
              <span>{language.name}</span>
            </Box>
          </MenuItem>
        ))}
      </Select>

      <Box sx={{ mt: 7, display: 'flex', alignItems: 'center', gap: 3 }}>
        <Button variant="contained" color="primary" onClick={onNext}>
          {t('buttons.next')}
        </Button>
        <Button variant="outlined" onClick={onBack}>
          {t('buttons.back')}
        </Button>
      </Box>
    </Box>
  );
};

export default LanguageSelector;
