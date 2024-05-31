import { Typography, Popconfirm, Button } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { Dosen } from './DosenHeader';

interface EditableColumnProps {
  isEditing: (record: Dosen) => boolean;
  cancel: () => void;
  save: (id: number) => void;
  edit: (record: Dosen) => void;
  handleDelete: (id: number) => void;
}

export const getColumns = ({
  isEditing,
  cancel,
  save,
  edit,
  handleDelete,
}: EditableColumnProps): ColumnsType<Dosen> => [
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
    render: (_: any, record: Dosen) => {
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
        <Typography.Link disabled={isEditing(record)} onClick={() => edit(record)}>
          Edit
        </Typography.Link>
      );
    },
  },
  {
    title: 'Action',
    dataIndex: 'action',
    render: (_: any, record: Dosen) =>
      record.id ? (
        <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.id)}>
          <Button danger>Delete</Button>
        </Popconfirm>
      ) : null,
  },
];
