"use client";
import { Layout, Menu } from 'antd';
import Link from 'next/link';
import { PoweroffOutlined, UnorderedListOutlined, ScheduleOutlined, MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { useState } from 'react';

const { Sider } = Layout;
const { SubMenu } = Menu;

export default function SideNav() {
  const [collapsed, setCollapsed] = useState(false);

  const onCollapse = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={onCollapse}
      style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100vh' }}
    >
      <div>
        <div className="flex items-center justify-center h-16 bg-blue-200">
          {!collapsed && <div className="p-10 mx-5 font-semibold">Penjadwalan</div>}
        </div>
        <Menu mode="inline">
          <SubMenu key="master" icon={<UnorderedListOutlined />} title="Master Data">
            <Menu.Item key="dosen">
              <Link href="/master/dosen">Dosen</Link>
            </Menu.Item>
            <Menu.Item key="ruangan">
              <Link href="/master/ruangan">Ruangan</Link>
            </Menu.Item>
            <Menu.Item key="kelas">
              <Link href="/master/kelas">Kelas</Link>
            </Menu.Item>
            <Menu.Item key="mata_kuliah">
              <Link href="/master/mata_kuliah">Mata Kuliah</Link>
            </Menu.Item>
            <Menu.Item key="preferensi">
              <Link href="/master/preferensi">Preferensi</Link>
            </Menu.Item>
            <Menu.Item key="semester">
              <Link href="/master/semester">Semester</Link>
            </Menu.Item>
            <Menu.Item key="slot">
              <Link href="/master/slot">Slot</Link>
            </Menu.Item>
          </SubMenu>
          <Menu.Item key="jadwal" icon={<ScheduleOutlined />}>
            <Link href="/jadwal">Jadwal</Link>
          </Menu.Item>
        </Menu>
      </div>
      <div>
        <Menu mode="inline">
          <Menu.Item key="logout" icon={<PoweroffOutlined />}>
            <a href="/logout">Sign Out</a>
          </Menu.Item>
        </Menu>
        <div className="flex items-center justify-center p-4">
          <button className="flex items-center justify-center p-2" onClick={onCollapse}>
            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </button>
        </div>
      </div>
    </Sider>
  );
}
