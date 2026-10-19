import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { keyframes } from '@emotion/react';
import { Box, Button, Typography } from '@mui/material';
import FlagIcon from './FlagIcon';
import Logo from './Logo';
import ThemeToggle from './ThemeToggle';
import { Category, EASE_OUT, LANGUAGES, PAGE_MARGIN, needKeys } from '../constants';

// The landing screen, from public/designv2simple/index.html: two halves a step apart in tone,
// the words bottom-left and one example card on the right that turns through the waiter's languages.

interface LandingProps {
  onStart: () => void;
  darkMode: boolean;
  onToggleMode: () => void;
}

// The example card: a fresh set of needs on every page load (one diet, one intolerance, two allergies),
// shown in languages the app loads. Keys match src/types.

// n different keys, in the order the app lists them
const pickKeys = (category: Category, n: number) => {
  const pool = needKeys(category);
  const picked: string[] = [];
  while (picked.length < n && pool.length) picked.push(pool.splice(Math.floor(Math.random() * pool.length), 1)[0]);
  return needKeys(category).filter((key) => picked.includes(key));
};

const randomExample = (): { category: Category; keys: string[] }[] => [
  { category: 'preferences', keys: pickKeys('preferences', 1) },
  { category: 'intolerances', keys: pickKeys('intolerances', 1) },
  { category: 'allergies', keys: pickKeys('allergies', 2) },
];
// Every loaded language except the visitor's own, in a fresh random order on each load.
// Each is named in itself (日本語, Français), using the browser's own language names.
const SEPARATORS: Record<string, string> = { ja: '、', zh: '、' };

const nativeName = (code: string) => {
  try {
    const name = new Intl.DisplayNames([code], { type: 'language' }).of(code) ?? code;
    return name.charAt(0).toLocaleUpperCase(code) + name.slice(1);
  } catch {
    return LANGUAGES.find((lang) => lang.code === code)?.name ?? code;
  }
};

const randomCardLanguages = (own: string) => {
  const codes = LANGUAGES.map((lang) => lang.code).filter((code) => code !== own.split('-')[0]);
  for (let i = codes.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [codes[i], codes[j]] = [codes[j], codes[i]];
  }
  return codes.map((code) => ({ code, name: nativeName(code), separator: SEPARATORS[code] ?? ', ' }));
};

const margin = PAGE_MARGIN;
const easeOut = EASE_OUT;
const lineUp = keyframes`from { transform: translateY(105%); } to { transform: none; }`;
const rise = keyframes`from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: none; }`;
const moving = '@media (prefers-reduced-motion: no-preference)';

// the headline rises from behind its own baseline
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
  const [cardLanguages] = useState(() => randomCardLanguages(i18n.language));
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
      // pausing mid-fade cancels the swap, so bring the text back rather than leave it invisible
      setFading(false);
    };
  }, [paused, cardLanguages.length]);

  const card = cardLanguages[shown];
  const targetT = i18n.getFixedT(card.code);

  const ownVersion = example
    .map(({ category, keys }) => keys.map((key) => t(`dietary.${category}.items.${key}`)).join(', '))
    .join('. ');

  const startButton = (
    <Button variant="contained" color="primary" onClick={onStart}>
      {t('landing.start')}
    </Button>
  );

  return (
    <>
      <Box sx={{ position: 'relative', display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, minHeight: { md: '100svh' } }}>
        {/* top-right of the page in both layouts; level with the logo: the 44px button centres its icon
            22px down, the 32px logo 16px down */}
        <Box sx={{ position: 'absolute', top: `calc(${margin} - 6px)`, right: margin, zIndex: 1 }}>
          <ThemeToggle dark={darkMode} onToggle={onToggleMode} />
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', p: margin }}>
          <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1.5, fontWeight: 500 }}>
            <Logo />
            <span>Dietary Translator</span>
          </Box>

          {/* centred in the column on desktop, so it lines up with the card instead of sinking on tall screens */}
          <Box sx={{ mt: { xs: 5, md: 'auto' }, mb: { md: 'auto' } }}>
            <Typography variant="h1" sx={(theme) => ({ fontSize: { xs: '10vw', md: theme.typography.h1.fontSize }, textWrap: 'balance' })}>
              <MaskedLine index={0}>{t('landing.title')}</MaskedLine>
            </Typography>
            <Typography sx={{ maxWidth: '40ch', mt: 3.5, ...riseIn }}>{t('landing.lead')}</Typography>
            <Box component="ul" sx={{ listStyle: 'none', m: 0, mt: 2, p: 0, display: 'flex', flexDirection: 'column', gap: 0.75, ...riseIn }}>
              {['preferences', 'allergies', 'intolerances'].map((category) => (
                <Typography
                  key={category}
                  component="li"
                  sx={{
                    display: 'flex', alignItems: 'center', gap: 1.25,
                    // the same pink mark as a ticked need
                    '&::before': { content: '""', width: 10, height: 10, flex: 'none', bgcolor: 'primary.main', transform: 'rotate(45deg) scale(0.85)' },
                  }}
                >
                  {t(`dietary.${category}.title`)}
                </Typography>
              ))}
            </Box>
            <Typography variant="body2" color="text.secondary" sx={{ maxWidth: '44ch', mt: 1.5, ...riseIn }}>
              {t('landing.note')}
            </Typography>
            {/* beside the text on desktop; on a phone it follows the example card (below) */}
            <Box sx={{ display: { xs: 'none', md: 'block' }, mt: 4.5, ...riseIn }}>
              {startButton}
            </Box>
          </Box>
        </Box>

        <Box
          sx={{
            // on a phone the card follows the text
            display: 'grid', placeItems: 'center', bgcolor: 'stage',
            p: `calc(${margin} * 2) ${margin}`,
            transition: 'background-color 240ms ease',
          }}
        >
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
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <FlagIcon code={card.code} width={21} height={14} />
              <Typography variant="body2" color="text.secondary" lang={card.code} sx={{ fontWeight: 500 }}>
                {card.name}
              </Typography>
            </Box>
            <Box
              lang={card.code}
              sx={{ mt: 'auto', pt: 3, opacity: fading ? 0 : 1, transform: fading ? 'translateY(8px)' : 'none', transition: `opacity 360ms ease, transform 360ms ${easeOut}` }}
            >
              {example.map(({ category, keys }) => (
                <Box key={category} sx={{ mb: 2.25, '&:last-of-type': { mb: 0 } }}>
                  <Typography variant="h2" component="p" sx={{ fontWeight: 500, lineHeight: 1.2, letterSpacing: 0 }}>
                    {keys.map((key) => targetT(`dietary.${category}.items.${key}`)).join(card.separator)}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {targetT(`dietary.${category}.title`)}
                  </Typography>
                </Box>
              ))}
            </Box>
            <Typography component="figcaption" variant="body2" color="text.secondary" sx={{ mt: 3 }}>
              {ownVersion}.
            </Typography>
          </Box>
        </Box>

        <Box sx={{ display: { xs: 'block', md: 'none' }, p: margin, pt: 4.5 }}>
          {startButton}
        </Box>
      </Box>

      <Box
        component="footer"
        sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: 1, p: '30px', px: margin, typography: 'body2', color: 'text.secondary' }}
      >
        <span>Dietary Translator © 2026</span>
      </Box>
    </>
  );
};

export default Landing;
