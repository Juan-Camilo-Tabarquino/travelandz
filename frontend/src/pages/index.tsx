import NavMenu from '@/commons/NavMenu'
import { Col, ConfigProvider, Image, Layout, Row, Typography } from 'antd'

const { Header, Content } = Layout
const { Paragraph, Title } = Typography

export default function Home () {
  return (
      <Row>
        <Col span={8}>
          <div
            style={{
              display: 'grid',
              placeItems: 'center',
              height: '100vh',
              backgroundColor: '#E6E9F5'
            }}
          >
            <Image src="/images/logo-home.svg" preview={false} />
          </div>
        </Col>
        <Col span={16}>
          <Layout
            style={{
              height: '100vh'
            }}
          >
            <Header
              style={{
                backgroundColor: '#4654A3',
                padding: 0,
                flex: '1 1 40px'
              }}
            >
              <NavMenu />
            </Header>
            <Content
              style={{
                backgroundColor: '#4654A3'
              }}
            >
              <ConfigProvider
                theme={{
                  token: {
                    colorText: '#E6E9F5',
                    fontSize: 20
                  }
                }}
              >
                <Row
                  justify='center'
                  style={{
                    textAlign: 'left'
                  }}
                >
                  <Col span={18}>
                    <Title>
                      Bienvenido a Travelandz!
                    </Title>
                    <Paragraph>
                      Tu destino comienza aquí. En Travelandz, nos apasiona ofrecerte una experiencia de viaje sin complicaciones y llena de aventuras desde el momento en que aterrizas en tu destino.
                    </Paragraph>
                  </Col>
                </Row>
              </ConfigProvider>
            </Content>
          </Layout>
        </Col>
      </Row>
  )
}
