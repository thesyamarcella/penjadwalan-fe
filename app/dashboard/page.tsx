"use client"
import React from 'react';
import DataPage from './Data/Page';




const App: React.FC = () => (
  <div>
    <h1>Dosen Management</h1>
    <DataPage endpoint="dosen" />
    <h1>Ruangan Management</h1>
    <DataPage endpoint="ruangan" />
    <h1>Kelas Management</h1>
    <DataPage endpoint="kelas" />
    <h1>Preferensi Jadwal Management</h1>
    <DataPage endpoint="preferensi" />
    <h1>Mata Kuliah Management</h1>
    <DataPage endpoint="mata-kuliah" />
  </div>
);

export default App;
