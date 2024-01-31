'use client'
import React, { useEffect, useState } from 'react';
import { LaptopOutlined, NotificationOutlined, UserOutlined, GithubOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, theme, Avatar } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const { Header, Content, Sider } = Layout;
type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key?: React.Key | null,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group',
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

const items: MenuItem[] = [
  // getItem('Wine', 'sub1', '', [
  //   getItem('Red Wine', '/products/red-wine'),
  //   getItem('White Wine', '/products/white-wine'),
  // ]),

  getItem('Wine', '/products/wine'),
  getItem('Beer', '/products/beer')
];

const LayoutPage = ({children}: {children: React.ReactNode}) => {
  const router = useRouter()
  const [nameUser, setNameUser] = useState<string>('')
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  useEffect(() => {
    const userName = localStorage.getItem('currentUser')
    if (userName) {
      setNameUser(JSON.parse(userName).username)
    }
  }, [])

  const onClick: MenuProps['onClick'] = (e) => {
    router.push(e.key)
  };

  return (
    <Layout>
      <Header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div className="demo-logo" ><GithubOutlined className='text-white text-[2rem]' /></div>
        <div className='text-white'>
          <Avatar shape="square" size="small" icon={<UserOutlined />} /> 
          {nameUser ?
            <><span className='text-white px-2 font-semibold text-orange-500'>{nameUser}</span>
            <Link className='text-white' href='/login'>Logout</Link></> :
            <Link className='text-white' href='/register'>Login</Link>
          }
          <Link href='/login' className='pl-2'>Sign Up</Link>
        </div>
      </Header>
      <Layout>
        <Sider width={200} style={{ background: colorBgContainer }}>
          <Menu onClick={onClick} mode="vertical" items={items} />
        </Sider>
        <Layout style={{ padding: '0 24px 24px' }}>
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            {children}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default LayoutPage;