"use client"

import React, { useState, useEffect } from 'react';
import AddRoomModal from './AddRoomModal';

interface Room {
  id: number;
  nama_ruangan: string;
  kapasitas: number;
  nama_gedung: string;
}

const RoomList: React.FC = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [isNewRoomModalOpen, setIsNewRoomModalOpen] = useState<boolean>(false); 
  const [isEditing, setIsEditing] = useState<number | null>(null);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8002/rooms/');
        const data = await response.json();
        setRooms(data);
      } catch (error) {
        console.error('Error fetching rooms:', error);
      }
    };

    fetchRooms();
  }, []);

  const handleEdit = (roomId: number) => {
    setIsEditing(roomId);
  };

  const handleDelete = async (roomId: number) => {
    try {
      await fetch(`http://127.0.0.1:8002/rooms/${roomId}`, {
        method: 'DELETE',
      });
      setRooms(prevRooms => prevRooms.filter(room => room.id !== roomId));
    } catch (error) {
      console.error('Error deleting room:', error);
    }
  };

  const handleSave = async (roomId: number, updatedRoom: Room) => {
    try {
      const response = await fetch(`http://127.0.0.1:8002/rooms/${roomId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedRoom),
      });

      if (response.ok) {
        // If update is successful, update the local state with the edited room
        setRooms(prevRooms =>
          prevRooms.map(room => (room.id === roomId ? updatedRoom : room))
        );
        setIsEditing(null); // Exit editing mode
      } else {
        console.error('Failed to update room');
      }
    } catch (error) {
      console.error('Error updating room:', error);
    }
  };

  const handleAddRoom = async (newRoom: Room) => {
    try {
      const response = await fetch('http://127.0.0.1:8002/rooms/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newRoom),
      });
      const createdRoom = await response.json();
      setRooms([...rooms, createdRoom]);
    } catch (error) {
      console.error('Error adding room:', error);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4 mt-8">
        <h1 className="text-2xl font-bold ">Daftar Ruangan</h1>
        <button onClick={() => setIsNewRoomModalOpen(true)} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Tambah Ruangan</button>
        <AddRoomModal isOpen={isNewRoomModalOpen} onClose={() => setIsNewRoomModalOpen(false)} onAddRoom={handleAddRoom} /> 
      </div>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Nama Ruangan
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Kapasitas
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Nama Gedung
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Aksi
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {rooms.map(room => (
            <tr key={room.id}>
              <td className="px-6 py-4 whitespace-nowrap">
                {isEditing === room.id ? (
                  <input
                    type="text"
                    value={room.nama_ruangan}
                    onChange={e =>
                      setRooms(prevRooms =>
                        prevRooms.map(prevRoom =>
                          prevRoom.id === room.id
                            ? { ...prevRoom, nama_ruangan: e.target.value }
                            : prevRoom
                        )
                      )
                    }
                  />
                ) : (
                  room.nama_ruangan
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {isEditing === room.id ? (
                  <input
                    type="number"
                    value={room.kapasitas}
                    onChange={e =>
                      setRooms(prevRooms =>
                        prevRooms.map(prevRoom =>
                          prevRoom.id === room.id
                            ? { ...prevRoom, kapasitas: parseInt(e.target.value) }
                            : prevRoom
                        )
                      )
                    }
                  />
                ) : (
                  room.kapasitas
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {isEditing === room.id ? (
                  <input
                    type="text"
                    value={room.nama_gedung}
                    onChange={e =>
                      setRooms(prevRooms =>
                        prevRooms.map(prevRoom =>
                          prevRoom.id === room.id
                            ? { ...prevRoom, nama_gedung: e.target.value }
                            : prevRoom
                        )
                      )
                    }
                  />
                ) : (
                  room.nama_gedung
                )}
              </td>

              <td className="px-6 py-4 whitespace-nowrap">
                {isEditing === room.id ? (
                  <button
                    onClick={() => handleSave(room.id, room)}
                    className="text-indigo-600 hover:text-indigo-900"
                  >
                    Simpan
                  </button>
                ) : (
                  <>
                    <button
                      onClick={() => handleEdit(room.id)}
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(room.id)}
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

export default RoomList;
