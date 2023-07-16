import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';

import { Dashboard } from './components/dashboard/DashBoard';
import { useTheme } from './theme/useTheme';

const App = () => {
  const { theme } = useTheme();

  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route path="*" element={<Dashboard />} />
      </Routes>
    </ThemeProvider>
  );
};

export default App;
