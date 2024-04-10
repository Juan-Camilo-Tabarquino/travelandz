import { type ReactElement } from 'react'
import NavMenu from './NavMenu'
import { Layout } from 'antd'

const { Header, Content } = Layout

export default function BasicPage ({
  children
}: {
  children: ReactElement
}) {
  return (
    <Layout
      style={{
        backgroundColor: '#E6E9F5',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
        <Header
            style={{
              backgroundColor: '#4654A3',
              height: '60px'
            }}
        >
            <NavMenu
              logo
            />
        </Header>
        <Content
          style={{
            backgroundColor: '#E6E9F5',
            flex: 1
          }}
        >
            {children}
        </Content>
    </Layout>
  )
}
