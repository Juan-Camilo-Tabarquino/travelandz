import express from 'express'
import generarSHA from '../auth/autenticacion'
import axios from 'axios'

const router = express.Router()

interface TransferRequest {
  pasajeros: {
    adultos: number
    ninios: number
    infantes: number
  }
  fecha: {
    fechaRetorno: string
    horaRetorno: string
    fechaSalida: string
    horaSalida: string
  }
  desde: string
  hasta: string
}

// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.post('/', async (req, res) => {
  // try {
  //   const sha = generarSHA()
  //   const {
  //     pasajeros,
  //     fecha,
  //     desde,
  //     hasta
  //   }: TransferRequest = req.body
  //   const response = await axios.get(`https://api.test.hotelbeds.com/transfer-api/1.0/availability/en/from/IATA/${desde}/to/ATLAS/${hasta}/${fecha.fechaSalida}T${fecha.horaSalida}/${fecha.fechaRetorno}T${fecha.horaRetorno}/${pasajeros.adultos}/${pasajeros.ninios}/${pasajeros.infantes}`, {
  //     headers: {
  //       'Api-key': 'c3cd403d5767157b37e931461fabe51b',
  //       'X-Signature': sha,
  //       Accept: 'application/json',
  //       'Accept-Encoding': 'gzip'
  //     }
  //   })
  //   // console.log(req.body)
  //   res.json(response)
  // } catch (error) {
  //   res.json(error)
  // }
  const sha = generarSHA()
  const {
    pasajeros,
    fecha,
    desde,
    hasta
  }: TransferRequest = req.body
  const response = await axios.get(`https://api.test.hotelbeds.com/transfer-api/1.0/availability/en/from/IATA/${desde}/to/ATLAS/${hasta}/${fecha.fechaSalida}T${fecha.horaSalida}/${fecha.fechaRetorno}T${fecha.horaRetorno}/${pasajeros.adultos}/${pasajeros.ninios}/${pasajeros.infantes}`, {
    headers: {
      'Api-key': 'c3cd403d5767157b37e931461fabe51b',
      'X-Signature': sha,
      Accept: 'application/json',
      'Accept-Encoding': 'gzip'
    }
  })
  res.json(response.data)
})

router.get('/:id', (_req, res) => {
  res.json({ msg: 'Transfers' })
})

export default router
