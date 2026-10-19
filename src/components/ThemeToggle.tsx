import React, { useId } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, ButtonBase } from '@mui/material';

// Light/dark switch drawn as a sun that turns into a crescent moon: the rays turn away and a
// masked circle slides across the sun. Based on the sun-and-moon toggle sample; CSS transitions only.

interface ThemeToggleProps {
  dark: boolean;
  onToggle: () => void;
}

const spring = 'cubic-bezier(0.5, 1.25, 0.75, 1.25)';
const settle = 'cubic-bezier(0.25, 1, 0.5, 1)';

const ThemeToggle: React.FC<ThemeToggleProps> = ({ dark, onToggle }) => {
  const { t } = useTranslation();
  // each toggle needs its own mask id, as the landing screen and the header can both exist
  const maskId = `moon-mask-${useId().replace(/:/g, '')}`;

  return (
    <ButtonBase
      onClick={onToggle}
      aria-pressed={dark}
      aria-label={dark ? t('landing.lightMode') : t('landing.darkMode')}
      title={dark ? t('landing.lightMode') : t('landing.darkMode')}
      sx={(theme) => ({
        width: 44,
        height: 44,
        mr: '-10px', // keep the icon itself on the page margin
        color: 'text.primary',
        transition: 'background-color 180ms ease, transform 140ms cubic-bezier(0.22, 1, 0.36, 1)',
        '&:active': { transform: 'scale(0.92)' },
        '&.Mui-focusVisible': { outline: `2px solid ${theme.palette.primary.main}`, outlineOffset: 2 },
        '@media (hover: hover) and (pointer: fine)': { '&:hover': { bgcolor: 'stage' } },
      })}
    >
      <Box
        component="svg"
        viewBox="0 0 24 24"
        aria-hidden="true"
        sx={{
          width: 24,
          height: 24,
          '& .sun, & .sun-beams, & .moon > circle': { transformOrigin: 'center center', transformBox: 'view-box' },
          '& .sun': { fill: 'currentColor', transition: `transform 500ms ${settle}`, transform: dark ? 'scale(1.75)' : 'none' },
          '& .sun-beams': {
            stroke: 'currentColor',
            strokeWidth: 2,
            strokeLinecap: 'round',
            transition: `transform 500ms ${spring}, opacity 500ms ease`,
            opacity: dark ? 0 : 1,
            transform: dark ? 'rotate(-45deg)' : 'none',
          },
          '& .moon > circle': { transition: `transform 500ms ${settle}`, transform: dark ? 'translateX(-7px)' : 'none' },
          '@media (prefers-reduced-motion: reduce)': { '& .sun, & .sun-beams, & .moon > circle': { transition: 'none' } },
        }}
      >
        <mask className="moon" id={maskId}>
          <rect x="0" y="0" width="100%" height="100%" fill="white" />
          <circle cx="24" cy="10" r="6" fill="black" />
        </mask>
        <circle className="sun" cx="12" cy="12" r="6" mask={`url(#${maskId})`} />
        <g className="sun-beams">
          <line x1="12" y1="1" x2="12" y2="3" />
          <line x1="12" y1="21" x2="12" y2="23" />
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
          <line x1="1" y1="12" x2="3" y2="12" />
          <line x1="21" y1="12" x2="23" y2="12" />
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
        </g>
      </Box>
    </ButtonBase>
  );
};

export default ThemeToggle;
