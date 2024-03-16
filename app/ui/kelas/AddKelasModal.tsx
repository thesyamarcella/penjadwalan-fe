

import React, { useState } from 'react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onAddKelas: (kelas: Kelas) => void;
}

interface Kelas {
  id?: number;
  nama_kelas: string;
  kuota: number;
  id_prodi: number;
  nama_prodi: string;
  id_dosen_wali: number;
  inisial: string;
  nama: string;
}

const AddKelasModal: React.FC<Props> = ({ isOpen, onClose, onAddKelas }) => {
  const [newKelas, setNewKelas] = useState<Kelas>({
    nama_kelas: '',
    kuota: 0,
    id_prodi: 0,
    nama_prodi: '',
    id_dosen_wali: 0,
    inisial: '',
    nama: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewKelas(prevKelas => ({
      ...prevKelas,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddKelas(newKelas);
    setNewKelas({
      nama_kelas: '',
      kuota: 0,
      id_prodi: 0,
      nama_prodi: '',
      id_dosen_wali: 0,
      inisial: '',
      nama: '',
    });
    onClose();
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg">
            <h2 className="text-xl font-bold mb-4">Tambah Kelas</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="nama_kelas" className="block font-medium text-gray-700">Nama Kelas</label>
                <input type="text" id="nama_kelas" name="nama_kelas" value={newKelas.nama_kelas} onChange={handleInputChange} className="mt-1 p-2 border rounded-md w-full" />
              </div>
              <div className="mb-4">
                <label htmlFor="kuota" className="block font-medium text-gray-700">Kuota</label>
                <input type="number" id="kuota" name="kuota" value={newKelas.kuota} onChange={handleInputChange} className="mt-1 p-2 border rounded-md w-full" />
              </div>
              <div className="mb-4">
                <label htmlFor="nama_prodi" className="block font-medium text-gray-700">Nama Prodi</label>
                <input type="text" id="nama_prodi" name="nama_prodi" value={newKelas.nama_prodi} onChange={handleInputChange} className="mt-1 p-2 border rounded-md w-full" />
              </div>
              <div className="mb-4">
                <label htmlFor="inisial" className="block font-medium text-gray-700">Inisial</label>
                <input type="text" id="inisial" name="inisial" value={newKelas.inisial} onChange={handleInputChange} className="mt-1 p-2 border rounded-md w-full" />
              </div>
              <div className="mb-4">
                <label htmlFor="nama" className="block font-medium text-gray-700">Nama</label>
                <input type="text" id="nama" name="nama" value={newKelas.nama} onChange={handleInputChange} className="mt-1 p-2 border rounded-md w-full" />
              </div>
              <div className="flex justify-end">
                <button type="button" onClick={onClose} className="mr-2 bg-gray-300 px-4 py-2 rounded-md hover:bg-gray-400">Batal</button>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Tambah</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AddKelasModal;
