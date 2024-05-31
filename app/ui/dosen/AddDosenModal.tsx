import React, { useState } from 'react';
import { Modal, Form, Input, Button } from 'antd';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onAddDosen: (dosen: Dosen) => void;
}

interface Dosen {
  id?: number;
  nip: string;
  nidn: string;
  id_pegawai: number;
  inisial: string;
  gelar_depan: string;
  nama_depan: string;
  nama_belakang: string;
  gelar_belakang: string;
  alamat: string;
  agama: string;
  telp_seluler: string;
}

const AddDosenModal: React.FC<Props> = ({ isOpen, onClose, onAddDosen }) => {
  const [form] = Form.useForm();

  const handleSubmit = () => {
    form.validateFields().then(values => {
      onAddDosen(values as Dosen);
      form.resetFields();
      onClose();
    });
  };

  return (
    <Modal
      visible={isOpen}
      title="Tambah Dosen"
      onCancel={onClose}
      footer={[
        <Button key="back" onClick={onClose}>
          Batal
        </Button>,
        <Button key="submit"onClick={handleSubmit}>
          Tambah
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="nip"
          label="NIP"
          rules={[{ required: true, message: 'Harap masukkan NIP!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="nidn"
          label="NIDN"
          rules={[{ required: true, message: 'Harap masukkan NIDN!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="inisial"
          label="Inisial"
          rules={[{ required: true, message: 'Harap masukkan inisial!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="gelar_depan"
          label="Gelar Depan"
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="nama_depan"
          label="Nama Depan"
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="nama_belakang"
          label="Nama Belakang"
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="gelar_belakang"
          label="Gelar Belakang"
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="alamat"
          label="Alamat"
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="agama"
          label="Agama"
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="telp_seluler"
          label="Telp Seluler"
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddDosenModal;
