import React, { useState } from 'react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onAddDosen: (dosen: Dosen) => void;
}

interface Dosen {
  id?: number;
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

const AddDosenModal: React.FC<Props> = ({ isOpen, onClose, onAddDosen }) => {
  const [newDosen, setNewDosen] = useState<Dosen>({
    nip: '',
    nidn: '',
    id_pegawai: 0,
    inisial: '',
    gelar_depan: '',
    nama_depan: '',
    nama_belakang: '',
    gelar_belakang: '',
    alamat: '',
    agama: '',
    telp_seluler: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewDosen(prevDosen => ({
      ...prevDosen,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddDosen(newDosen);
    setNewDosen({
      nip: '',
      nidn: '',
      id_pegawai: 0,
      inisial: '',
      gelar_depan: '',
      nama_depan: '',
      nama_belakang: '',
      gelar_belakang: '',
      alamat: '',
      agama: '',
      telp_seluler: '',
    });
    onClose();
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg">
            <h2 className="text-xl font-bold mb-4">Tambah Dosen</h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
              <div className="mb-4">
                <label htmlFor="nip" className="block font-medium text-gray-700">NIP</label>
                <input type="text" id="nip" name="nip" value={newDosen.nip} onChange={handleInputChange} className="mt-1 p-2 border rounded-md w-full" />
              </div>
              <div className="mb-4">
                <label htmlFor="nidn" className="block font-medium text-gray-700">NIDN</label>
                <input type="text" id="nidn" name="nidn" value={newDosen.nidn} onChange={handleInputChange} className="mt-1 p-2 border rounded-md w-full" />
              </div>
              <div className="mb-4">
                <label htmlFor="inisial" className="block font-medium text-gray-700">Inisial</label>
                <input type="text" id="inisial" name="inisial" value={newDosen.inisial} onChange={handleInputChange} className="mt-1 p-2 border rounded-md w-full" />
              </div>
              <div className="mb-4">
                <label htmlFor="gelar_depan" className="block font-medium text-gray-700">Gelar Depan</label>
                <input type="text" id="gelar_depan" name="gelar_depan" value={newDosen.gelar_depan} onChange={handleInputChange} className="mt-1 p-2 border rounded-md w-full" />
              </div>
              <div className="mb-4">
                <label htmlFor="nama_depan" className="block font-medium text-gray-700">Nama Depan</label>
                <input type="text" id="nama_depan" name="nama_depan" value={newDosen.nama_depan} onChange={handleInputChange} className="mt-1 p-2 border rounded-md w-full" />
              </div>
              <div className="mb-4">
                <label htmlFor="nama_belakang" className="block font-medium text-gray-700">Nama Belakang</label>
                <input type="text" id="nama_belakang" name="nama_belakang" value={newDosen.nama_belakang} onChange={handleInputChange} className="mt-1 p-2 border rounded-md w-full" />
              </div>
              <div className="mb-4">
                <label htmlFor="gelar_belakang" className="block font-medium text-gray-700">Gelar Belakang</label>
                <input type="text" id="gelar_belakang" name="gelar_belakang" value={newDosen.gelar_belakang} onChange={handleInputChange} className="mt-1 p-2 border rounded-md w-full" />
              </div>
              <div className="mb-4">
                <label htmlFor="alamat" className="block font-medium text-gray-700">Alamat</label>
                <input type="text" id="alamat" name="alamat" value={newDosen.alamat} onChange={handleInputChange} className="mt-1 p-2 border rounded-md w-full" />
              </div>
              <div className="mb-4">
                <label htmlFor="agama" className="block font-medium text-gray-700">Agama</label>
                <input type="text" id="agama" name="agama" value={newDosen.agama} onChange={handleInputChange} className="mt-1 p-2 border rounded-md w-full" />
              </div>
              <div className="mb-4">
                <label htmlFor="telp_seluler" className="block font-medium text-gray-700">Telp Seluler</label>
                <input type="text" id="telp_seluler" name="telp_seluler" value={newDosen.telp_seluler} onChange={handleInputChange} className="mt-1 p-2 border rounded-md w-full" />
              </div>
              <div className="col-span-2 flex justify-end">
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

export default AddDosenModal;

