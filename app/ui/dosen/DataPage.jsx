import React, { useState, useEffect } from 'react';
import { Button } from 'antd';
import { fetchData, addItem, updateItem, deleteItem } from './fetchData';
import DataTable from './DataTable';
import AddEditModal from './AddEditModal';

const DataPage = ({ endpoint }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalElements, setTotalElements] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);

  useEffect(() => {
    fetchDataFromServer();
  }, [currentPage, pageSize]);

  const fetchDataFromServer = async () => {
    setLoading(true);
    try {
      const response = await fetchData(endpoint, currentPage, pageSize);
      setData(response.items);
      setTotalElements(response.totalElements);
    } catch (error) {
      console.error(`Error fetching data:`, error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteItem(endpoint, id);
      setData(data.filter((item) => item.id !== id));
    } catch (error) {
      console.error(`Error deleting record:`, error);
    }
  };

  const handleAddItem = async (newItem) => {
    try {
      const addedItem = await addItem(endpoint, newItem);
      setData([...data, addedItem]);
      setIsModalVisible(false);
    } catch (error) {
      console.error(`Error adding record:`, error);
    }
  };

  const handleEditItem = async (editedItem) => {
    try {
      await updateItem(endpoint, editedItem);
      const newData = [...data];
      const index = newData.findIndex((item) => editedItem.id === item.id);
      newData[index] = editedItem;
      setData(newData);
      setIsModalVisible(false);
    } catch (error) {
      console.error(`Error editing record:`, error);
    }
  };

  const handleSave = (row) => {
    setEditingRecord(null);
    handleEditItem(row);
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
      await handleEditItem({ ...editingRecord, ...values });
    } else {
      await handleAddItem(values);
    }
  };

  return (
    <div>
      <Button onClick={() => showModal()}  style={{ marginBottom: 16 }}>
        + Tambah
      </Button>
      <DataTable
        data={data}
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
      <AddEditModal
        visible={isModalVisible}
        onCancel={handleCancel}
        onFinish={handleFormSubmit}
        template={data[0] || {}}
        editingRecord={editingRecord}
      />
    </div>
  );
};

export default DataPage;
