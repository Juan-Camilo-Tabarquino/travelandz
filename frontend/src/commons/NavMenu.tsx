/* eslint-disable @typescript-eslint/promise-function-async */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { ConfigProvider, Row, Typography } from 'antd'
import ButtonPropio from './components/ButtonPropio'
import { useRouter } from 'next/router'

const { Title } = Typography

export default function NavMenu ({
  logo = false
}: {
  logo?: boolean
}) {
  const { push } = useRouter()
  return (
    <ConfigProvider
    theme={{
      token: {
        colorText: '#E6E9F5'
      }
    }}
    >
        <Row>
            {
              logo
                ? <Title
                    onClick={() => push('/')}
                    level={2}
                    style={{
                      margin: 0,
                      paddingRight: 50,
                      paddingTop: 5
                    }}
                  >
                    Travelandz
                  </Title>
                : null
            }
            <ButtonPropio
            title="Home"
            nav
            buttonProps={{
              onClick: () => push('/')
            }}
            />
            <ButtonPropio
            title="Booking"
            nav
            buttonProps={{
              onClick: () => push('/booking')
            }}
            />
            <ButtonPropio
            title="Gestion"
            nav
            buttonProps={{
              onClick: () => push('/gestion')
            }}
            />
        </Row>
      </ConfigProvider>
  )
}
