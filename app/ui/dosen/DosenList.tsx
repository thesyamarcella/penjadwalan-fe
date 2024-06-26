"use client"
import React, { useState, useEffect } from 'react';
import { Button } from 'antd';
import axios from 'axios';
import DosenTable from './DosenTable';
import AddEditDosenModal from './AddEditDosenModal';

const DosenPage = () => {
  const [dosen, setDosen] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalElements, setTotalElements] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);

  useEffect(() => {
    fetchDosen();
  }, [currentPage, pageSize]);

  const fetchDosen = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/dosen?page=${currentPage}&size=${pageSize}`);
      setDosen(response.data.items);
      setTotalElements(response.data.total_elements);
    } catch (error) {
      console.error('Error fetching dosen:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/dosen/${id}`);
      setDosen(dosen.filter((item) => item.id !== id));
    } catch (error) {
      console.error('Error deleting dosen:', error);
    }
  };

  const handleAddDosen = async (newDosen) => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/dosen', newDosen);
      setDosen([...dosen, response.data]);
      setIsModalVisible(false);
    } catch (error) {
      console.error('Error adding dosen:', error);
    }
  };

  const handleEditDosen = async (editedDosen) => {
    try {
      await axios.put(`http://127.0.0.1:8000/api/dosen${editedDosen.id}`, editedDosen);
      const newData = [...dosen];
      const index = newData.findIndex((item) => editedDosen.id === item.id);
      newData[index] = editedDosen;
      setDosen(newData);
      setIsModalVisible(false);
    } catch (error) {
      console.error('Error editing dosen:', error);
    }
  };

  const handleSave = (row) => {
    setEditingRecord(null);
    handleEditDosen(row);
  };

  const showModal = (record = null) => {
    setEditingRecord(record);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleFormSubmit = async (values) => {
    if (editingRecord) {
      await handleEditDosen({ ...editingRecord, ...values });
    } else {
      await handleAddDosen(values);
    }
  };

  return (
    <div>
      <Button onClick={() => showModal()} style={{ marginBottom: 16 }}>
        Add Dosen
      </Button>
      <DosenTable
        dosen={dosen}
        handleSave={handleSave}
        handleDelete={handleDelete}
        loading={loading}
        currentPage={currentPage}
        pageSize={pageSize}
        totalElements={totalElements}
        setCurrentPage={setCurrentPage}
        setPageSize={setPageSize}
        showModal={showModal}
      />
      <AddEditDosenModal
        visible={isModalVisible}
        onCancel={handleCancel}
        onFinish={handleFormSubmit}
        dosenTemplate={dosen[0] || {}}
        editingRecord={editingRecord}
      />
    </div>
  );
};

export default DosenPage;
