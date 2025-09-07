'use client';
import { createTheme } from '@mui/material/styles';
// Removed: import { Roboto } from 'next/font/google';

// Removed: const roboto = Roboto({ ... });

const theme = createTheme({
  palette: {
    primary: {
      main: '#556cd6',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: '#red',
    },
    background: {
      default: '#f4f6f8',
      paper: '#ffffff',
    },
  },
  typography: {
    // The explicit fontFamily is removed. MUI will use its default "Roboto", sans-serif.
    // This avoids the build conflict with babel.
  },
  components: {
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
      },
    },
  },
});

export default theme;
