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
        height: '100%'
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
        <Content>
            {children}
        </Content>
    </Layout>
  )
}
