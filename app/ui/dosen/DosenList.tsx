  "use client"
  import React, { useState, useEffect, useContext, useRef } from 'react';
  import { Table, Input, Button, Popconfirm, Form, Typography, Modal } from 'antd';
  import type { InputRef } from 'antd';
  import type { FormInstance } from 'antd/es/form';
  import axios from 'axios';

  const EditableContext = React.createContext<FormInstance<any> | null>(null);

  interface Dosen {
    id: number;
    nip: string;
    nidn: string;
    id_pegawai: string;
    inisial: string;
    gelar_depan: string;
    nama_depan: string;
    nama_belakang: string;
    gelar_belakang: string;
    alamat: string;
    agama: string;
    telp_seluler: string;
    created_at: string;
    updated_at: string;
  }

  interface EditableRowProps {
    index: number;
  }

  const EditableRow: React.FC<EditableRowProps> = ({ index, ...props }) => {
    const [form] = Form.useForm();
    return (
      <Form form={form} component={false}>
        <EditableContext.Provider value={form}>
          <tr {...props} />
        </EditableContext.Provider>
      </Form>
    );
  };

  interface EditableCellProps {
    title: React.ReactNode;
    editable: boolean;
    children: React.ReactNode;
    dataIndex: keyof Dosen;
    record: Dosen;
    handleSave: (record: Dosen) => void;
  }

  const EditableCell: React.FC<EditableCellProps> = ({
    title,
    editable,
    children,
    dataIndex,
    record,
    handleSave,
    ...restProps
  }) => {
    const [editing, setEditing] = useState(false);
    const inputRef = useRef<InputRef>(null);
    const form = useContext(EditableContext)!;

    useEffect(() => {
      if (editing) {
        inputRef.current?.focus();
      }
    }, [editing]);

    const toggleEdit = () => {
      setEditing(!editing);
      form.setFieldsValue({ [dataIndex]: record[dataIndex] });
    };

    const save = async () => {
      try {
        const values = await form.validateFields();
        toggleEdit();
        handleSave({ ...record, ...values });
      } catch (errInfo) {
        console.log('Save failed:', errInfo);
      }
    };

    let childNode = children;

    if (editable) {
      childNode = editing ? (
        <Form.Item
          style={{ margin: 0 }}
          name={dataIndex}
          rules={[{ required: true, message: `${title} is required.` }]}
        >
          <Input ref={inputRef} onPressEnter={save} onBlur={save} />
        </Form.Item>
      ) : (
        <div className="editable-cell-value-wrap" style={{ paddingRight: 24 }} onClick={toggleEdit}>
          {children}
        </div>
      );
    }

    return <td {...restProps}>{childNode}</td>;
  };

  const DosenPage: React.FC = () => {
    const [form] = Form.useForm();
    const [dosen, setDosen] = useState<Dosen[]>([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalElements, setTotalElements] = useState(0);
    const [editingKey, setEditingKey] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);

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

    const isEditing = (record: Dosen) => record.id === editingKey;

    const edit = (record: Dosen) => {
      form.setFieldsValue({ ...record });
      setEditingKey(record.id);
    };

    const cancel = () => {
      setEditingKey('');
    };

    const save = async (id: number) => {
      try {
        const updatedDosen = await form.validateFields();
        await axios.put(`http://127.0.0.1:8000/api/dosen/${id}`, updatedDosen);
        setDosen(dosen.map((item) => (item.id === id ? { ...item, ...updatedDosen } : item)));
        setEditingKey('');
      } catch (errInfo) {
        console.log('Validate Failed:', errInfo);
      }
    };

    const handleDelete = async (id: number) => {
      try {
        await axios.delete(`http://127.0.0.1:8000/api/dosen/${id}`);
        setDosen(dosen.filter((item) => item.id !== id));
      } catch (error) {
        console.error('Error deleting dosen:', error);
      }
    };

    const handleAddDosen = async (newDosen: Dosen) => {
      try {
        const response = await axios.post('http://127.0.0.1:8000/api/dosen', newDosen);
        setDosen([...dosen, response.data]);
        setIsModalVisible(false);
      } catch (error) {
        console.error('Error adding dosen:', error);
      }
    };

    const handleSave = (row: Dosen) => {
      const newData = [...dosen];
      const index = newData.findIndex((item) => row.id === item.id);
      const item = newData[index];
      newData.splice(index, 1, {
        ...item,
        ...row,
      });
      setDosen(newData);
    };

    const columns = [
      {
        title: 'NIP',
        dataIndex: 'nip',
        editable: true,
        sorter: (a: Dosen, b: Dosen) => a.nip.localeCompare(b.nip),
      },
      {
        title: 'NIDN',
        dataIndex: 'nidn',
        editable: true,
        sorter: (a: Dosen, b: Dosen) => a.nidn.localeCompare(b.nidn),
      },
      {
        title: 'NIDN',
        dataIndex: 'nidn',
        editable: true,
        sorter: (a: Dosen, b: Dosen) => a.nidn.localeCompare(b.nidn),
      },
      {
        title: 'Nama Depan',
        dataIndex: 'nama_depan',
        editable: true,
        sorter: (a: Dosen, b: Dosen) => a.nama_depan.localeCompare(b.nama_depan),
      },
      {
        title: 'Nama Belakang',
        dataIndex: 'nama_belakang',
        editable: true,
        sorter: (a: Dosen, b: Dosen) => a.nama_belakang.localeCompare(b.nama_belakang),
      },
      {
        title: 'Alamat',
        dataIndex: 'alamat',
        editable: true,
        sorter: (a: Dosen, b: Dosen) => a.alamat.localeCompare(b.alamat),
      },
      {
        title: 'Operation',
        dataIndex: 'operation',
        render: (_, record: Dosen) => {
          const editable = isEditing(record);
          return editable ? (
            <span>
              <Typography.Link onClick={() => save(record.id)} style={{ marginRight: 8 }}>
                Save
              </Typography.Link>
              <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
                <Typography.Link>Cancel</Typography.Link>
              </Popconfirm>
            </span>
          ) : (
            <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
              Edit
            </Typography.Link>
          );
        },
      },
      {
        title: 'Action',
        dataIndex: 'action',
        render: (_, record: Dosen) =>
          dosen.length >= 1 ? (
            <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.id)}>
              <Button danger>Delete</Button>
            </Popconfirm>
          ) : null,
      },
    ];

    const mergedColumns = columns.map((col) => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: (record: Dosen) => ({
          record,
          editable: col.editable,
          dataIndex: col.dataIndex,
          title: col.title,
          handleSave,
        }),
      };
    });

    const showModal = () => {
      setIsModalVisible(true);
    };

    const handleCancel = () => {
      setIsModalVisible(false);
    };

    const handleFormSubmit = async (values: Dosen) => {
      await handleAddDosen(values);
    };

    return (
      <div>
        <Button onClick={showModal} type="primary" style={{ marginBottom: 16 }}>
          Add Dosen
        </Button>
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
        />
        <Modal title="Add Dosen" open={isModalVisible} onCancel={handleCancel} footer={null}>
          <Form onFinish={handleFormSubmit} layout="vertical">
            <Form.Item name="nip" label="NIP" rules={[{ required: true, message: 'Please input NIP!' }]}>
              <Input />
            </Form.Item>
            <Form.Item name="nidn" label="NIDN" rules={[{ required: true, message: 'Please input NIDN!' }]}>
              <Input />
            </Form.Item>
            <Form.Item name="nama_depan" label="Nama Depan" rules={[{ required: true, message: 'Please input Nama Depan!' }]}>
              <Input />
            </Form.Item>
            <Form.Item name="nama_belakang" label="Nama Belakang" rules={[{ required: true, message: 'Please input Nama Belakang!' }]}>
              <Input />
            </Form.Item>
            <Form.Item name="alamat" label="Alamat" rules={[{ required: true, message: 'Please input Alamat!' }]}>
              <Input />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    );
  };

  export default DosenPage;
