import BasicPage from '@/commons/BasicPage'
import ButtonPropio from '@/commons/components/ButtonPropio'
import InputWithButtons from '@/commons/components/InputWithButtons'
import { type pasajeros } from '@/commons/types'
import useTransfer from '@/hooks/useTransfer'
import { DownOutlined, SearchOutlined, UpOutlined, UserAddOutlined } from '@ant-design/icons'
import { Col, DatePicker, type GetProps, Input, Row, Space, Modal, Select } from 'antd'
import dayjs from 'dayjs'
import { type CSSProperties, useRef, useState } from 'react'
import iatas from '@/data/iata.json'
import { forEach, map, set } from 'lodash'
import TransfersList from '@/commons/TransfersList'

const { Compact } = Space
const { RangePicker } = DatePicker
const { Option } = Select
const { codigos } = iatas
const dateFormat: Intl.DateTimeFormatOptions = {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  hour12: false // Usa el formato de 24 horas
}

type RangePickerProps = GetProps<typeof DatePicker.RangePicker>

export default function Booking () {
  // eslint-disable-next-line arrow-body-style
  const disabledDate: RangePickerProps['disabledDate'] = (current) => {
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    return current && current < dayjs().startOf('day')
  }
  const [isOpen, setIsOpen] = useState(false)
  const [desde, setDesde] = useState('')
  const [hasta, setHasta] = useState<string>('')
  const [fecha, setFecha] = useState({
    fechaSalida: '',
    horaSalida: '',
    fechaRetorno: '',
    horaRetorno: ''
  })
  const buttonRef = useRef<HTMLButtonElement>(null)
  const [pasajeros, setPasajeros] = useState<pasajeros>({
    adultos: 1,
    ninios: 0,
    infantes: 0
  })
  const showModal = () => {
    setIsOpen(true)
  }
  const {
    transfers,
    getTransfers
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
      console.log(fecha)
    })
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
  console.log(transfers)
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
                  <Space direction="horizontal" size="small" style={{ width: '100%', display: 'flex' }}>
                    <Compact style={{ flex: '1 1 500px' }}>
                        <Select
                          showSearch
                          placeholder="Origen"
                          size="large"
                          style={{
                            width: '50%'
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
                        flex: '1 1 500px'
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
                        onClick: async () => { await getTransfers(pasajeros, fecha, desde, hasta) }
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
            <TransfersList
              transfers={transfers}
            />
          </>
        </BasicPage>
  )
}
