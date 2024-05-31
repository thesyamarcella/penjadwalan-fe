import React, { useState, useEffect } from 'react';
import { Button } from 'antd';
import DataTable from '@/app/ui/DataTable/DataTable';
import AddEditModal from '@/app/ui/AddEditModal/AddEditModal';
import { addItem, deleteItem, fetchData, updateItem } from '@/app/services/fetchData';


interface DataPageProps {
  endpoint: string;
}

const DataPage: React.FC<DataPageProps> = ({ endpoint }) => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalElements, setTotalElements] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingRecord, setEditingRecord] = useState<any | null>(null);

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

  const handleDelete = async (id: number) => {
    try {
      await deleteItem(endpoint, id);
      setData(data.filter((item) => item.id !== id));
    } catch (error) {
      console.error(`Error deleting record:`, error);
    }
  };

  const handleAddItem = async (newItem: any) => {
    try {
      const addedItem = await addItem(endpoint, newItem);
      setData([...data, addedItem]);
      setIsModalVisible(false);
    } catch (error) {
      console.error(`Error adding record:`, error);
    }
  };

  const handleEditItem = async (editedItem: any) => {
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

  const handleSave = (row: any) => {
    setEditingRecord(null);
    handleEditItem(row);
  };

  const showModal = (record: any = null) => {
    setEditingRecord(record);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleFormSubmit = async (values: any) => {
    if (editingRecord) {
      await handleEditItem({ ...editingRecord, ...values });
    } else {
      await handleAddItem(values);
    }
  };

  return (
    <div>
      <Button onClick={() => showModal()} style={{ marginBottom: 16 }}>
        + 
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
