import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Box,
  Button,
  FormControlLabel,
  FormGroup,
  Paper,
  Typography,
  Checkbox,
} from '@mui/material';
import { DietaryRequirements } from '../types';

interface DietaryPreferencesFormProps {
  requirements: DietaryRequirements;
  onChange: (requirements: DietaryRequirements) => void;
  onNext: () => void;
  onBack: () => void;
}

const DietaryPreferencesForm: React.FC<DietaryPreferencesFormProps> = ({
  requirements,
  onChange,
  onNext,
  onBack,
}) => {
  const { t } = useTranslation();

  const handlePreferenceChange = (category: keyof DietaryRequirements, key: string) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    onChange({
      ...requirements,
      [category]: {
        ...requirements[category],
        [key]: event.target.checked,
      },
    });
  };

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', mt: 4 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          {t('dietary.preferences.title')}
        </Typography>
        <FormGroup>
          {Object.entries(requirements.preferences).map(([key, value]) => (
            <FormControlLabel
              key={key}
              control={
                <Checkbox
                  checked={value}
                  onChange={handlePreferenceChange('preferences', key)}
                />
              }
              label={t(`dietary.preferences.${key}`)}
            />
          ))}
        </FormGroup>

        <Typography variant="h6" sx={{ mt: 4 }} gutterBottom>
          {t('dietary.intolerances.title')}
        </Typography>
        <FormGroup>
          {Object.entries(requirements.intolerances).map(([key, value]) => (
            <FormControlLabel
              key={key}
              control={
                <Checkbox
                  checked={value}
                  onChange={handlePreferenceChange('intolerances', key)}
                />
              }
              label={t(`dietary.intolerances.${key}`)}
            />
          ))}
        </FormGroup>

        <Typography variant="h6" sx={{ mt: 4 }} gutterBottom>
          {t('dietary.allergies.title')}
        </Typography>
        <FormGroup>
          {Object.entries(requirements.allergies).map(([key, value]) => (
            <FormControlLabel
              key={key}
              control={
                <Checkbox
                  checked={value}
                  onChange={handlePreferenceChange('allergies', key)}
                />
              }
              label={t(`dietary.allergies.${key}`)}
            />
          ))}
        </FormGroup>

        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between' }}>
          <Button variant="outlined" onClick={onBack}>
            {t('buttons.back')}
          </Button>
          <Button variant="contained" color="primary" onClick={onNext}>
            {t('buttons.next')}
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default DietaryPreferencesForm; 