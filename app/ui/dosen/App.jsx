import React from 'react';
import DataPage from './DataPage';

const App = () => (
  <div>
    <h1>Dosen Management</h1>
    <DataPage endpoint="dosen" />
    <h1>Ruangan Management</h1>
    <DataPage endpoint="ruangan" />
    {/* Add more DataPage components for other endpoints as needed */}
  </div>
);

export default App;
