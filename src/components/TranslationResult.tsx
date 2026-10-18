import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Button, MenuItem, Select, Typography } from '@mui/material';
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

const categories: (keyof DietaryRequirements)[] = ['preferences', 'intolerances', 'allergies'];

const TranslationResult: React.FC<TranslationResultProps> = ({
  requirements,
  onBack,
}) => {
  const { t, i18n } = useTranslation();
  const [targetLanguage, setTargetLanguage] = useState(i18n.language);

  // The card is written with a translator fixed to the waiter's language, so the rest of the
  // interface stays in the visitor's own language and their own version can sit under the card.
  const waiterT = i18n.getFixedT(targetLanguage);

  const ticked = (category: keyof DietaryRequirements) =>
    Object.entries(requirements[category]).filter(([, value]) => value).map(([key]) => key);

  // Some languages have no "I have the following …" sentence; use the group's title rather than
  // falling back to an English sentence on a card the waiter reads.
  const lead = (category: keyof DietaryRequirements) =>
    i18n.getResource(targetLanguage, 'translation', `dietary.${category}.header`)
      ? waiterT(`dietary.${category}.header`)
      : waiterT(`dietary.${category}.title`);

  const groups = categories.filter((category) => ticked(category).length > 0);
  const ownVersion = groups
    .map((category) => ticked(category).map((key) => t(`dietary.${category}.${key}`)).join(', '))
    .join('. ');

  const handleLanguageChange = (event: any) => {
    setTargetLanguage(event.target.value);
  };

  return (
    <Box>
      <Box
        component="article"
        lang={targetLanguage}
        sx={{
          width: 'min(900px, calc(100vw - clamp(20px, 2.8vw, 40px) * 2))',
          minHeight: '50svh',
          display: 'flex',
          flexDirection: 'column',
          p: 'clamp(28px, 4vw, 56px)',
          bgcolor: 'stage',
          transition: 'background-color 240ms ease',
        }}
      >
        <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
          {languages.find((lang) => lang.code === targetLanguage)?.name ?? targetLanguage}
        </Typography>

        <Box sx={{ mt: 'auto', pt: 5, display: 'flex', flexDirection: 'column', gap: 'clamp(28px, 4vw, 48px)' }}>
          {groups.map((category) => (
            <Box key={category}>
              <Typography variant="h2" component="p" sx={{ fontWeight: 400 }}>
                {lead(category)}
              </Typography>
              <Typography
                component="p"
                sx={{ mt: 1, fontSize: 'clamp(2rem, 1.3rem + 3.2vw, 4rem)', fontWeight: 500, lineHeight: 1.1, letterSpacing: '-0.02em' }}
              >
                {ticked(category).map((key) => waiterT(`dietary.${category}.${key}`)).join(', ')}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>

      <Box sx={{ mt: 2.5, display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '16px 32px' }}>
        {targetLanguage !== i18n.language && ownVersion && (
          <Typography variant="body2" color="text.secondary" sx={{ maxWidth: '60ch' }}>
            {ownVersion}
          </Typography>
        )}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Typography variant="body2" component="label" id="target-language-label">
            {t('language.select')}
          </Typography>
          <Select
            size="small"
            value={targetLanguage}
            onChange={handleLanguageChange}
            inputProps={{ 'aria-labelledby': 'target-language-label' }}
            sx={{ typography: 'body2' }}
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
        </Box>
      </Box>

      <Box sx={{ mt: 7 }}>
        <Button variant="outlined" onClick={onBack}>
          {t('buttons.back')}
        </Button>
      </Box>
    </Box>
  );
};

export default TranslationResult;
