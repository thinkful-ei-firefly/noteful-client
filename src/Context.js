import React from 'react';
import dummyStore from './dummy-store';



const Context = React.createContext({
  folders: dummyStore.folders,
  notes: dummyStore.notes,
});



export default Context;
