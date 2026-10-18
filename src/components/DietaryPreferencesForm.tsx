import React from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Button, Typography } from '@mui/material';
import { DietaryRequirements } from '../types';

interface DietaryPreferencesFormProps {
  requirements: DietaryRequirements;
  onChange: (requirements: DietaryRequirements) => void;
  onNext: () => void;
  onBack: () => void;
}

interface TickProps {
  label: string;
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

// A real checkbox, drawn as a flat chip: unticked on the stage tone, ticked in full ink with a pink mark.
const Tick: React.FC<TickProps> = ({ label, checked, onChange }) => (
  <Box component="label" sx={{ position: 'relative', display: 'inline-flex' }}>
    <Box
      component="input"
      type="checkbox"
      checked={checked}
      onChange={onChange}
      sx={{ position: 'absolute', inset: 0, width: '100%', height: '100%', m: 0, opacity: 0, cursor: 'pointer' }}
    />
    <Box
      component="span"
      sx={(theme) => ({
        display: 'inline-flex',
        alignItems: 'center',
        gap: 1.25,
        minHeight: 44,
        px: 1.75,
        bgcolor: checked ? 'text.primary' : 'stage',
        color: checked ? 'background.default' : 'text.primary',
        transition: 'background-color 180ms ease, color 180ms ease, transform 140ms cubic-bezier(0.22, 1, 0.36, 1)',
        'input:focus-visible + &': { outline: `2px solid ${theme.palette.primary.main}`, outlineOffset: 3 },
        'input:active + &': { transform: 'scale(0.97)' },
        '@media (hover: hover) and (pointer: fine)': {
          'input:hover + &': checked ? {} : { bgcolor: 'tick' },
        },
        '&::before': {
          content: '""',
          width: 12,
          height: 12,
          flex: 'none',
          bgcolor: checked ? 'primary.main' : 'tick',
          transform: checked ? 'rotate(45deg) scale(0.85)' : 'none',
          transition: 'background-color 180ms ease, transform 240ms cubic-bezier(0.22, 1, 0.36, 1)',
        },
      })}
    >
      {label}
    </Box>
  </Box>
);

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

  const renderGroup = (category: keyof DietaryRequirements, first = false) => (
    <Box component="fieldset" sx={{ minWidth: 0, m: 0, mt: first ? 0 : 4, p: 0, border: 0 }}>
      <Typography variant="h3" component="legend" sx={{ p: 0, mb: 1.5 }}>
        {t(`dietary.${category}.title`)}
      </Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
        {Object.entries(requirements[category]).map(([key, value]) => (
          <Tick
            key={key}
            label={t(`dietary.${category}.${key}`)}
            checked={value}
            onChange={handlePreferenceChange(category, key)}
          />
        ))}
      </Box>
    </Box>
  );

  return (
    <Box>
      {renderGroup('preferences', true)}
      {renderGroup('intolerances')}
      {renderGroup('allergies')}

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

export default DietaryPreferencesForm;
