"use client"
import React, { useState, useEffect } from 'react';
import AddKelasModal from './AddKelasModal';

interface Kelas {
  id: number;
  nama_kelas: string;
  kuota: number;
  id_prodi: number;
  nama_prodi: string;
  id_dosen_wali: number;
  inisial: string;
  nama: string;
}

const KelasList: React.FC = () => {
  const [kelas, setKelas] = useState<Kelas[]>([]);
  const [isNewKelasModalOpen, setIsNewKelasModalOpen] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<number | null>(null);

  useEffect(() => {
    const fetchKelas = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/kelas/');
        const data = await response.json();
        setKelas(data);
      } catch (error) {
        console.error('Error fetching kelas:', error);
      }
    };

    fetchKelas();
  }, []);

  const handleEdit = (kelasId: number) => {
    setIsEditing(kelasId);
  };

  const handleDelete = async (kelasId: number) => {
    try {
      await fetch(`http://127.0.0.1:8000/kelas/${kelasId}`, {
        method: 'DELETE',
      });
      setKelas(prevKelas => prevKelas.filter(kelas => kelas.id !== kelasId));
    } catch (error) {
      console.error('Error deleting kelas:', error);
    }
  };

  const handleSave = async (kelasId: number, updatedKelas: Kelas) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/kelas/${kelasId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedKelas),
      });

      if (response.ok) {
        setKelas(prevKelas =>
          prevKelas.map(kelas => (kelas.id === kelasId ? updatedKelas : kelas))
        );
        setIsEditing(null);
      } else {
        console.error('Failed to update kelas');
      }
    } catch (error) {
      console.error('Error updating kelas:', error);
    }
  };

  const handleAddKelas = async (newKelas: Kelas) => {
    try {
      const response = await fetch('http://127.0.0.1:8000/kelas/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newKelas),
      });
      const createdKelas = await response.json();
      setKelas([...kelas, createdKelas]);
    } catch (error) {
      console.error('Error adding kelas:', error);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4 mt-8">
        <h1 className="text-2xl font-bold ">Daftar kelas</h1>
        <button onClick={() => setIsNewKelasModalOpen(true)} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Tambah kelas</button>
        <AddKelasModal isOpen={isNewKelasModalOpen} onClose={() => setIsNewKelasModalOpen(false)} onAddKelas={handleAddKelas} />
      </div>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Nama Kelas
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Kuota
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Nama Prodi (id)
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Nama Dosen Wali
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Aksi
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {kelas.map(kelas => (
            <tr key={kelas.id}>
              <td className="px-6 py-4 whitespace-nowrap">{kelas.nama_kelas}</td>
              <td className="px-6 py-4 whitespace-nowrap">{kelas.kuota}</td>
              <td className="px-6 py-4 whitespace-nowrap">{kelas.nama_prodi} {kelas.id_prodi}</td>
              <td className="px-6 py-4 whitespace-nowrap">({kelas.id_dosen_wali}) {kelas.nama} ({kelas.inisial})</td>
              <td className="px-6 py-4 whitespace-nowrap">
                {isEditing === kelas.id ? (
                  <button
                    onClick={() => handleSave(kelas.id, kelas)}
                    className="text-indigo-600 hover:text-indigo-900"
                  >
                    Simpan
                  </button>
                ) : (
                  <>
                    <button
                      onClick={() => handleEdit(kelas.id)}
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(kelas.id)}
                      className="text-red-600 hover:text-red-900 ml-2"
                    >
                      Hapus
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default KelasList;
