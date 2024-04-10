import { map } from 'lodash'
import { Card, Col, Descriptions, Image, Modal, Row, notification } from 'antd'
import { type TransferBookedDetails } from './types'
import { useState } from 'react'
import useTransfer from '@/hooks/useTransfer'

const { Item } = Descriptions

export default function BookedTransfersList ({
  transfers
}: {
  transfers: TransferBookedDetails[]
}) {
  const [currentTransfer, setCurrentTransfer] = useState<TransferBookedDetails>()
  const [isOpen, setIsOpen] = useState(false)
  const [isFetching, setIsFetching] = useState(false)

  const {
    deleteBookedTransfer
  } = useTransfer()

  const onClick = async (
    trasnferReference: string | undefined
  ) => {
    setIsFetching(!isFetching)
    if (trasnferReference) {
      const res = await deleteBookedTransfer(trasnferReference)
      if (res.response.status === 200) {
        notification.success({
          message: 'Eliminado Exitosamente',
          description: 'La reserva del transder se elimino exitosamente.'
        })
      } else {
        notification.error({
          message: 'Error Intentando Eliminar la Reserva',
          description: `Error reservando: ${res.code}`
        })
      }
    }
    setIsFetching(false)
  }

  return (
        <>
        {
            map(transfers, (t) => (
                <Row
                  key={t.reference}
                  justify='center'
                  style={{
                    margin: 10
                  }}
                >
                  <Col span={12}>
                    <Card
                      hoverable
                      onClick={() => { setIsOpen(!isOpen); setCurrentTransfer(t) }}
                      title={`Transfer desde: ${t.transfers[0].pickupInformation.from.description} hacia:  ${t.transfers[0].pickupInformation.to.description}`}
                    >
                      <Row>
                        <Col
                          span={12}
                        >
                          {/* <h3>Transfer desde: {t.pickupInformation.from.description} hacia:  {t.pickupInformation.to.description}</h3> */}
                          <h4>Fecha de Salida: {t.transfers[0].pickupInformation.date}, hora de salida: {t.transfers[0].pickupInformation.time}</h4>
                          <h4>{t.transfers[0].content.transferDetailInfo[0].name.split('.').reverse().join(' ')}, precio: €{t.transfers[0].price.totalAmount}</h4>
                        </Col>
                        <Col span={12}>
                          <Row justify='center'>
                            <Image src={t.transfers[0].content.images[0].url} width={300} preview={false} />
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
          okText="Cancelar"
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          onOk={async () => { await onClick(currentTransfer?.reference) }}
          okButtonProps={{
            loading: isFetching,
            danger: true
          }}
          cancelText='volver'
        >
          <Descriptions bordered layout='vertical'>
            <Item label="Recogida">
              {currentTransfer?.transfers[0]?.pickupInformation.from.description}
            </Item>
            <Item label="Destino">
              {currentTransfer?.transfers[0]?.pickupInformation.to.description}
            </Item>
            <Item label="Fecha de recogida">
              {currentTransfer?.transfers[0]?.pickupInformation.date}
            </Item>
            <Item label="Hora de recogida">
              {currentTransfer?.transfers[0]?.pickupInformation.time}
            </Item>
            <Item label="Vehículo">{currentTransfer?.transfers[0]?.vehicle.name}</Item>
            <Item label="Categoría">{currentTransfer?.transfers[0]?.category.name}</Item>
            <Item label="Precio total">
              {currentTransfer?.transfers[0]?.price.totalAmount} {currentTransfer?.transfers[0]?.price.currencyId}
            </Item>
            <Item label="Políticas de cancelación">
              {currentTransfer?.transfers[0]?.cancellationPolicies.map(policy => (
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
