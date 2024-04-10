import BasicPage from '@/commons/BasicPage'
import BookedTransfersList from '@/commons/BookedTransfersList'
import ButtonPropio from '@/commons/components/ButtonPropio'
import useTransfer from '@/hooks/useTransfer'
import { SearchOutlined } from '@ant-design/icons'
import { Alert, Col, DatePicker, Row, Space, Tooltip, Typography } from 'antd'
import dayjs from 'dayjs'
import { forEach, isEmpty } from 'lodash'
import { useState } from 'react'

const { Title } = Typography

const { RangePicker } = DatePicker
const dateFormat: Intl.DateTimeFormatOptions = {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit'
}
export default function Gestion () {
  const [errorDate, setErrorDate] = useState(false)
  const [errorDescription, setErrorDescription] = useState<string | undefined>()
  const [isFetching, setIsFetching] = useState(false)
  const [fecha, setFecha] = useState({
    fechaSalida: '',
    fechaRetorno: ''
  })

  const {
    transfersBooked,
    listBookedTransfer
  } = useTransfer()

  const onClick = async () => {
    setIsFetching(true)
    if (fecha.fechaSalida !== '' && fecha.fechaRetorno !== '') {
      await listBookedTransfer(
        fecha.fechaSalida,
        fecha.fechaRetorno
      )
    } else {
      setErrorDate(true)
      setErrorDescription('Las fechas no pueden estar vacías, por favor revisar las fechas.')
    }
    setIsFetching(false)
  }
  const handleDate = (value: any[]) => {
    forEach(value, (v, index): any => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      const date = new Date(v.$d).toLocaleString('es-Es', dateFormat)
      const formattedDate = date.split('/').reverse().join('-')

      setFecha(prevValue => {
        const updatedValue = prevValue || {}
        if (index === 0) {
          updatedValue.fechaSalida = formattedDate
        } else {
          const maxDate = dayjs(updatedValue.fechaSalida).add(31, 'days')
          const selectedDate = dayjs(formattedDate)
          if (selectedDate.isAfter(maxDate)) {
            setErrorDate(true)
            setErrorDescription('La diferencia entre las fechas supera los 31 días, por favor revisar las fechas.')
          } else {
            setErrorDate(false)
            updatedValue.fechaRetorno = formattedDate
          }
        }
        return updatedValue
      })
    })
  }
  return (
        <BasicPage>
            <>
                {
                  errorDate && (
                    <Row
                      justify='center'
                      style={{
                        paddingTop: 10
                      }}
                    >
                      <Alert
                        type='error'
                        description={errorDescription}
                        />
                    </Row>
                  )
                }
                <Row
                justify='center'
                style={{
                  marginTop: 10,
                  display: 'flex'
                }}
                >
                    <Col
                      span={12}
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
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'space-evenly'
                      }}>
                        <Tooltip
                            title='Por favor, selecciona fechas con una diferencia de menos de 31 dias.'
                        >
                            <RangePicker
                                placeholder={['Desde', 'Hasta']}
                                size="large"
                                format={'YYYY-MM-DD'}
                                style={{
                                  width: '500px'
                                }}
                                status={errorDate ? 'error' : ''}
                                onChange={(e) => { handleDate(e) }}
                            />
                        </Tooltip>
                        <ButtonPropio
                            title='Buscar'
                            buttonProps={{
                              size: 'large',
                              icon: <SearchOutlined />,
                              // eslint-disable-next-line @typescript-eslint/no-misused-promises
                              onClick,
                              disabled: errorDate,
                              loading: isFetching
                            }}
                        />
                    </Space>
                    </Col>
                </Row>
                {
                    !isEmpty(transfersBooked)
                      ? <BookedTransfersList
                          transfers={transfersBooked}
                        />
                      : <Row
                            justify="center"
                        >
                        <Title level={3}>Realiza una busqueda para ver los transfers disponibles</Title>
                      </Row>
                }
            </>
        </BasicPage>
  )
}
