import { createTheme, PaletteMode } from '@mui/material';

// Design v2 ("the quiet instrument"): one face (Switzer), white with navy ink by default,
// plum-black in dark mode, hot pink only on the primary action. Square corners, no shadows at rest.
// The same values are used by the static pages in public/designv2simple.

declare module '@mui/material/styles' {
  interface Palette {
    stage: string;
    tick: string;
  }
  interface PaletteOptions {
    stage?: string;
    tick?: string;
  }
}

const tokens = {
  light: {
    bg: '#ffffff',
    stage: '#f4f2f3',
    tick: '#e9e5e8',
    card: '#ffffff',
    ink: '#101421',
    muted: '#5b5e6b',
  },
  dark: {
    bg: '#0d060b',
    stage: '#1b0e17',
    tick: '#2a1824',
    card: '#241420',
    ink: '#ffffff',
    muted: '#b3a8b0',
  },
};

const accent = '#ff488b';
const font = '"Switzer", "Helvetica Neue", Arial, "Noto Sans", system-ui, sans-serif';

export const getTheme = (mode: PaletteMode) => {
  const c = tokens[mode];
  return createTheme({
    palette: {
      mode,
      primary: { main: accent, contrastText: mode === 'light' ? '#101421' : '#0d060b' },
      background: { default: c.bg, paper: c.card },
      text: { primary: c.ink, secondary: c.muted },
      stage: c.stage,
      tick: c.tick,
    },
    shape: { borderRadius: 0 },
    typography: {
      fontFamily: font,
      fontWeightMedium: 500,
      h1: { fontSize: 'clamp(2.5rem, 1rem + 4.4vw, 5.5rem)', fontWeight: 500, lineHeight: 1.05, letterSpacing: '-0.03em' },
      h2: { fontSize: 'clamp(1.25rem, 1.1rem + 0.7vw, 1.625rem)', fontWeight: 500, lineHeight: 1.3, letterSpacing: '-0.02em' },
      h3: { fontSize: '1.0625rem', fontWeight: 500, lineHeight: 1.4 },
      body1: { fontSize: 'clamp(1.0625rem, 1rem + 0.25vw, 1.1875rem)', lineHeight: 1.5, letterSpacing: '-0.01em' },
      body2: { fontSize: 'clamp(0.875rem, 0.85rem + 0.1vw, 0.9375rem)', lineHeight: 1.45 },
      button: { fontWeight: 500, textTransform: 'none', letterSpacing: '-0.01em' },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: { WebkitFontSmoothing: 'antialiased', transition: 'background-color 240ms ease, color 240ms ease' },
          '::selection': { background: accent, color: '#101421' },
        },
      },
      MuiButton: {
        defaultProps: { disableElevation: true, disableRipple: true },
        styleOverrides: {
          root: {
            minHeight: 48,
            padding: '0 22px',
            fontSize: 'inherit',
            transition: 'transform 140ms cubic-bezier(0.22, 1, 0.36, 1), background-color 180ms ease, color 180ms ease',
            '&:active': { transform: 'scale(0.97)' },
            '&.Mui-focusVisible': { outline: `2px solid ${accent}`, outlineOffset: 3 },
          },
          contained: {
            '&:hover': { backgroundColor: c.ink, color: c.bg },
          },
          // secondary actions read as plain text links, not outlined boxes
          outlined: {
            minWidth: 0,
            border: 0,
            padding: '0 4px',
            color: c.ink,
            textDecoration: 'underline',
            textDecorationColor: 'transparent',
            textUnderlineOffset: '0.25em',
            textDecorationThickness: 2,
            '&:hover': { border: 0, background: 'transparent', textDecorationColor: 'currentColor' },
          },
          text: {
            minWidth: 0,
            color: c.ink,
            '&:hover': { background: 'transparent', textDecoration: 'underline', textUnderlineOffset: '0.25em' },
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            backgroundColor: c.stage,
            '& .MuiOutlinedInput-notchedOutline': { border: 0 },
            '&.Mui-focused': { outline: `2px solid ${accent}`, outlineOffset: 3 },
          },
        },
      },
      MuiPaper: {
        defaultProps: { elevation: 0 },
      },
      MuiMenu: {
        // a menu truly floats, so it is the one thing allowed a shadow
        styleOverrides: { paper: { boxShadow: '0 12px 32px rgba(13, 6, 11, 0.18)' } },
      },
    },
  });
};

export default getTheme;
