"use client"
import React, { useState, useEffect } from 'react';
import AddDosenModal from './AddDosenModal';

interface Dosen {
  id: number;
  nip: string;
  nidn: string;
  id_pegawai: number;
  inisial: string;
  gelar_depan: string;
  nama_depan: string;
  nama_belakang: string;
  gelar_belakang: string;
  alamat: string;
  agama: string;
  telp_seluler: string;
}

const DosenList: React.FC = () => {
  const [dosen, setdosen] = useState<Dosen[]>([]);
  const [isNewDosenModalOpen, setIsNewDosenModalOpen] = useState<boolean>(false); 
  const [isEditing, setIsEditing] = useState<number | null>(null);

  useEffect(() => {
    const fetchdosen = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/dosen/');
        const data = await response.json();
        setdosen(data);
      } catch (error) {
        console.error('Error fetching dosen:', error);
      }
    };

    fetchdosen();
  }, []);

  const handleEdit = (dosenId: number) => {
    setIsEditing(dosenId);
  };

  const handleDelete = async (dosenId: number) => {
    try {
      await fetch(`http://127.0.0.1:8000/dosen/${dosenId}`, {
        method: 'DELETE',
      });
      setdosen(prevdosen => prevdosen.filter(dosen => dosen.id !== dosenId));
    } catch (error) {
      console.error('Error deleting dosen:', error);
    }
  };

  const handleSave = async (dosenId: number, updatedDosen: Dosen) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/dosen/${dosenId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedDosen),
      });

      if (response.ok) {
        setdosen(prevdosen =>
          prevdosen.map(dosen => (dosen.id === dosenId ? updatedDosen : dosen))
        );
        setIsEditing(null); 
      } else {
        console.error('Failed to update dosen');
      }
    } catch (error) {
      console.error('Error updating dosen:', error);
    }
  };

  const handleAddDosen = async (newDosen: Dosen) => {
    try {
      const response = await fetch('http://127.0.0.1:8000/dosen/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newDosen),
      });
      const createdDosen = await response.json();
      setdosen([...dosen, createdDosen]);
    } catch (error) {
      console.error('Error adding dosen:', error);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4 mt-8">
        <h1 className="text-2xl font-bold ">Daftar Dosen</h1>
        <button onClick={() => setIsNewDosenModalOpen(true)} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Tambah Dosen</button>
        <AddDosenModal isOpen={isNewDosenModalOpen} onClose={() => setIsNewDosenModalOpen(false)} onAddDosen={handleAddDosen} /> 
      </div>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              NIP
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              NIDN
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Inisial
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Nama Lengkap
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Alamat
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Agama
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Telp Seluler
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Aksi
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {dosen.map(dosen => (
            <tr key={dosen.id}>
              <td className="px-6 py-4 whitespace-nowrap">{dosen.nip}</td>
              <td className="px-6 py-4 whitespace-nowrap">{dosen.nidn}</td>
              <td className="px-6 py-4 whitespace-nowrap">{dosen.inisial}</td>
              <td className="px-6 py-4 whitespace-nowrap">{dosen.gelar_depan} {dosen.nama_depan} {dosen.nama_belakang} {dosen.gelar_belakang}</td>
              <td className="px-6 py-4 whitespace-nowrap">{dosen.alamat}</td>
              <td className="px-6 py-4 whitespace-nowrap">{dosen.agama}</td>
              <td className="px-6 py-4 whitespace-nowrap">{dosen.telp_seluler}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                {isEditing === dosen.id ? (
                  <button
                    onClick={() => handleSave(dosen.id, dosen)}
                    className="text-indigo-600 hover:text-indigo-900"
                  >
                    Simpan
                  </button>
                ) : (
                  <>
                    <button
                      onClick={() => handleEdit(dosen.id)}
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(dosen.id)}
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

export default DosenList;


