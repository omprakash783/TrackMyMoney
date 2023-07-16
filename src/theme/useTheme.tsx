import { createTheme } from '@mui/material';

export const useTheme = () => {
  const theme = createTheme({
    palette: {
      mode: 'light',
      primary: {
        main: '#000',
      },
      secondary: {
        main: '#862e9c',
      },
      success: {
        main: '#2b8a3e',
      },
      error: {
        main: '#c92a2a',
      },
      background: {
        paper: '#d0bfff',
        default: '#d0bfff',
      },
      text: {
        primary: '#000',
        secondary: '#2b8a3e',
      },
    },
  });

  return { theme };
};
