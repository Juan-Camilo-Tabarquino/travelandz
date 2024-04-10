import BasicPage from '@/commons/BasicPage'
import ButtonPropio from '@/commons/components/ButtonPropio'
import InputWithButtons from '@/commons/components/InputWithButtons'
import { type pasajeros } from '@/commons/types'
import useTransfer from '@/hooks/useTransfer'
import { DownOutlined, SearchOutlined, UpOutlined, UserAddOutlined } from '@ant-design/icons'
import { Col, DatePicker, type GetProps, Input, Row, Space, Modal, Select, notification, Typography } from 'antd'
import dayjs from 'dayjs'
import { type CSSProperties, useRef, useState } from 'react'
import iatas from '@/data/iata.json'
import { forEach, isEmpty, map, set } from 'lodash'
import TransfersList from '@/commons/TransfersList'

const { Compact } = Space
const { RangePicker } = DatePicker
const { Option } = Select
const { Title } = Typography

const { codigos } = iatas
const dateFormat: Intl.DateTimeFormatOptions = {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  hour12: false
}

type RangePickerProps = GetProps<typeof DatePicker.RangePicker>

export default function Booking () {
  // eslint-disable-next-line arrow-body-style
  const disabledDate: RangePickerProps['disabledDate'] = (current) => {
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    return current && current < dayjs().startOf('day')
  }
  const [isOpen, setIsOpen] = useState(false)
  const [isFetching, setIsFetching] = useState(false)
  const [isResponseEmpty, setIsResponseEmpty] = useState(false)
  const [desde, setDesde] = useState('')
  const [hasta, setHasta] = useState<string>('')
  const [fecha, setFecha] = useState({
    fechaSalida: '',
    horaSalida: '',
    fechaRetorno: '',
    horaRetorno: ''
  })
  const [pasajeros, setPasajeros] = useState<pasajeros>({
    adultos: 1,
    ninios: 0,
    infantes: 0
  })
  const buttonRef = useRef<HTMLButtonElement>(null)
  const showModal = () => {
    setIsOpen(true)
  }
  const {
    transfers,
    getTransfers,
    bookingTransfer
  } = useTransfer()
  const buttonPosition = buttonRef.current?.getBoundingClientRect()

  const modalStyle: CSSProperties = (buttonPosition != null)
    ? {
        position: 'fixed',
        left: buttonPosition.left + buttonPosition.width / 2 - 150,
        top: buttonPosition.bottom + 20
      }
    : {}

  // eslint-disable-next-line @typescript-eslint/array-type
  const handleDate = (value: Array<any>) => {
    forEach(value, (v, index): any => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      const date = new Date(v.$d).toLocaleString('es-Es', dateFormat)
      index === 0
        ? setFecha(
          prevValue => {
            const updatedDate = { ...prevValue }
            const [fechaSalida, horaSalida] = date.split(',')
            set(updatedDate, 'fechaSalida', fechaSalida.split('/').reverse().join('-'))
            set(updatedDate, 'horaSalida', `${horaSalida.trim()}:00`)
            return updatedDate
          }
        )
        : setFecha(
          prevValue => {
            const updatedDate = { ...prevValue }
            const [fechaRetorno, horaRetorno] = date.split(',')
            set(updatedDate, 'fechaRetorno', fechaRetorno.split('/').reverse().join('-'))
            set(updatedDate, 'horaRetorno', `${horaRetorno.trim()}:00`)
            return updatedDate
          }
        )
    })
  }

  const onClick = async () => {
    setIsFetching(!isFetching)
    setIsResponseEmpty(false)
    if (desde !== '' && hasta !== '' && fecha.fechaSalida !== '' && fecha.horaSalida !== '' && fecha.fechaRetorno !== '' && fecha.horaRetorno !== '') {
      const res = await getTransfers(pasajeros, fecha, desde, hasta)
      if (res.status === 500) {
        notification.error({
          message: 'Error Buscando',
          description: `Error reservando: ${res.code}`
        })
      }
      if (isEmpty(res)) {
        setIsResponseEmpty(true)
      }
    } else {
      notification.error({
        message: 'Error Buscando',
        description: 'Los campos no pueden estar vacios, por favor diligencie toda la informacion'
      })
    }
    setIsFetching(false)
  }

  const handleAdd = (v: keyof typeof pasajeros) => {
    setPasajeros(prevValue => {
      const updatedPasajeros = { ...prevValue }
      updatedPasajeros[v] += 1
      return updatedPasajeros
    })
  }

  const handleSubtract = (v: keyof typeof pasajeros) => {
    setPasajeros(prevValue => {
      const updatedPasajeros = { ...prevValue }
      updatedPasajeros[v] -= 1
      return updatedPasajeros
    })
  }
  return (
        <BasicPage>
          <>
            <Row
              justify='center'
              style={{
                marginTop: 10,
                display: 'flex'
              }}
            >
                <Col
                  span={18}
                  style={{
                    backgroundColor: '#4654A3',
                    padding: 20,
                    borderRadius: 10
                  }}
                >
                  <Space
                    direction="horizontal"
                    size="small"
                    style={{
                      minWidth: '100%',
                      display: 'flex',
                      flexWrap: 'wrap',
                      flexDirection: 'row',
                      justifyContent: 'space-evenly'
                    }}>
                    <Compact>
                        <Select
                          showSearch
                          placeholder="Origen"
                          size="large"
                          style={{
                            width: '350px'
                          }}
                          dropdownStyle={{
                            width: '325px'
                          }}
                          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                          onChange={(e) => { setDesde(e) }}
                        >
                          {
                            map(codigos, (c, index) => (
                              <Option key={index} value={c.IATA}>
                                {
                                  c.nombre
                                }
                              </Option>
                            ))
                          }
                        </Select>
                        <Input placeholder="Destino" size="large" style={{ width: '50%' }} onChange={(e) => { setHasta(e.target.value) }}/>
                    </Compact>
                    <RangePicker
                      placeholder={['Desde', 'Hasta']}
                      size="large"
                      disabledDate={disabledDate}
                      showTime
                      format={'YYYY-MM-DD hh:mm'}
                      style={{
                        width: '350px'
                      }}
                      onChange={(e) => { handleDate(e) }}
                    />
                    <ButtonPropio
                      title={`${pasajeros.adultos + pasajeros.ninios + pasajeros.infantes}`}
                      secondIcon={
                        isOpen
                          ? <UpOutlined />
                          : <DownOutlined />
                      }
                      buttonProps={{
                        // eslint-disable-next-line @typescript-eslint/prefer-ts-expect-error, @typescript-eslint/ban-ts-comment
                        // @ts-ignore
                        ref: buttonRef,
                        size: 'large',
                        onClick: showModal,
                        icon: <UserAddOutlined />
                      }}
                    />
                    <ButtonPropio
                      title='Buscar'
                      buttonProps={{
                        size: 'large',
                        icon: <SearchOutlined />,
                        // eslint-disable-next-line @typescript-eslint/no-misused-promises
                        onClick,
                        loading: isFetching
                      }}
                    />
                    <Modal
                      title="¿Quiénes se trasportan?"
                      open={isOpen}
                      onCancel={() => { setIsOpen(!isOpen) }}
                      style={modalStyle}
                      width={300}
                      cancelButtonProps={{
                        style: {
                          display: 'none'
                        }
                      }}
                      footer={[
                        <Row justify='center'>
                          <ButtonPropio
                            title='Confirmar'
                            buttonProps={{
                              size: 'large',
                              onClick: () => { setIsOpen(!isOpen) }
                            }}
                            />
                        </Row>
                      ]}
                    >
                      <InputWithButtons
                        title='Adultos'
                        value={pasajeros.adultos}
                        propertyKey='adultos'
                        handleAdd={handleAdd}
                        handleSubtract={handleSubtract}
                      />
                      <InputWithButtons
                        title='Ninios'
                        value={pasajeros.ninios}
                        propertyKey='ninios'
                        handleAdd={handleAdd}
                        handleSubtract={handleSubtract}
                      />
                      <InputWithButtons
                        title='Infantes'
                        value={pasajeros.infantes}
                        propertyKey='infantes'
                        handleAdd={handleAdd}
                        handleSubtract={handleSubtract}
                      />
                    </Modal>
                   </Space>
                </Col>
            </Row>
            {
              !isEmpty(transfers)
                ? <TransfersList
                      transfers={transfers}
                      // eslint-disable-next-line @typescript-eslint/no-misused-promises
                      bookingClick={bookingTransfer}
                    />
                : <Row
                    justify="center"
                  >
                  <Title level={3}>
                    {
                      isResponseEmpty ? 'Sin Información' : 'Realiza una busqueda para ver los transfers disponibles'
                    }
                  </Title>
                </Row>
            }
          </>
        </BasicPage>
  )
}
