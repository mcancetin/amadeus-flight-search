import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';

import Main from './pages/main';

import { FilterProvider } from './context/filter/provider';

function App() {
  return (
    <>
      <FilterProvider>
        <CssBaseline />
        <Main />
      </FilterProvider>
    </>
  )
}

export default App;
