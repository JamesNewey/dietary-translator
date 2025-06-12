import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#FF4B2B',
      light: '#FF6B4B',
      dark: '#E63E1F',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#FFD700',
      light: '#FFE44D',
      dark: '#E6C200',
      contrastText: '#000000',
    },
    background: {
      default: '#FFFFFF',
      paper: '#F8F9FA',
    },
    text: {
      primary: '#1A1A1A',
      secondary: '#666666',
    },
  },
  typography: {
    fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
    h1: {
      fontFamily: '"Bangers", cursive',
      fontSize: '3rem',
      letterSpacing: '0.05em',
    },
    h2: {
      fontFamily: '"Bangers", cursive',
      fontSize: '2.5rem',
      letterSpacing: '0.05em',
    },
    h3: {
      fontFamily: '"Bangers", cursive',
      fontSize: '2rem',
      letterSpacing: '0.05em',
    },
    h4: {
      fontFamily: '"Bangers", cursive',
      fontSize: '1.75rem',
      letterSpacing: '0.05em',
    },
    h5: {
      fontFamily: '"Bangers", cursive',
      fontSize: '1.5rem',
      letterSpacing: '0.05em',
    },
    h6: {
      fontFamily: '"Bangers", cursive',
      fontSize: '1.25rem',
      letterSpacing: '0.05em',
    },
    button: {
      fontFamily: '"Bangers", cursive',
      fontSize: '1.1rem',
      letterSpacing: '0.05em',
      textTransform: 'none',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          padding: '8px 24px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 6px 8px rgba(0, 0, 0, 0.15)',
          },
          transition: 'all 0.2s ease-in-out',
        },
        contained: {
          background: 'linear-gradient(45deg, #FF4B2B 30%, #FF6B4B 90%)',
          '&:hover': {
            background: 'linear-gradient(45deg, #E63E1F 30%, #FF4B2B 90%)',
          },
        },
        outlined: {
          borderWidth: '2px',
          '&:hover': {
            borderWidth: '2px',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          borderRadius: '4px',
          margin: '4px',
          '&:hover': {
            backgroundColor: 'rgba(255, 75, 43, 0.1)',
          },
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          '&.Mui-checked': {
            color: '#FF4B2B',
          },
        },
      },
    },
  },
});

export default theme; 