import { useContext } from 'react';

import { FilterContext } from '../context/filter/context';

function useFilterContext() {
  const context = useContext(FilterContext);

  if (!context) throw new Error('useFilterContext context must be use inside provider');

  return context;
};

export default useFilterContext;
