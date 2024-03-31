import { Button, Row, Col, Tag, Typography, ConfigProvider } from 'antd'
import { MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons'
import { type pasajeros } from '@/commons/types'

const { Title } = Typography

type InputWithButtonsProps = {
  title: string
  propertyKey: keyof pasajeros
  handleAdd: (key: keyof pasajeros) => void
  handleSubtract: (key: keyof pasajeros) => void
  value: number
}

const InputWithButtons = ({
  title,
  propertyKey,
  handleAdd,
  handleSubtract,
  value
}: InputWithButtonsProps) => {
  return (
    <ConfigProvider
        theme={{
          token: {
            colorLink: '#4654A3'
          }
        }}
    >
        <Row
            style={{
              width: 252,
              height: 50
            }}
        >
            <Col span={8}>
                <Title
                    level={5}
                    style={{
                      textAlign: 'start',
                      margin: 0
                    }}
                >
                    {title}
                </Title>
            </Col>
            <Col span={16}>
                <Row justify='end'>
                    <Button
                        onClick={() => { handleSubtract(propertyKey as keyof pasajeros) }}
                        shape='circle'
                        icon={<MinusCircleOutlined />}
                        disabled={value === 0 || (value === 1 && title === 'Adultos')}
                        type="link"
                    />
                    <Tag
                        bordered={false}
                        style={{
                          width: 50,
                          textAlign: 'center'
                        }}
                    >
                      {value}
                    </Tag>
                    <Button
                        onClick={() => { handleAdd(propertyKey as keyof pasajeros) }}
                        shape='circle'
                        icon={<PlusCircleOutlined />}
                        type="link"
                    />
                </Row>
            </Col>
        </Row>
    </ConfigProvider>
  )
}

export default InputWithButtons
