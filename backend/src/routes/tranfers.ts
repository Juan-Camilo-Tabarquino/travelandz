/* eslint-disable quote-props */
/* eslint-disable @typescript-eslint/no-misused-promises */
import express from 'express'
import generarSHA from '../auth/autenticacion'
import axios, { AxiosError } from 'axios'
import 'dotenv/config'

const router = express.Router()

const API_KEY = process.env.API_KEY ?? ''
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

router.post('/', async (req, res) => {
  try {
    const sha = generarSHA()
    const {
      pasajeros,
      fecha,
      desde,
      hasta
    }: TransferRequest = req.body
    const { data } = await axios.get(`https://api.test.hotelbeds.com/transfer-api/1.0/availability/es/from/IATA/${desde}/to/ATLAS/${hasta}/${fecha.fechaSalida}T${fecha.horaSalida}/${fecha.fechaRetorno}T${fecha.horaRetorno}/${pasajeros.adultos}/${pasajeros.ninios}/${pasajeros.infantes}`, {
      headers: {
        'Api-key': API_KEY,
        'X-Signature': sha,
        Accept: 'application/json',
        'Accept-Encoding': 'gzip'
      }
    })
    res.json(data)
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError
      res.status(500).json({ error: axiosError.message })
    } else {
      res.status(500).json({ error: 'Error desconocido' })
    }
  }
})

router.post('/booking', async (req, res) => {
  try {
    const sha = generarSHA()
    const body = req.body
    const request = {
      'language': 'es',
      'holder': body.holderInfo,
      'transfers': [
        {
          'rateKey': body.transfer.rateKey,
          'transferDetails': [
            {
              'type': 'FLIGHT',
              'direction': 'DEPARTURE',
              'code': 'XR1234',
              'companyName': 'null'
            }
          ]
        }
      ],
      'clientReference': 'Prueba',
      'welcomeMessage': 'Welcome Mr. John Doe'
    }
    const { data } = await axios.post('https://api.test.hotelbeds.com/transfer-api/1.0/bookings', request, {
      headers: {
        'Api-key': API_KEY,
        'X-Signature': sha,
        Accept: 'application/json',
        'Accept-Encoding': 'gzip',
        'Content-Type': 'application/json'
      }
    })
    res.status(200).json(data)
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError
      res.status(500).json({ error: axiosError.message })
    } else {
      res.status(500).json({ error: 'Error desconocido' })
    }
  }
})

router.post('/booked', async (req, res) => {
  const {
    fechaInicial,
    fechaFinal
  }: {
    fechaInicial: string
    fechaFinal: string
  } = req.body
  try {
    const sha = generarSHA()
    const { data } = await axios.get(`https://api.test.hotelbeds.com/transfer-api/1.0/bookings/es?fromDate=${fechaInicial}&toDate=${fechaFinal}&dateType=FROM_DATE&offset=1 &limit= 100`, {
      headers: {
        'Api-key': API_KEY,
        'X-Signature': sha,
        Accept: 'application/json',
        'Accept-Encoding': 'gzip'
      }
    })
    res.status(200).json(data)
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError
      res.status(500).json({ error: axiosError.message })
    } else {
      res.status(500).json({ error: 'Error desconocido' })
    }
  }
})

router.post('/booked/detail', async (req, res) => {
  try {
    const {
      reference
    }: {
      reference: string
    } = req.body
    const sha = generarSHA()
    const { data } = await axios.get(`https://api.test.hotelbeds.com/transfer-api/1.0/bookings/es/reference/${reference}`, {
      headers: {
        'Api-key': API_KEY,
        'X-Signature': sha,
        Accept: 'application/json',
        'Accept-Encoding': 'gzip'
      }
    })
    res.status(200).json(data)
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError
      res.status(500).json({ error: axiosError.message })
    } else {
      res.status(500).json({ error: 'Error desconocido' })
    }
  }
})

router.post('/booked/delete', async (req, res) => {
  try {
    const {
      transferReference
    }: {
      transferReference: string
    } = req.body
    const sha = generarSHA()
    const { data } = await axios.delete(`https://api.test.hotelbeds.com/transfer-api/1.0/bookings/es/reference/${transferReference}`, {
      headers: {
        'Api-key': API_KEY,
        'X-Signature': sha,
        Accept: 'application/json',
        'Accept-Encoding': 'gzip'
      }
    })
    res.status(200).json(data)
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError
      res.status(500).json({ error: axiosError.message })
    } else {
      res.status(500).json({ error: 'Error desconocido' })
    }
  }
})

export default router
