import { map } from 'lodash'
import { type Transfer } from './types'
import { Card, Col, Descriptions, Image, Modal, Row, notification } from 'antd'
import { useState } from 'react'

const { Item } = Descriptions

function TransfersList ({
  transfers,
  bookingClick
}: {
  transfers: Transfer[]
  bookingClick: (
    transfer: {
      rateKey: string
    },
    holderInfo: {
      name: string
      surname: string
      email: string
      phone: string
    }
  ) => Promise<any>
}) {
  const [currentTransfer, setCurrentTransfer] = useState<Transfer>()
  const [isOpen, setIsOpen] = useState(false)
  const [isFetching, setIsFetching] = useState(false)

  const onClick = async () => {
    if (currentTransfer != null) {
      setIsFetching(!isFetching)
      const res = await bookingClick({
        rateKey: currentTransfer.rateKey
      }, {
        name: 'John',
        surname: 'Doe',
        email: 'john.doe@hotelbeds.com',
        phone: '+16543245812'
      })
      setIsFetching(false)
      if (res.response.status === 200) {
        notification.success({
          message: 'Reservado Exitosamente',
          description: 'El transfer se reservo exitosamente para ver la informacion de este o modificarlo ve a la pestana gestion.'
        })
      } else {
        notification.error({
          message: 'Error Reservando',
          description: `Error reservando: ${res.code}`
        })
      }
    }
  }
  return (
    <>
    {
      map(transfers, (t) => (
          <Row
            key={t.id}
            justify='center'
            style={{
              margin: 10
            }}
          >
            <Col span={10}>
              <Card
                hoverable
                onClick={() => { setIsOpen(!isOpen); setCurrentTransfer(t) }}
                title={`Transfer desde: ${t.pickupInformation.from.description} hacia:  ${t.pickupInformation.to.description}`}
              >
                <Row>
                  <Col
                    span={12}
                  >
                    {/* <h3>Transfer desde: {t.pickupInformation.from.description} hacia:  {t.pickupInformation.to.description}</h3> */}
                    <h4>Fecha de Salida: {t.pickupInformation.date}, hora de salida: {t.pickupInformation.time}</h4>
                    <h4>{t.content.transferDetailInfo[0].name.split('.').reverse().join(' ')}, precio: €{t.price.totalAmount}</h4>
                  </Col>
                  <Col span={12}>
                    <Row justify='center'>
                      <Image src={t.content.images[0].url} width={300} preview={false} />
                    </Row>
                  </Col>
                </Row>
                </Card>
              </Col>
          </Row>
      ))
    }
    <Modal
      open={isOpen}
      onCancel={() => { setIsOpen(!isOpen) }}
      title='Detalles del traslado'
      width={1000}
      okText="Reservar"
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      onOk={async () => { await onClick() }}
      okButtonProps={{
        loading: isFetching
      }}
    >
      <Descriptions bordered layout='vertical'>
        <Item label="Recogida">
          {currentTransfer?.pickupInformation.from.description}
        </Item>
        <Item label="Destino">
          {currentTransfer?.pickupInformation.to.description}
        </Item>
        <Item label="Fecha de recogida">
          {currentTransfer?.pickupInformation.date}
        </Item>
        <Item label="Hora de recogida">
          {currentTransfer?.pickupInformation.time}
        </Item>
        <Item label="Dirección">{currentTransfer?.direction}</Item>
        <Item label="Vehículo">{currentTransfer?.vehicle.name}</Item>
        <Item label="Categoría">{currentTransfer?.category.name}</Item>
        <Item label="Precio total">
          {currentTransfer?.price.totalAmount} {currentTransfer?.price.currencyId}
        </Item>
        <Item label="Políticas de cancelación">
          {currentTransfer?.cancellationPolicies.map(policy => (
            <Row key={policy.from}>
              Cancelacion hasta {policy.from.split('T')[0]}
            </Row>
          ))}
        </Item>
      </Descriptions>
    </Modal>
  </>
  )
}

export default TransfersList
