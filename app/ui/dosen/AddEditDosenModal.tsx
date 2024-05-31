import React from 'react';
import { Modal, Form, Input, Button } from 'antd';

const AddEditDosenModal = ({ visible, onCancel, onFinish, dosenTemplate, editingRecord }) => {
  const initialValues = { ...editingRecord };
  delete initialValues.id;
  delete initialValues.created_at;
  delete initialValues.updated_at;

  return (
    <Modal title={editingRecord ? "Edit Dosen" : "Add Dosen"} visible={visible} onCancel={onCancel} footer={null}>
      <Form onFinish={onFinish} layout="vertical" initialValues={initialValues}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ flex: 1, marginRight: 8 }}>
            {Object.keys(dosenTemplate).filter(key => !['id', 'created_at', 'updated_at'].includes(key)).slice(0, Math.ceil(Object.keys(dosenTemplate).length / 2)).map((key) => (
              <Form.Item key={key} name={key} label={key.replace(/_/g, ' ')} rules={[{ required: true, message: `Please input ${key.replace(/_/g, ' ')}!` }]}>
                <Input />
              </Form.Item>
            ))}
          </div>
          <div style={{ flex: 1, marginLeft: 8 }}>
            {Object.keys(dosenTemplate).filter(key => !['id', 'created_at', 'updated_at'].includes(key)).slice(Math.ceil(Object.keys(dosenTemplate).length / 2)).map((key) => (
              <Form.Item key={key} name={key} label={key.replace(/_/g, ' ')} rules={[{ required: true, message: `Please input ${key.replace(/_/g, ' ')}!` }]}>
                <Input />
              </Form.Item>
            ))}
          </div>
        </div>
        <Form.Item>
          <Button htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddEditDosenModal;
