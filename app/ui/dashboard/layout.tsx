import { Layout } from 'antd';
import SideNav from '@/app/ui/dashboard/sidenav';

const { Content } = Layout;

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <SideNav />
      <Layout>
        <Content style={{ overflow: 'initial' }}>
          <div style={{ background: '#fff', minHeight: 360 }}>
            {children}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}
