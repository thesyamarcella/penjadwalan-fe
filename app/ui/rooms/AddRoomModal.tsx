import React, { useState } from 'react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onAddRoom: (room: Room) => void;
}

interface Room {
  nama_ruangan: string;
  kapasitas: number;
  nama_gedung: string;
  isAvailable: boolean;
}

const AddRoomModal: React.FC<Props> = ({ isOpen, onClose, onAddRoom }) => {
  const [newRoom, setNewRoom] = useState<Room>({
    nama_ruangan: '',
    kapasitas: 0,
    nama_gedung: '',
    isAvailable: true,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewRoom(prevRoom => ({
      ...prevRoom,
      [name]: name === 'kapasitas' ? parseInt(value) : name === 'isAvailable' ? value === 'true' : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddRoom(newRoom);
    setNewRoom({ nama_ruangan: '', kapasitas: 0, nama_gedung: '', isAvailable: true });
    onClose();
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg">
            <h2 className="text-xl font-bold mb-4">Tambah Ruangan</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="nama_ruangan" className="block font-medium text-gray-700">Nama Ruangan</label>
                <input type="text" id="nama_ruangan" name="nama_ruangan" value={newRoom.nama_ruangan} onChange={handleInputChange} className="mt-1 p-2 border rounded-md w-full" />
              </div>
              <div className="mb-4">
                <label htmlFor="kapasitas" className="block font-medium text-gray-700">Kapasitas</label>
                <input type="number" id="kapasitas" name="kapasitas" value={newRoom.kapasitas} onChange={handleInputChange} className="mt-1 p-2 border rounded-md w-full" />
              </div>
              <div className="mb-4">
                <label htmlFor="nama_gedung" className="block font-medium text-gray-700">Nama Gedung</label>
                <input type="text" id="nama_gedung" name="nama_gedung" value={newRoom.nama_gedung} onChange={handleInputChange} className="mt-1 p-2 border rounded-md w-full" />
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

export default AddRoomModal;
