import { useDispatch, useSelector } from 'react-redux'
import { type RootState } from '../store/store'
import { type pasajeros } from '@/commons/types'
import axios from 'axios'
import { listarTransfers } from '@/store/slice/transferSlice'

function useTransfer () {
  const { transfers } = useSelector((state: RootState) => state.transfers)
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
      const response = await axios.post('http://localhost:9000/api/transfers', {
        pasajeros,
        fecha,
        desde,
        hasta
      })
      const transfersList = response.data
      dispatch(listarTransfers(transfersList.services))
      return true
    } catch (error) {
      console.log('Error:', error)
      return false
    }
  }

  return {
    transfers,
    getTransfers
  }
}

export default useTransfer
