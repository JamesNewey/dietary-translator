import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Button, MenuItem, Select, Typography } from '@mui/material';
import { DietaryRequirements } from '../types';
import FlagIcon from './FlagIcon';
import { pageTitleSx } from '../theme';
import { loadTargetLanguage, saveTargetLanguage } from '../storage';
import { CATEGORIES, Category, LANGUAGES, PAGE_MARGIN } from '../constants';

interface TranslationResultProps {
  requirements: DietaryRequirements;
  onBack: () => void;
}


const TranslationResult: React.FC<TranslationResultProps> = ({
  requirements,
  onBack,
}) => {
  const { t, i18n } = useTranslation();
  const [targetLanguage, setTargetLanguage] = useState(() => loadTargetLanguage() ?? i18n.language);

  // The card is written with a translator fixed to the waiter's language, so the rest of the
  // interface stays in the visitor's own language and their own version can sit under the card.
  const targetT = i18n.getFixedT(targetLanguage);

  const ticked = (category: Category) =>
    Object.entries(requirements[category]).filter(([, value]) => value).map(([key]) => key);

  // Some languages have no "I have the following …" sentence; use the group's title rather than
  // falling back to an English sentence on a card the waiter reads.
  const lead = (category: Category) =>
    i18n.getResource(targetLanguage, 'translation', `dietary.${category}.header`)
      ? targetT(`dietary.${category}.header`)
      : targetT(`dietary.${category}.title`);

  const groups = CATEGORIES.filter((category) => ticked(category).length > 0);
  // the card may run wider than the page column; the row under it matches
  const cardWidth = `min(900px, calc(100vw - ${PAGE_MARGIN} * 2))`;

  const handleLanguageChange = (event: any) => {
    setTargetLanguage(event.target.value);
    saveTargetLanguage(event.target.value);
  };

  return (
    <Box>
      <Typography variant="h1" lang={targetLanguage} sx={pageTitleSx}>
        {targetT('dietary.title')}
      </Typography>

      <Box
        component="article"
        lang={targetLanguage}
        sx={{
          width: cardWidth,
          minHeight: '50svh',
          display: 'flex',
          flexDirection: 'column',
          p: 'clamp(28px, 4vw, 56px)',
          bgcolor: 'stage',
          transition: 'background-color 240ms ease',
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 'clamp(28px, 4vw, 48px)' }}>
          {groups.map((category) => (
            <Box key={category}>
              <Typography variant="h2" component="p" sx={{ fontWeight: 400 }}>
                {lead(category)}
              </Typography>
              <Typography
                component="p"
                sx={{ mt: 1, fontSize: 'clamp(2rem, 1.3rem + 3.2vw, 4rem)', fontWeight: 500, lineHeight: 1.1, letterSpacing: '-0.02em' }}
              >
                {ticked(category).map((key) => targetT(`dietary.${category}.items.${key}`)).join(', ')}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>

      {/* Back on the left, the language picker on the right, as wide as the card */}
      <Box
        sx={{
          width: cardWidth, mt: 5,
          display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '16px 32px',
        }}
      >
        <Button variant="outlined" onClick={onBack}>
          {t('buttons.back')}
        </Button>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, ml: 'auto' }}>
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
            {LANGUAGES.map((language) => (
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
    </Box>
  );
};

export default TranslationResult;
