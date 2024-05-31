import React from 'react';
import { Table } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import EditableRow from './EditableRow';
import EditableCell from './EditableCell';

interface DataTableProps {
  data: any[];
  handleSave: (row: any) => void;
  handleDelete: (id: number) => void;
  loading: boolean;
  currentPage: number;
  pageSize: number;
  totalElements: number;
  setCurrentPage: (page: number) => void;
  setPageSize: (size: number) => void;
  showModal: (record?: any) => void;
}

const DataTable: React.FC<DataTableProps> = ({
  data, handleSave, handleDelete, loading, currentPage, pageSize, totalElements, setCurrentPage, setPageSize, showModal
}) => {
  const columns = data.length ? Object.keys(data[0]).map((key) => ({
    title: key.replace(/_/g, ' '),
    dataIndex: key,
    editable: !['id', 'created_at', 'updated_at'].includes(key),
  })) : [];

  columns.push({
    title: 'Aksi',
    dataIndex: 'actions',
    render: (_, record) => (
      <>
        <EditOutlined onClick={() => showModal(record)} style={{ marginRight: 8 }} />
        <DeleteOutlined onClick={() => handleDelete(record.id)} />
      </>
    ),
    fixed: 'right',
  });

  const mergedColumns = columns.map((col) => ({
    ...col,
    onCell: (record: any) => ({
      record,
      editable: col.editable,
      dataIndex: col.dataIndex,
      title: col.title,
      handleSave,
    }),
  }));

  return (
    <Table
      components={{
        body: {
          row: EditableRow,
          cell: EditableCell,
        },
      }}
      bordered
      dataSource={data}
      columns={mergedColumns}
      rowClassName="editable-row"
      pagination={{
        current: currentPage,
        pageSize: pageSize,
        total: totalElements,
        onChange: (page, pageSize) => {
          setCurrentPage(page);
          setPageSize(pageSize);
        },
      }}
      loading={loading}
      scroll={{ x: 'max-content' }}
    />
  );
};

export default DataTable;
