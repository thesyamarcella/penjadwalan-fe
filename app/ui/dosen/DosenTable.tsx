import React from 'react';
import { Table } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import EditableRow from '../DataTable/EditableRow';
import EditableCell from '../DataTable/EditableCell';

const DosenTable = ({ dosen, handleSave, handleDelete, loading, currentPage, pageSize, totalElements, setCurrentPage, setPageSize, showModal }) => {
  const columns = dosen.length ? Object.keys(dosen[0]).map((key) => ({
    title: key.replace(/_/g, ' '),
    dataIndex: key,
    editable: !['id', 'created_at', 'updated_at'].includes(key),
  })) : [];

  columns.push({
    title: 'Actions',
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
    onCell: (record) => ({
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
      dataSource={dosen}
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

export default DosenTable;
