import React from 'react';
import { Modal, Form, Input, Button } from 'antd';

interface AddEditModalProps {
  visible: boolean;
  onCancel: () => void;
  onFinish: (values: any) => void;
  template: any;
  editingRecord: any;
}

const AddEditModal: React.FC<AddEditModalProps> = ({ visible, onCancel, onFinish, template, editingRecord }) => {
  const initialValues = { ...editingRecord };
  delete initialValues.id;
  delete initialValues.created_at;
  delete initialValues.updated_at;

  return (
    <Modal title={editingRecord ? "Edit Record" : "Add Record"}  open={visible} onCancel={onCancel} footer={null}>
      <Form onFinish={onFinish} layout="vertical" initialValues={initialValues}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ flex: 1, marginRight: 8 }}>
            {Object.keys(template).filter(key => !['id', 'created_at', 'updated_at'].includes(key)).slice(0, Math.ceil(Object.keys(template).length / 3)).map((key) => (
              <Form.Item key={key} name={key} label={key.replace(/_/g, ' ')} rules={[{ required: true, message: `Please input ${key.replace(/_/g, ' ')}!` }]}>
                <Input />
              </Form.Item>
            ))}
          </div>
         
          <div style={{ flex: 1, marginLeft: 8 }}>
            {Object.keys(template).filter(key => !['id', 'created_at', 'updated_at'].includes(key)).slice(Math.ceil(Object.keys(template).length / 3)).map((key) => (
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

export default AddEditModal;
