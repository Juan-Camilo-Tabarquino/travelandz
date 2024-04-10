import { useDispatch, useSelector } from 'react-redux'
import { type RootState } from '../store/store'
import { type pasajeros } from '@/commons/types'
import axios from 'axios'
import { deleteTransfer, listarTransfers, listarTransfersBooked, modificarTransfer } from '@/store/slice/transferSlice'
import { filter, get, map, toNumber } from 'lodash'
import 'dotenv/config'

const port = process.env.NEXT_PUBLIC_PORT

function useTransfer () {
  const { transfers, transfersBooked } = useSelector((state: RootState) => state.transfers)
  const dispatch = useDispatch()
  const getTransfers = async (
    pasajeros: pasajeros,
    fecha: {
      fechaRetorno: string
      horaRetorno: string
      fechaSalida: string
      horaSalida: string
    },
    desde: string,
    hasta: string
  ) => {
    try {
      const { data } = await axios.post(`http://localhost:${port}/api/transfers`, {
        pasajeros,
        fecha,
        desde,
        hasta
      })
      dispatch(listarTransfers(data !== '' ? data.services : []))
      return data !== '' ? data.services : []
    } catch (error) {
      return error
    }
  }

  const bookingTransfer = async (
    transfer: {
      rateKey: string
    },
    holderInfo: {
      name: string
      surname: string
      email: string
      phone: string
    }
  ) => {
    try {
      const { data } = await axios.post(`http://localhost:${port}/api/transfers/booking`, {
        transfer,
        holderInfo
      })
      return data
    } catch (error) {
      return error
    }
  }

  const getDetailedBookingTransfer = async (
    reference: string
  ) => {
    try {
      const { data } = await axios.post(`http://localhost:${port}/api/transfers/booked/detail`, {
        reference
      })
      return { ...data.bookings[0] }
    } catch (error) {
      return error
    }
  }

  const listBookedTransfer = async (
    fechaInicial: string,
    fechaFinal: string
  ) => {
    try {
      const { data } = await axios.post(`http://localhost:${port}/api/transfers/booked`, {
        fechaInicial,
        fechaFinal
      })
      const currentHolderBookings = filter(data.bookings, (b) => b.holder.email === 'john.doe@hotelbeds.com' && b.clientReference === 'PRUEBA')
      const request = map(
        currentHolderBookings,
        async (current) => {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
          const res = await getDetailedBookingTransfer(get(current, ['reference']))
          return res
        }
      )
      const currentHolderBookingsDetailed = await Promise.all(request)
      dispatch(listarTransfersBooked(currentHolderBookingsDetailed))
      return data
    } catch (error) {
      return error
    }
  }

  const deleteBookedTransfer = async (
    transferReference: string
  ) => {
    try {
      const { data } = await axios.post(`http://localhost:${port}/api/transfers/booked/delete`, {
        transferReference
      })
      if (toNumber(data.transfers[0].price.totalAmount) !== 0) {
        dispatch(modificarTransfer(data[0]))
      } else {
        dispatch(deleteTransfer(data[0]))
      }
      return data
    } catch (error) {
      return error
    }
  }

  return {
    transfers,
    transfersBooked,
    getTransfers,
    bookingTransfer,
    listBookedTransfer,
    deleteBookedTransfer
  }
}

export default useTransfer
