import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { keyframes } from '@emotion/react';
import { Box, Button, Typography } from '@mui/material';
import Logo from './Logo';

// The landing screen, from public/designv2simple/index.html: two halves a step apart in tone,
// the words bottom-left and one example card on the right that turns through the waiter's languages.

interface LandingProps {
  onStart: () => void;
  darkMode: boolean;
  onToggleMode: () => void;
}

// The example card: a fresh set of needs on every page load (one diet, one intolerance, two allergies),
// shown in languages the app loads. Keys match src/types.
type Category = 'preferences' | 'intolerances' | 'allergies';
const choices: Record<Category, string[]> = {
  preferences: ['vegan', 'vegetarian', 'pescatarian', 'halal', 'kosher', 'glutenFree'],
  intolerances: ['lactose', 'gluten', 'fructose'],
  allergies: ['nuts', 'shellfish', 'eggs', 'milk', 'soy', 'wheat', 'fish'],
};

// n different keys, in the order the app lists them
const pickKeys = (category: Category, n: number) => {
  const pool = [...choices[category]];
  const picked: string[] = [];
  while (picked.length < n && pool.length) picked.push(pool.splice(Math.floor(Math.random() * pool.length), 1)[0]);
  return choices[category].filter((key) => picked.includes(key));
};

const randomExample = (): { category: Category; keys: string[] }[] => [
  { category: 'preferences', keys: pickKeys('preferences', 1) },
  { category: 'intolerances', keys: pickKeys('intolerances', 1) },
  { category: 'allergies', keys: pickKeys('allergies', 2) },
];
const cardLanguages = [
  { code: 'ja', name: '日本語', separator: '、' },
  { code: 'fr', name: 'Français', separator: ', ' },
  { code: 'es', name: 'Español', separator: ', ' },
  { code: 'ko', name: '한국어', separator: ', ' },
];

const margin = 'clamp(20px, 2.8vw, 40px)';
const easeOut = 'cubic-bezier(0.22, 1, 0.36, 1)';
const lineUp = keyframes`from { transform: translateY(105%); } to { transform: none; }`;
const rise = keyframes`from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: none; }`;
const moving = '@media (prefers-reduced-motion: no-preference)';

// each headline line rises from behind its own baseline
const MaskedLine: React.FC<{ index: number; children: React.ReactNode }> = ({ index, children }) => (
  <Box component="span" sx={{ display: 'inline-block', overflow: 'hidden', pb: '0.1em', mb: '-0.1em', verticalAlign: 'top' }}>
    <Box
      component="span"
      sx={{ display: 'inline-block', [moving]: { transform: 'translateY(105%)', animation: `${lineUp} 900ms ${easeOut} forwards`, animationDelay: `${index * 110 + 150}ms` } }}
    >
      {children}
    </Box>
  </Box>
);

const riseIn = { [moving]: { opacity: 0, animation: `${rise} 700ms ${easeOut} 600ms forwards` } };

const Landing: React.FC<LandingProps> = ({ onStart, darkMode, onToggleMode }) => {
  const { t, i18n } = useTranslation();
  // drawn once per load, so it holds steady while the card turns through languages
  const [example] = useState(randomExample);
  const [shown, setShown] = useState(0);
  const [fading, setFading] = useState(false);
  const [paused, setPaused] = useState(false);

  // turn slowly through the languages; still under reduced motion, paused on hover or a hidden tab
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    let swap: ReturnType<typeof setTimeout>;
    const timer = setInterval(() => {
      if (paused || document.hidden) return;
      setFading(true);
      swap = setTimeout(() => {
        setShown((n) => (n + 1) % cardLanguages.length);
        setFading(false);
      }, 360);
    }, 3200);
    return () => {
      clearInterval(timer);
      clearTimeout(swap);
    };
  }, [paused]);

  const card = cardLanguages[shown];
  const waiterT = i18n.getFixedT(card.code);

  let yours = i18n.language;
  try {
    yours = new Intl.DisplayNames([i18n.language], { type: 'language' }).of(i18n.language) ?? yours;
  } catch {
    // older browsers: the language code will do
  }
  const ownVersion = example
    .map(({ category, keys }) => keys.map((key) => t(`dietary.${category}.${key}`)).join(', '))
    .join('. ');

  return (
    <>
      <Box sx={{ position: 'relative', display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, minHeight: { md: '100svh' } }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', p: margin, pt: { xs: 0, md: margin } }}>
          <Box
            sx={{
              display: 'inline-flex', alignItems: 'center', gap: 1.5, fontWeight: 500,
              position: { xs: 'absolute', md: 'static' }, top: margin, left: margin, zIndex: 1,
            }}
          >
            <Logo />
            <span>Dietary Translator</span>
          </Box>

          {/* centred in the column on desktop, so it lines up with the card instead of sinking on tall screens */}
          <Box sx={{ mt: { xs: 5, md: 'auto' }, mb: { md: 'auto' } }}>
            <Typography variant="h1" sx={(theme) => ({ fontSize: { xs: '10vw', md: theme.typography.h1.fontSize }, textWrap: 'balance' })}>
              <MaskedLine index={0}>{t('landing.titleLine1')}</MaskedLine>{' '}
              <MaskedLine index={1}>{t('landing.titleLine2')}</MaskedLine>
            </Typography>
            <Typography sx={{ maxWidth: '40ch', mt: 3.5, ...riseIn }}>{t('landing.lead')}</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ maxWidth: '44ch', mt: 1.5, ...riseIn }}>
              {t('landing.note')}
            </Typography>
            <Box sx={{ mt: 4.5, ...riseIn }}>
              <Button variant="contained" color="primary" onClick={onStart}>
                {t('landing.start')}
              </Button>
            </Box>
          </Box>
        </Box>

        <Box
          sx={{
            order: { xs: -1, md: 0 }, position: 'relative', display: 'grid', placeItems: 'center',
            minHeight: { xs: '58svh', md: 'auto' }, bgcolor: 'stage',
            p: `calc(${margin} * 2) ${margin}`, pt: { xs: '72px', md: `calc(${margin} * 2)` },
            transition: 'background-color 240ms ease',
          }}
        >
          <Button
            variant="text"
            onClick={onToggleMode}
            aria-pressed={darkMode}
            sx={{ position: 'absolute', top: margin, right: margin, minHeight: 0, p: '6px 0', typography: 'body2', fontWeight: 500 }}
          >
            {darkMode ? t('landing.lightMode') : t('landing.darkMode')}
          </Button>

          <Box
            component="figure"
            aria-label={t('landing.example')}
            onPointerEnter={() => setPaused(true)}
            onPointerLeave={() => setPaused(false)}
            sx={{
              m: 0, width: { xs: '78vw', md: 'min(450px, 100%)' }, aspectRatio: { md: '1' },
              display: 'flex', flexDirection: 'column', p: { xs: 3, md: 4.5 },
              bgcolor: 'background.paper', transition: 'background-color 240ms ease',
            }}
          >
            <Typography variant="body2" color="text.secondary" lang={card.code} sx={{ fontWeight: 500 }}>
              {card.name}
            </Typography>
            <Box
              lang={card.code}
              sx={{ mt: 'auto', pt: 3, opacity: fading ? 0 : 1, transform: fading ? 'translateY(8px)' : 'none', transition: `opacity 360ms ease, transform 360ms ${easeOut}` }}
            >
              {example.map(({ category, keys }) => (
                <Box key={category} sx={{ mb: 2.25, '&:last-of-type': { mb: 0 } }}>
                  <Typography variant="h2" component="p" sx={{ fontWeight: 500, lineHeight: 1.2, letterSpacing: 0 }}>
                    {keys.map((key) => waiterT(`dietary.${category}.${key}`)).join(card.separator)}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {waiterT(`dietary.${category}.title`)}
                  </Typography>
                </Box>
              ))}
            </Box>
            <Typography component="figcaption" variant="body2" color="text.secondary" sx={{ mt: 3 }}>
              {ownVersion}. {t('landing.readout', { yours })}
            </Typography>
          </Box>
        </Box>
      </Box>

      <Box
        component="footer"
        sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: 1, p: '30px', px: margin, typography: 'body2', color: 'text.secondary' }}
      >
        <span>{t('landing.free')}</span>
        <span>© 2026</span>
      </Box>
    </>
  );
};

export default Landing;
