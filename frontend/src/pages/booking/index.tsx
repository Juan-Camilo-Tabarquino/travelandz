import BasicPage from '@/commons/BasicPage'
import ButtonPropio from '@/commons/components/ButtonPropio'
import { Col, DatePicker, type GetProps, Input, Row, Space, Modal } from 'antd'
import dayjs from 'dayjs'
import { type CSSProperties, useRef, useState } from 'react'

const { Compact } = Space
const { RangePicker } = DatePicker

type RangePickerProps = GetProps<typeof DatePicker.RangePicker>

export default function Booking () {
  // eslint-disable-next-line arrow-body-style
  const disabledDate: RangePickerProps['disabledDate'] = (current) => {
    // Can not select days before today and today
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    return current && current < dayjs().startOf('day')
  }
  const [modalVisible, setModalVisible] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)

  const showModal = () => {
    setModalVisible(true)
  }
  const handleCancel = () => {
    setModalVisible(false)
  }

  const buttonPosition = buttonRef.current?.getBoundingClientRect()

  // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
  const modalStyle: CSSProperties = buttonPosition
    ? {
        position: 'fixed',
        left: buttonPosition.left + buttonPosition.width / 2 - 150, // Centrar horizontalmente
        top: buttonPosition.bottom + 20
        // transform: 'translateX(-50%)' // Ajustar para centrar completamente
      }
    : {}
  return (
        <BasicPage>
            <Row
              justify='center'
              style={{
                marginTop: 20,
                display: 'flex'
              }}
            >
                <Col span={18}>
                  <Space direction="horizontal" size="large">
                    <Compact>
                        <Input placeholder="Origen" size="large"/>
                        <Input placeholder="Destino" size="large"/>
                    </Compact>
                    <RangePicker
                      size="large"
                      disabledDate={disabledDate}
                    />
                    <ButtonPropio
                      title='pasajeros'
                      buttonProps={{
                        // eslint-disable-next-line @typescript-eslint/prefer-ts-expect-error, @typescript-eslint/ban-ts-comment
                        // @ts-ignore
                        ref: buttonRef,
                        size: 'large',
                        onClick: showModal
                      }}
                      // type="primary"
                      // ref={buttonRef}
                      // onClick={showModal}
                    />
                    <ButtonPropio
                      title='Buscar'
                      buttonProps={{
                        size: 'large',
                        onClick: () => { /* */ }
                      }}
                    />
                    <Modal
                      title="Modal"
                      open={modalVisible}
                      onCancel={handleCancel}
                      style={modalStyle}
                      width={300}
                    >
                      <p>Contenido del modal</p>
                    </Modal>
                   </Space>
                </Col>
            </Row>
        </BasicPage>
  )
}
